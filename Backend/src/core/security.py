from pwdlib import PasswordHash
from jose import jwt
from datetime import datetime,timedelta,timezone,UTC
from dotenv import load_dotenv
import os 

load_dotenv()

pass_hash=PasswordHash.recommended()

ALGORITHM=os.getenv("ALGORITHM")
SECRET_KEY=os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES=os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

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