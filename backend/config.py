from pydantic_settings import BaseSettings

class Config(BaseSettings):
    port: int = 8000
    database_url: str = "postgresql://postgres:postgres@localhost:5432/car_system"
    
    class Config:
        env_file = ".env"
