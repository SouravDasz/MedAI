from sqlalchemy.orm import Session
from datetime import datetime,timezone

from src.core.security import hash_password,verify_password
from src.models.user import User
from src.models.pre_register import Pre_register
from src.schemas.auth import Register_request



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