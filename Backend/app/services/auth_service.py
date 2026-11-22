
from fastapi import Response
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.user import User
from app.models.refresh_session import RefreshSession

from app.services.security import create_access_token
from app.services.token_service import (
    generate_refresh_token,
    hash_refresh_token,
    get_refresh_expiry
)


def issue_auth_cookies(
    response: Response,
    user: User,
    db: Session
):

    # Generate access and refresh tokens
    access_token = create_access_token(user_id=user.id)
    refresh_token = generate_refresh_token()

    # Store only the refresh token hash in the database
    refresh_session = RefreshSession(
        user_id=user.id,
        token_hash=hash_refresh_token(refresh_token),
        expires_at=get_refresh_expiry(),
        is_revoked=False
    )

    db.add(refresh_session)
    db.commit()

    # Access token cookie
    response.set_cookie(
        key="medai_access_token",
        value=access_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/"
    )

    # Refresh token cookie
    response.set_cookie(
        key="medai_refresh_token",
        value=refresh_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        path="/auth"
    )

    return response



def clear_auth_cookies(response: Response):
    response.delete_cookie(
        key="medai_access_token",
        path="/",
        secure=settings.COOKIE_SECURE,
        httponly=True,
        samesite=settings.COOKIE_SAMESITE
    )

    response.delete_cookie(
        key="medai_refresh_token",
        path="/auth",
        secure=settings.COOKIE_SECURE,
        httponly=True,
        samesite=settings.COOKIE_SAMESITE
    )

    return response
