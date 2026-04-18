from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Todo API"
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/todoapp"

    class Config:
        env_file = ".env"

settings = Settings()
