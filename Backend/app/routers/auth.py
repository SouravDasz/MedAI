
from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    status,
)
from fastapi.responses import JSONResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import update
from pydantic import EmailStr

from app.core.config import settings
from app.core.dependencies import get_db, get_current_user, verify_origin

from app.models.user import User
from app.models.oauth_account import OAuthAccount
from app.models.email_verification import EmailVerification
from app.models.refresh_session import RefreshSession

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    RegisterResponse,
    VerifyOTP,
    UserResponse,
)

from app.services.security import (
    hash_password,
    verify_password,
    create_access_token,
)

from app.services.otp import (
    generate_otp,
    hash_otp,
    get_otp_expiry,
    verify_otp_hash,
)

from app.services.email import send_otp_email

from app.services.auth_service import (
    issue_auth_cookies,
    clear_auth_cookies,
)

from app.services.token_service import (
    hash_refresh_token,
    generate_refresh_token,
    get_refresh_expiry,
)



# GOOGLE OAUTH CONFIGURATION

oauth = OAuth()

oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url=(
        "https://accounts.google.com/.well-known/openid-configuration"
    ),
    client_kwargs={
        "scope": "openid email profile"
    },
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)



# REGISTER USER


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):

    email = str(user_data.email).strip().lower()

    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered",
        )

    new_user = User(
        username=user_data.username.strip(),
        email=email,
        hashed_password=hash_password(user_data.password),
        is_verified=False,
    )

    try:
        db.add(new_user)
        db.flush()

        otp = generate_otp()
        now = datetime.now(timezone.utc).replace(tzinfo=None)

        verification = EmailVerification(
            user_id=new_user.id,
            otp_hash=hash_otp(new_user.id, otp),
            expires_at=get_otp_expiry(),
            attempts=0,
            is_used=False,
            last_sent_at=now,
        )

        db.add(verification)
        db.commit()

        send_otp_email(new_user.email, otp)

    except Exception:
        db.rollback()
        raise

    return RegisterResponse(
        message="Registration successful. OTP sent to your email.",
        email=new_user.email,
    )



# VERIFY EMAIL OTP


@router.post("/verify-otp")
def verify_email_otp(
    otp_data: VerifyOTP,
    db: Session = Depends(get_db),
):

    email = str(otp_data.email).strip().lower()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired verification code",
        )

    if user.is_verified:
        raise HTTPException(
            status_code=400,
            detail="Email is already verified",
        )

    verification = (
        db.query(EmailVerification)
        .filter(EmailVerification.user_id == user.id)
        .first()
    )

    if not verification or verification.is_used:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired verification code",
        )

    if verification.attempts >= 5:
        raise HTTPException(
            status_code=429,
            detail="Maximum OTP attempts exceeded",
        )

    now = datetime.now(timezone.utc).replace(tzinfo=None)

    if verification.expires_at <= now:
        verification.is_used = True
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="OTP has expired. Request a new one.",
        )

    verification.attempts += 1

    is_valid = verify_otp_hash(
        user.id,
        otp_data.otp,
        verification.otp_hash,
    )

    if not is_valid:

        if verification.attempts >= 5:
            verification.is_used = True

        db.commit()

        raise HTTPException(
            status_code=400,
            detail="Incorrect verification code",
        )

    verification.is_used = True
    user.is_verified = True

    db.commit()

    return {
        "message": "Email verified successfully. You can now log in."
    }



# RESEND OTP


@router.post("/resend-otp")
def resend_otp(
    email: EmailStr,
    db: Session = Depends(get_db),
):

    normalized_email = str(email).strip().lower()

    user = (
        db.query(User)
        .filter(User.email == normalized_email)
        .first()
    )

    generic_response = {
        "message": "If the account is eligible, a new OTP will be sent."
    }

    if not user or user.is_verified:
        return generic_response

    now = datetime.now(timezone.utc).replace(tzinfo=None)

    verification = (
        db.query(EmailVerification)
        .filter(EmailVerification.user_id == user.id)
        .first()
    )

    if verification and verification.last_sent_at:

        last_sent = verification.last_sent_at.replace(tzinfo=None)

        elapsed = (now - last_sent).total_seconds()

        if elapsed < settings.OTP_RESEND_COOLDOWN_SECONDS:
            raise HTTPException(
                status_code=429,
                detail="Please wait before requesting another OTP.",
            )

    otp = generate_otp()
    otp_hash_value = hash_otp(user.id, otp)

    if verification:

        verification.otp_hash = otp_hash_value
        verification.expires_at = get_otp_expiry()
        verification.attempts = 0
        verification.is_used = False
        verification.last_sent_at = now

    else:

        verification = EmailVerification(
            user_id=user.id,
            otp_hash=otp_hash_value,
            expires_at=get_otp_expiry(),
            attempts=0,
            is_used=False,
            last_sent_at=now,
        )

        db.add(verification)

    try:
        db.commit()
        send_otp_email(user.email, otp)

    except Exception:
        db.rollback()
        raise

    return generic_response



# MANUAL LOGIN


@router.post("/login")
def login_user(
    user_data: UserLogin,
    db: Session = Depends(get_db),
):

    email = str(user_data.email).strip().lower()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user or not user.hashed_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not verify_password(
        user_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=403,
            detail="Please verify your email first",
        )

    response = JSONResponse(
        content={
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }
    )

    return issue_auth_cookies(
        response=response,
        user=user,
        db=db,
    )



# GOOGLE LOGIN


@router.get("/google/login")
async def google_login(request: Request):

    return await oauth.google.authorize_redirect(
        request,
        settings.GOOGLE_REDIRECT_URI,
    )


@router.get("/google/callback")
async def google_callback(
    request: Request,
    db: Session = Depends(get_db),
):

    token = await oauth.google.authorize_access_token(request)

    google_user = token.get("userinfo")

    if not google_user:
        google_user = await oauth.google.userinfo(token=token)

    google_id = google_user.get("sub")
    email = google_user.get("email")
    email_verified = google_user.get("email_verified")

    if (
        not google_id
        or not email
        or email_verified is not True
    ):
        raise HTTPException(
            status_code=400,
            detail="Google account identity could not be verified",
        )

    email = email.strip().lower()

    oauth_account = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.provider == "google",
            OAuthAccount.provider_user_id == google_id,
        )
        .first()
    )

    if oauth_account:

        user = oauth_account.user

    else:

        existing_user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if existing_user:
            return RedirectResponse(
                url=f"{settings.FRONTEND_URL}/login?error=google_account_exists",
                status_code=303,
            )

        username = (
            google_user.get("name")
            or email.split("@")[0]
        )

        try:
            user = User(
                username=username[:100],
                email=email,
                hashed_password=None,
                is_verified=True,
            )

            db.add(user)
            db.flush()

            new_account = OAuthAccount(
                user_id=user.id,
                provider="google",
                provider_user_id=google_id,
            )

            db.add(new_account)
            db.commit()
            db.refresh(user)

        except IntegrityError:
            db.rollback()

            return RedirectResponse(
                url=f"{settings.FRONTEND_URL}/login?error=google_account_conflict",
                status_code=303,
            )

    response = RedirectResponse(
        url=f"{settings.FRONTEND_URL}/auth/google/success",
        status_code=303,
    )

    return issue_auth_cookies(
        response=response,
        user=user,
        db=db,
    )



# CURRENT USER PROFILE


@router.get("/me", response_model=UserResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user),
):
    provider = "Google" if any(
        account.provider == "google"
        for account in current_user.oauth_accounts
    ) else "Email"

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "is_verified": current_user.is_verified,
        "created_at": current_user.created_at,
        "has_password": bool(current_user.hashed_password),
        "auth_provider": provider,
    }



# LINK GOOGLE ACCOUNT


@router.get("/google/link")
async def google_link(
    request: Request,
    current_user: User = Depends(get_current_user),
):

    request.session["google_link_user_id"] = current_user.id

    return await oauth.google.authorize_redirect(
        request,
        settings.GOOGLE_LINK_REDIRECT_URI,
    )


@router.get("/google/link/callback")
async def google_link_callback(
    request: Request,
    db: Session = Depends(get_db),
):

    user_id = request.session.pop(
        "google_link_user_id",
        None,
    )

    if not user_id:
        raise HTTPException(
            status_code=400,
            detail="Google linking session expired. Try again.",
        )

    current_user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not current_user:
        raise HTTPException(
            status_code=401,
            detail="MedAI account not found",
        )

    token = await oauth.google.authorize_access_token(request)

    google_user = token.get("userinfo")

    if not google_user:
        google_user = await oauth.google.userinfo(token=token)

    google_id = google_user.get("sub")
    google_email = google_user.get("email")
    email_verified = google_user.get("email_verified")

    if (
        not google_id
        or not google_email
        or email_verified is not True
    ):
        raise HTTPException(
            status_code=400,
            detail="Google identity could not be verified",
        )

    existing_account = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.provider == "google",
            OAuthAccount.provider_user_id == google_id,
        )
        .first()
    )

    if existing_account:

        if existing_account.user_id == current_user.id:
            return RedirectResponse(
                url=f"{settings.FRONTEND_URL}/settings?google=already_linked",
                status_code=303,
            )

        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/settings?error=google_already_used",
            status_code=303,
        )

    new_account = OAuthAccount(
        user_id=current_user.id,
        provider="google",
        provider_user_id=google_id,
    )

    try:
        db.add(new_account)
        db.commit()

    except IntegrityError:
        db.rollback()

        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/settings?error=google_already_used",
            status_code=303,
        )

    return RedirectResponse(
        url=f"{settings.FRONTEND_URL}/settings?google=linked",
        status_code=303,
    )


# UNLINK GOOGLE ACCOUNT


@router.delete("/google/unlink")
def unlink_google(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    _: None = Depends(verify_origin),
):

    google_account = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.user_id == current_user.id,
            OAuthAccount.provider == "google",
        )
        .first()
    )

    if not google_account:
        raise HTTPException(
            status_code=404,
            detail="Google account is not connected",
        )

    other_accounts = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.user_id == current_user.id,
            OAuthAccount.provider != "google",
        )
        .count()
    )

    if not current_user.hashed_password and other_accounts == 0:
        raise HTTPException(
            status_code=400,
            detail=(
                "Set a password or connect another login provider "
                "before disconnecting Google"
            ),
        )

    db.delete(google_account)
    db.commit()

    return {
        "message": "Google account disconnected successfully"
    }



# REFRESH ACCESS TOKEN


@router.post("/refresh")
def refresh_access_token(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    _: None = Depends(verify_origin),
):

    refresh_token = request.cookies.get("medai_refresh_token")

    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token missing. Please log in again.",
        )

    token_hash = hash_refresh_token(refresh_token)

    session = (
        db.query(RefreshSession)
        .filter(RefreshSession.token_hash == token_hash)
        .first()
    )

    if not session:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token.",
        )

    if session.is_revoked:

        db.query(RefreshSession).filter(
            RefreshSession.user_id == session.user_id
        ).update(
            {RefreshSession.is_revoked: True},
            synchronize_session=False,
        )

        db.commit()

        raise HTTPException(
            status_code=401,
            detail="Refresh token reuse detected. Please log in again.",
        )

    now = datetime.now(timezone.utc).replace(tzinfo=None)

    if session.expires_at <= now:

        session.is_revoked = True
        db.commit()

        raise HTTPException(
            status_code=401,
            detail="Refresh token expired. Please log in again.",
        )

    user = (
        db.query(User)
        .filter(User.id == session.user_id)
        .first()
    )

    if not user:

        session.is_revoked = True
        db.commit()

        raise HTTPException(
            status_code=401,
            detail="User not found.",
        )

    # Atomically revoke only if this token is still active.
    # This prevents two simultaneous requests from rotating it twice.
    result = db.execute(
        update(RefreshSession)
        .where(
            RefreshSession.id == session.id,
            RefreshSession.is_revoked.is_(False),
            RefreshSession.expires_at > now,
        )
        .values(is_revoked=True)
    )

    if result.rowcount != 1:

        db.query(RefreshSession).filter(
            RefreshSession.user_id == session.user_id
        ).update(
            {RefreshSession.is_revoked: True},
            synchronize_session=False,
        )

        db.commit()

        raise HTTPException(
            status_code=401,
            detail="Refresh token is no longer valid. Please log in again.",
        )

    new_refresh_token = generate_refresh_token()

    new_session = RefreshSession(
        user_id=user.id,
        token_hash=hash_refresh_token(new_refresh_token),
        expires_at=get_refresh_expiry(),
        is_revoked=False,
    )

    db.add(new_session)

    new_access_token = create_access_token(user_id=user.id)

    try:
        db.commit()

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Could not refresh authentication session.",
        )

    response.set_cookie(
        key="medai_access_token",
        value=new_access_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )

    response.set_cookie(
        key="medai_refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        path="/auth",
    )

    return {
        "message": "Token refreshed successfully."
    }



# LOGOUT CURRENT DEVICE


@router.post("/logout")
def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    _: None = Depends(verify_origin),
):

    refresh_token = request.cookies.get("medai_refresh_token")

    if refresh_token:

        token_hash = hash_refresh_token(refresh_token)

        session = (
            db.query(RefreshSession)
            .filter(RefreshSession.token_hash == token_hash)
            .first()
        )

        if session and not session.is_revoked:
            session.is_revoked = True
            db.commit()

    clear_auth_cookies(response)

    return {
        "message": "Logged out successfully."
    }



# LOGOUT ALL DEVICES


@router.post("/logout-all")
def logout_all_devices(
    response: Response,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    _: None = Depends(verify_origin),
):

    db.query(RefreshSession).filter(
        RefreshSession.user_id == current_user.id,
        RefreshSession.is_revoked.is_(False),
    ).update(
        {RefreshSession.is_revoked: True},
        synchronize_session=False,
    )

    db.commit()

    clear_auth_cookies(response)

    return {
        "message": "Logged out from all devices successfully."
    }
