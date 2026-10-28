from sqlalchemy.orm import Session
from datetime import datetime,timezone
from dotenv import load_dotenv
from pathlib import Path


from src.core.security import hash_password,verify_password
from src.models.user import User
from src.models.pre_register import Pre_register
from src.schemas.auth import Register_request
import os
from email.message import EmailMessage
import smtplib

def get_user_by_email(db:Session,email:str):

     return db.query(User).filter(User.email==email).first()




def create_user(db:Session,name:str,email:str,hash_password:str):
    "Create user in database"


    new_user=User(
        name=name,
        hash_password=hash_password,
        email=email
    )

    db.add(new_user)
    db.commit()

    db.refresh(new_user)

    return new_user


def delete_expired_pre_registers(db: Session):
    current = datetime.now(timezone.utc)

    expired_records = (
        db.query(Pre_register)
        .filter(Pre_register.otp_expiry < current)
        .all()
    )

    for record in expired_records:
        db.delete(record)

    db.commit()

BASE_DIR = Path(__file__).parent.parent

load_dotenv(BASE_DIR/".env")
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# Demo storage only. Use Redis or a database in production.



def send_email(to_email: str, otp: str):
     
    message = EmailMessage()
    message["Subject"] = " MedAI OTP Verification Code"
    message["From"] = SMTP_EMAIL
    message["To"] = to_email

    message.set_content(
        f"""
Hello User,

Your OTP verification code is: {otp}

This code expires in 5 minutes.
Do not share this code with anyone.

If you did not request this code, ignore this email.
"""
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(message)


 