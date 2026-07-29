from sqlalchemy.orm import Session

from src.core.security import hash_password,verify_password
from src.models.user import User
from src.schemas.auth import Register_request



def get_user_by_email(db:Session,email:str):

     return db.query(User).filter(User.email==email).first()



def create_user(db:Session,data:Register_request):
    "Create user in database"
    password=password(
         data.password
    )

    new_user=User(
        name=data.name,
        hash_password=data.password,
        email=data.email
    )

    db.add(new_user)
    db.commit()

    db.refresh()

    return new_user