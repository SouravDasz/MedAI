from fastapi import APiRouter,Depends,HTTPException
from sqlalchemy.orm import Session


from src.schemas.auth import Login_request
from src.core.database import get_db
from src.services.auth_service import get_user_by_email
from src.core.security import verify_password,create_access_token

router=APiRouter("/user")


@router.post("/login")
def login(data:Login_request,db:Session=Depends(get_db)):

    if not data:
        raise HTTPException(
            status_code=400,
            detail='Please enter email and password'
        )
    exist_user=get_user_by_email(db,email=data.email)

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

    token=create_access_token(
        {
            "sub":exist_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

