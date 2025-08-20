import uuid
from pydantic import BaseModel, UUID4, Field


class BrandBase(BaseModel):
    nome_marca: str


class BrandCreate(BrandBase):
    pass


class Brand(BrandBase):
    id: UUID4 = Field(default_factory=uuid.uuid4)

    class Config:
        from_attributes = True
