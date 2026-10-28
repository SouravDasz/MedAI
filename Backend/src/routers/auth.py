from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from datetime import datetime,UTC,timedelta
import os
import secrets
from dotenv import load_dotenv
import time
from threading import Lock
from pathlib import Path

from src.services.auth_service import get_user_by_email,create_user,delete_expired_pre_registers
from src.core.database import get_db
from src.schemas.auth import Register_request,Verify_email,EmailRequest
from src.core.security import hash_password,verify_password
from src.utils.otp import generate_otp
from src.models.pre_register import Pre_register,Verified_Email
from src.models.user import User
from src.utils.get_time import current_time, ensure_utc_datetime
from src.services.email_service import send_otp_email
from src.services.auth_service import send_email

router=APIRouter(prefix="/auth",tags=["Authentication"])

 
@router.post("/signup")
def register(data:Register_request,db:Session=Depends(get_db)):
    if data:
        print("data presernt")
    exist_user=get_user_by_email(db=db,email=data.email)
    # delete_expired_pre_registers(db=db)
    if exist_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists. Please login."
        )

    hash_pass=hash_password(data.password)

    privious_verify=db.query(Verified_Email).filter(Verified_Email.email==data.email).first()
    if not(privious_verify.isVarified):
        raise HTTPException(
                    status_code=400,
                    detail="Email is not verified"
                )
        
    temp_user=User(
        name=data.fullname,
        email=data.email,
        phone=data.phone,
        hash_password=hash_pass,
        email_verified=True
    )

    db.add(temp_user)
    db.commit()
    # send_otp_email(
    #     receiver_email=data.email,
    #     otp=otp
    # )

    return {
        "message":"Sign up successfully"
    }
BASE_DIR = Path(__file__).parent.parent

load_dotenv(BASE_DIR/".env")
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
OTP_EXPIRY_SECONDS = 300  # 5 minutes
MAX_ATTEMPTS = 5
otp_store = {}
otp_lock = Lock()

@router.post("/send-otp")
def send_otp(request: EmailRequest,db:Session=Depends(get_db)):
    # print("checking")
    # email = str(request.email).lower()
    # print(email)
    email = str(request.email).lower()
    print(email)
    privious_verify=db.query(Verified_Email).filter(Verified_Email.email==email).first()
    if privious_verify:
        db.delete(privious_verify)
        db.commit()
    print(BASE_DIR)
    print(SMTP_EMAIL)
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        raise HTTPException(
            status_code=500,
            detail="Email service is not configured",
        )

    
    # Generate a cryptographically secure 6-digit OTP.
    otp = f"{secrets.randbelow(1_000_000):06d}"
    print(otp)
    expiry_time=time.time() + OTP_EXPIRY_SECONDS
    try:
        print("checking send")
        
        send_email(email, otp)
        
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unable to send OTP. Check your email configuration.",
        )
    otp_info=Verified_Email(email=email,otp=otp,expiry_time=expiry_time)
    db.add(otp_info)
    db.commit()
    
    print("it is correct")
    with otp_lock:
        otp_store[email] = {
            "otp": otp,
            "expires_at": time.time() + OTP_EXPIRY_SECONDS,
            "attempts": 0,
        }

    return {
        "message": "OTP sent successfully to your email",
        "expires_in": OTP_EXPIRY_SECONDS,
    }

@router.post('/verify-email')
def verify_email(data:Verify_email,db:Session=Depends(get_db)):
    if not data.otp:
        raise HTTPException(
            status_code=400,
            detail="Please enter Otp"
        )
    exist_user=get_user_by_email(db,email=data.email)

    verify_data=db.query(Verified_Email).filter(Verified_Email.email==data.email).first()

    if exist_user:
        raise HTTPException(
            status_code=400,
            detail="User already exist try to login"
        )
    current=time.time()


    if not verify_data:
        raise HTTPException(
            status_code=400,
            detail="Some problem in otp sending."
        )


    expiry_time = verify_data.expiry_time

    if current > float(expiry_time):
         
        raise HTTPException(
            status_code=400,
            detail="OTP expire try again"
        )

    if data.otp != verify_data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )
        
    verify_data.isVarified=True
    db.commit()
    return {
        "message":"Email verified Successfully",
    }