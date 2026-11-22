
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    UniqueConstraint
)

from sqlalchemy.sql import func

from app.database.connection import Base


class EmailVerification(Base):

    __tablename__ = "email_verifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    otp_hash = Column(
        String(64),
        nullable=False
    )

    expires_at = Column(
        DateTime,
        nullable=False
    )

    attempts = Column(
        Integer,
        default=0,
        nullable=False
    )

    is_used = Column(
        Boolean,
        default=False,
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    last_sent_at = Column(
    DateTime,
    nullable=False,
    server_default=func.now()
)
