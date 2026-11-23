
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, ConfigDict


# Registration request
class UserRegister(BaseModel):

    username: str = Field(min_length=3, max_length=100)

    email: EmailStr

    password: str = Field(min_length=8, max_length=128)


# Login request
class UserLogin(BaseModel):

    email: EmailStr

    password: str


# Registration response
class RegisterResponse(BaseModel):

    message: str

    email: EmailStr


# User information response
class UserResponse(BaseModel):

    id: int

    username: str

    email: EmailStr

    is_verified: bool

    model_config = ConfigDict(from_attributes=True)


# JWT response
class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"


class VerifyOTP(BaseModel):

    email: EmailStr

    otp: str = Field(
        min_length=6,
        max_length=6,
        pattern=r"^[0-9]{6}$"
    )


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_verified: bool
    created_at: datetime
    has_password: bool = False
    auth_provider: str = "Email"

    model_config = ConfigDict(from_attributes=True)