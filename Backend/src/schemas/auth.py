from pydantic import BaseModel,EmailStr,Field


class Register_request(BaseModel):
    name : str=Field(min_length=2, max_length=100)
    email : EmailStr
    password : str=Field(min_length=6,max_length=100)

class Login_request(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"


class Verify_email(BaseModel):
    email:EmailStr
    otp:str