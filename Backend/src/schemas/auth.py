from pydantic import BaseModel,EmailStr,Field
from typing import Literal, Union, Annotated

class Register_request(BaseModel):
    fullname : str=Field(min_length=2, max_length=100)
    email : EmailStr
    username : str=Field(min_length=2,max_length=100)
    password : str=Field(min_length=6,max_length=100)

class PasswordLogin(BaseModel):
    mode: Literal["password"]
    username: str =Field(min_length=2,max_length=100)
    password: str = Field(min_length=6,max_length=100)

# --- Mode 2: OTP Login ---
class OtpLogin(BaseModel):
    mode: Literal["otp"]
    email: str = EmailStr
     

# --- Combined Schema using Discriminator ---
LoginRequest = Annotated[
    Union[PasswordLogin, OtpLogin],
    Field(discriminator="mode")
]

class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"

class EmailRequest(BaseModel):
    email: EmailStr

class Verify_email(BaseModel):
    email:EmailStr
    otp:str