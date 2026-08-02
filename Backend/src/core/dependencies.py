from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from src.core.database import get_db
from src.core.security import (
    oauth2_scheme,
    verify_access_token
)

from src.models.user import User



def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    user_id = verify_access_token(token)


    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()


    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    return user