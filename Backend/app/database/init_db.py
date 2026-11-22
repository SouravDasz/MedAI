from app.database.connection import Base, engine

from app.models.user import User
from app.models.oauth_account import OAuthAccount
from app.models.email_verification import EmailVerification
from app.models.refresh_session import RefreshSession


def create_tables():
    Base.metadata.create_all(bind=engine)