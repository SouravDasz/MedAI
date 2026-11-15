from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
import secrets
import time
from threading import Lock

from src.schemas.auth import LoginRequest
from src.core.database import get_db
from src.services.auth_service import get_user_by_email
from src.core.security import verify_password,create_access_token
from src.models.user import User
from src.services.auth_service import send_email
from src.models.pre_register import Verified_Email


router=APIRouter(prefix="/user")

otp_store = {}
otp_lock = Lock()
@router.post("/signin")
def login(data:LoginRequest,db:Session=Depends(get_db)):
    print("h")
    if not data:
        raise HTTPException(
            status_code=400,
            detail='Please enter username and password'
        )
    if data.mode=="password":
        exist_user=db.query(User).filter(User.username==data.username).first()

        if not exist_user:
            raise HTTPException(
            status_code=400,
            detail="User not exist please try to Register"
         )



        correct_pass=verify_password(password=data.password,hash_password=exist_user.hash_password)

        if not correct_pass:
            raise HTTPException(
            status_code=401,
            detail="Password was wrong"
        )
        print("success")
    # token=create_access_token(
    #     {
    #         "sub":str(exist_user.id)
    #     }
    # )

        return {
        # "access_token": token,
        "token_type": "bearer"
        }
    elif data.mode=="otp":
        exist_user=db.query(User).filter(User.email==data.email).first()
        if not exist_user:
            raise HTTPException(
                        status_code=401,
                        detail="Email is not registered, Please Login."
                    )
        # Generate a cryptographically secure 6-digit OTP.
        otp = f"{secrets.randbelow(1_000_000):06d}"
        print(otp)
        expiry_time=time.time() + 300
        try:
            print("checking send")
                
            send_email(data.email, otp)
            print("after otp sent")
        except Exception:
            raise HTTPException(
                    status_code=500,
                    detail="Unable to send OTP. Check your email configuration.",
                )
        otp_info=Verified_Email(email=data.email,otp=otp,expiry_time=expiry_time)
        print("after verify email",otp_info)
        db.add(otp_info)
        print("problem in db")
        db.commit()
            
        print("it is correct")
        with otp_lock:
            otp_store[data.email] = {
                    "otp": otp,
                    "expires_at": time.time() + 300,
                    "attempts": 0,
                }
        
            return {
                "message": "OTP sent successfully to your email",
                "expires_in":300,
            }


