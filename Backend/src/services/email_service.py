import smtplib
import os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv

load_dotenv()


SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


def send_otp_email(receiver_email: str, otp: str):
    print("OTP email function called")
    message = MIMEMultipart()

    message["From"] = SMTP_EMAIL
    message["To"] = receiver_email
    message["Subject"] = "Your OTP Verification Code"


    body = f"""
    Hello,

    Your OTP for MedAI is:

    {otp}

    This OTP expires in 10 minutes.

    Thank you.
    """

    message.attach(
        MIMEText(body, "plain")
    )


    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        SMTP_EMAIL,
        SMTP_PASSWORD
    )

    server.sendmail(
        SMTP_EMAIL,
        receiver_email,
        message.as_string()
    )

    server.quit()