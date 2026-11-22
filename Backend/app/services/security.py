from datetime import datetime, timedelta, timezone

import jwt

from pwdlib import PasswordHash
from jwt.exceptions import InvalidTokenError

from app.core.config import settings


# Initialize password hashing
password_hash = PasswordHash.recommended()




def hash_password(password: str) -> str:

    return password_hash.hash(password)




def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    return password_hash.verify(
        plain_password,
        hashed_password
    )




def create_access_token(
    user_id: int,
    expires_delta: timedelta | None = None
) -> str:

    if expires_delta is None:
        expires_delta = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    now = datetime.now(timezone.utc)

    expire = now + expires_delta

    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": expire,
        "type": "access"
    }

    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )

    return token





def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
            options={
                "require": ["exp", "iat", "sub"]
            }
        )

        if payload.get("type") != "access":
            return None

        user_id = payload.get("sub")

        if not isinstance(user_id, str) or not user_id.isdigit():
            return None

        return payload

    except InvalidTokenError:
        return None
