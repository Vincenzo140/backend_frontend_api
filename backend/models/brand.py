from sqlalchemy import Column, String, UUID
from sqlalchemy.orm import relationship
from .database import Base
import uuid

class Brand(Base):
    __tablename__ = "brands"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome_marca = Column(String, nullable=False, unique=True)
    
    # Relacionamento com Model
    models = relationship("Model", back_populates="brand")
