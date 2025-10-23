from pydantic import BaseModel
import os

class Settings(BaseModel):
    app_name: str = os.getenv("APP_NAME", "Safina (Arabic)")
    locale: str = os.getenv("APP_LOCALE", "ar-AE")
    dialect: str = os.getenv("APP_DIALECT", "ar-Gulf")
    database_url: str = os.getenv("DATABASE_URL", "postgresql+psycopg://safina:safina@db:5432/safina")
    redis_url: str = os.getenv("REDIS_URL", "redis://redis:6379/0")
    jwt_secret: str = os.getenv("JWT_SECRET", "change-me")
    jwt_expires_min: int = int(os.getenv("JWT_EXPIRES_MIN", "30"))
    jwt_refresh_days: int = int(os.getenv("JWT_REFRESH_EXPIRES_DAYS", "30"))
    s3_endpoint: str = os.getenv("S3_ENDPOINT_URL", "http://minio:9000")
    s3_bucket: str = os.getenv("S3_BUCKET", "safina-voice")
    s3_access_key: str = os.getenv("S3_ACCESS_KEY", "minio")
    s3_secret_key: str = os.getenv("S3_SECRET_KEY", "minio123")

settings = Settings()
