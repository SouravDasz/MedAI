from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserProfileResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: EmailStr
    is_verified: bool
    created_at: datetime
    has_password: bool = False
    auth_provider: str = "Email"

class UserProfileUpdate(BaseModel):

    username: str | None = Field(
        default=None,
        min_length=3,
        max_length=100
    )

class ChangePasswordRequest(BaseModel):

    current_password: str = Field(
        min_length=1
    )

    new_password: str = Field(
        min_length=8,
        max_length=128
    )