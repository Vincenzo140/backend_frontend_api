from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic_settings import BaseSettings
import os

class DatabaseSettings(BaseSettings):
    database_url: str = "postgresql://postgres:postgres@localhost:5432/car_system"
    
    class Config:
        env_file = ".env"

settings = DatabaseSettings()

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
