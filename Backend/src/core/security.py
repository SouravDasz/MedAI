from pwdlib import PasswordHash
from jose import jwt,JWTError
from datetime import datetime,timedelta,timezone,UTC
from dotenv import load_dotenv
import os 
from fastapi import HTTPException,status
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

pass_hash=PasswordHash.recommended()


ALGORITHM=os.getenv("ALGORITHM")
SECRET_KEY=os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/user/login"
)


def hash_password(password:str):
    "This function takes the user's actual password and converts it into a hash."
    return pass_hash.hash(password)


def verify_password(password:str,hash_password:str):
    "Return True if password verified"

    return pass_hash.verify(password,hash_password)


def create_access_token(data:dict):

    to_encode=data.copy()

    expire=datetime.now(UTC)+timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "exp":expire
    })

    token=jwt.encode(
        to_encode,SECRET_KEY,algorithm=ALGORITHM
    )

    return token


def verify_access_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        return user_id


    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )