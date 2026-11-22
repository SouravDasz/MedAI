
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    PROJECT_NAME: str = "MedAI"

    DATABASE_URL: str = "sqlite:///./medai.db"

    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    GOOGLE_REDIRECT_URI: str

    FRONTEND_URL: str = "http://localhost:5173"

    MAILERCLOUD_API_KEY: str

    MAILERCLOUD_SENDER_EMAIL: str

    MAILERCLOUD_SENDER_NAME: str = "MedAI"

    OTP_RESEND_COOLDOWN_SECONDS: int = 60

    GOOGLE_LINK_REDIRECT_URI: str

    COOKIE_SECURE: bool = False

    COOKIE_SAMESITE: str = "lax"

    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()
