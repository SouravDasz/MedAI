from pydantic import BaseModel,EmailStr


class Register_request(BaseModel):
    name : str
    email : EmailStr
    password : str

class Login_request(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"