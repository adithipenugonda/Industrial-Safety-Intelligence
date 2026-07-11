from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Application Information
    APP_NAME: str
    APP_VERSION: str
    APP_DESCRIPTION: str

    # Database
    DATABASE_URL: str

    # Authentication
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()