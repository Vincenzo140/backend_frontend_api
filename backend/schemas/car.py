import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, UUID4, Field


class CarCreate(BaseModel):
    modelo_id: UUID4
    ano: int
    combustivel: str
    num_portas: int
    cor: str


class CarUpdate(BaseModel):
    id: UUID4
    timestamp_cadastro: Optional[datetime] = None
    modelo_id: Optional[UUID4] = None
    ano: Optional[int] = None
    combustivel: Optional[str] = None
    num_portas: Optional[int] = None
    cor: Optional[str] = None


class CarDelete(BaseModel):
    id: UUID4


class CarResponse(BaseModel):
    id: UUID4
    timestamp_cadastro: datetime
    modelo_id: UUID4
    ano: int
    combustivel: str
    num_portas: int
    cor: str

    class Config:
        from_attributes = True
