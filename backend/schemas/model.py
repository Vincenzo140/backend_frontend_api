import uuid
from pydantic import BaseModel, UUID4, Field
from .brand import Brand


class ModelBase(BaseModel):
    brand_id: UUID4
    nome: str
    valor_fipe: int


class ModelCreate(BaseModel):
    brand_id: UUID4
    nome: str
    valor_fipe: int


class Model(ModelBase):
    id: UUID4 = Field(default_factory=uuid.uuid4)
    brand: Brand

    class Config:
        from_attributes = True
