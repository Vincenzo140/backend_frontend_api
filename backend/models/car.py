from sqlalchemy import Column, String, Integer, UUID, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import uuid
from datetime import datetime

class Car(Base):
    __tablename__ = "cars"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    timestamp_cadastro = Column(DateTime, default=datetime.utcnow, nullable=False)
    modelo_id = Column(UUID(as_uuid=True), ForeignKey("models.id"), nullable=False)
    ano = Column(Integer, nullable=False)
    combustivel = Column(String, nullable=False)
    num_portas = Column(Integer, nullable=False)
    cor = Column(String, nullable=False)
    
    # Relacionamento com Model
    model = relationship("Model", back_populates="cars")
