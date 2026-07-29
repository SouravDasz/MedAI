from sqlalchemy import Column,String,Integer,DateTime,Boolean
from datetime import datetime


from src.core.database import Base


class User(Base):
    __tablename__="users"

    id=Column(
        Integer,
        primary_key=True,
        index=True
    )
    name=Column(
        String,
        nullable=False
    )
    email=Column(
        String,
        nullable=False,
        unique=True,
        index=True
    )
    hash_password=Column(
        String,
        nullable=True)
    google_id = Column(
        String,
        nullable=True
    )
    provider = Column(
        String,
        nullable=False,
        default="email"
    )
    email_verified = Column(
        Boolean,
        default=False
    )