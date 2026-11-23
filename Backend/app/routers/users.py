from fastapi import APIRouter, Depends , HTTPException , status
from sqlalchemy.orm import Session


from app.core.dependencies import get_current_user
from app.models.user import User
from app.core.dependencies import get_current_user
from app.schemas.user import UserProfileResponse,UserProfileUpdate,ChangePasswordRequest
from app.database.connection import get_db
from app.models.refresh_session import RefreshSession
from app.services.security import (
    verify_password,
    hash_password
)


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserProfileResponse
)
def get_my_profile(
    current_user: User = Depends(get_current_user)
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


#updating user details
@router.patch(
    "/me",
    response_model=UserProfileResponse)
def update_my_profile(
    profile_data:UserProfileUpdate,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):
    update_data=profile_data.model_dump(
        exclude_unset=True
    )

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided for update"
        )
    for field, value in update_data.items():
        setattr(current_user,field,value)

    db.commit()
    db.refresh(current_user)

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


#updating users password
@router.patch("/me/password")
def change_password(
    password_data:ChangePasswordRequest,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):
    if not current_user.hashed_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account does't have a password"
        )
    # verify current password
    if not verify_password(
        password_data.current_password,
        current_user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )

    #prevent reusing same password
    if verify_password(
        password_data.new_password,
        current_user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be different"
        )

    current_user.hashed_password=hash_password(
        password_data.new_password
    )

    # 5. Revoke all refresh sessions
    db.query(RefreshSession).filter(
        RefreshSession.user_id == current_user.id,
        RefreshSession.is_revoked.is_(False)
    ).update(
        {"is_revoked": True},
        synchronize_session=False
    )

    # 6. Save changes
    db.commit()

    return {
        "message": "Password changed successfully. Please log in again."
    }
