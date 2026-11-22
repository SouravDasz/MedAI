
import httpx

from fastapi import HTTPException

from app.core.config import settings


def send_otp_email(email: str, otp: str):

    url = "https://email-api.mailercloud.com/email"

    headers = {
        "Authorization": settings.MAILERCLOUD_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "email": {
            "from": settings.MAILERCLOUD_SENDER_EMAIL,
            "fromName": settings.MAILERCLOUD_SENDER_NAME,
            "subject": "MedAI Email Verification",
            "text": (
                f"Your MedAI verification code is {otp}. "
                "It is valid for 5 minutes."
            ),
            "html": f"""
                <h2>MedAI Email Verification</h2>
                <p>Your verification code is:</p>
                <h1>{otp}</h1>
                <p>This code expires in 5 minutes.</p>
                <p>If you did not request this, ignore this email.</p>
            """,
            "recipients": {
                "to": [
                    {"email": email}
                ]
            }
        },
        "metadata": {
            "campaignType": "TRANSACTIONAL",
            "custom": {
                "store_content": False
            }
        },
        "version": "1.0"
    }

    try:
        response = httpx.post(
            url,
            headers=headers,
            json=payload,
            timeout=15.0
        )

        response.raise_for_status()

        result = response.json()

        if result.get("status") != "SUCCESS":
            raise HTTPException(
                status_code=502,
                detail="Email delivery failed"
            )

    except httpx.HTTPError:
        raise HTTPException(
            status_code=502,
            detail="Unable to send verification email"
        )
