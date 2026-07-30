from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from datetime import datetime,UTC,timedelta


from src.services.auth_service import get_user_by_email,create_user,delete_expired_pre_registers
from src.core.database import get_db
from src.schemas.auth import Register_request,Verify_email
from src.core.security import hash_password,verify_password
from src.utils.otp import generate_otp
from src.models.pre_register import Pre_register
from src.models.pre_register import Pre_register
from src.utils.get_time import current_time, ensure_utc_datetime
from src.services.email_service import send_otp_email


router=APIRouter(prefix="/user",tags=["Authentication"])


@router.post("/register")
def register(data:Register_request,db:Session=Depends(get_db)):
    exist_user=get_user_by_email(db=db,email=data.email)
    delete_expired_pre_registers(db=db)
    if exist_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists. Please login."
        )

    hash_pass=hash_password(data.password)

    otp=generate_otp()

    otp_exp=current_time()+timedelta(minutes=10)

    temp_user=Pre_register(
        name=data.name,
        email=data.email,
        hashed_password=hash_pass,
        otp=otp,
        otp_expiry=otp_exp
    )

    db.add(temp_user)
    db.commit()
    send_otp_email(
        receiver_email=data.email,
        otp=otp
    )

    return {
        "message":"OTP sent successfully"
    }


@router.post('/verify-email')
def verify_email(data:Verify_email,db:Session=Depends(get_db)):
    if not data.otp:
        raise HTTPException(
            status_code=400,
            detail="Please enter Otp"
        )
    exist_user=get_user_by_email(db,email=data.email)

    temp_data=db.query(Pre_register).filter(Pre_register.email==data.email).first()

    if exist_user:
        if temp_data:
            db.delete(temp_data)
            db.commit()

        raise HTTPException(
            status_code=400,
            detail="User already exist try to login"
        )
    current=current_time()


    if not temp_data:
        raise HTTPException(
            status_code=400,
            detail="No pending registration found."
        )


    otp_expiry = ensure_utc_datetime(temp_data.otp_expiry)

    if current > otp_expiry:
        db.delete(temp_data)
        db.commit()
        raise HTTPException(
            status_code=400,
            detail="OTP expire try again"
        )

    if data.otp != temp_data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    new_user=create_user(
        db=db,
        name=temp_data.name,
        email=temp_data.email,
        hash_password=temp_data.hashed_password
        )
    
    db.delete(temp_data)
    db.commit()
    return {
        "message":"User register successfully"
    }