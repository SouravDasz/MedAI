
import secrets
import hashlib

from datetime import datetime, timedelta, timezone

from app.core.config import settings


def generate_refresh_token() -> str:
    return secrets.token_urlsafe(64)


def hash_refresh_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def get_refresh_expiry():
    return (
        datetime.now(timezone.utc)
        + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    ).replace(tzinfo=None)
