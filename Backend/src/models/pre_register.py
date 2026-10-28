from sqlalchemy import Column,String,Integer,Boolean,DateTime
from datetime import datetime,UTC

from src.core.database import Base


class Pre_register(Base):
    __tablename__="pre_registers"
    id=Column(
        Integer,
        primary_key=True
    )
    name=Column(
        String,
        nullable=False
    )
    email=Column(
        String,
        nullable=False,
        index=True   
    )
    hashed_password=Column(
        String,
        nullable=False
    )

    created_at = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(UTC)
    )
class Verified_Email(Base):
    __tablename__="verify_email"
    email=Column(String, primary_key=True)
    otp=Column(String)
    expiry_time=Column(String)
    isVarified=Column(Boolean,default=False)