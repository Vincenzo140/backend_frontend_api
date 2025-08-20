from sqlalchemy import Column, String, Integer, UUID, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import uuid

class Model(Base):
    __tablename__ = "models"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    brand_id = Column(UUID(as_uuid=True), ForeignKey("brands.id"), nullable=False)
    nome = Column(String, nullable=False)
    valor_fipe = Column(Integer, nullable=False)
    
    # Relacionamentos
    brand = relationship("Brand", back_populates="models")
    cars = relationship("Car", back_populates="model")
