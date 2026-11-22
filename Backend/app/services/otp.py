
import secrets
import hmac
import hashlib

from datetime import datetime, timedelta, timezone

from app.core.config import settings


# Generate a six-digit OTP
def generate_otp() -> str:

    return f"{secrets.randbelow(1_000_000):06d}"


# Hash OTP using a server-side secret
def hash_otp(user_id: int, otp: str) -> str:

    message = f"{user_id}:{otp}".encode()

    return hmac.new(
        settings.SECRET_KEY.encode(),
        message,
        hashlib.sha256
    ).hexdigest()


# Verify OTP
def verify_otp_hash(
    user_id: int,
    otp: str,
    stored_hash: str
) -> bool:

    generated_hash = hash_otp(user_id, otp)

    return hmac.compare_digest(
        generated_hash,
        stored_hash
    )


# OTP expiration
def get_otp_expiry():

    return (
        datetime.now(timezone.utc) + timedelta(minutes=5)
    ).replace(tzinfo=None)
