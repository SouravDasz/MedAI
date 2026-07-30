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

    otp=Column(
        String
    )

    otp_expiry = Column(DateTime(timezone=True))

    created_at = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(UTC)
    )