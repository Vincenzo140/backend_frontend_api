from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.database import get_db
from models.model import Model as ModelModel
from schemas.model import Model, ModelCreate

router = APIRouter(prefix="/models", tags=["Models"])

@router.post("/", response_model=Model)
def create_model(model: ModelCreate, db: Session = Depends(get_db)):
    db_model = ModelModel(
        brand_id=model.brand_id,
        nome=model.nome,
        valor_fipe=model.valor_fipe
    )
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model

@router.get("/", response_model=List[Model])
def get_models(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    models = db.query(ModelModel).offset(skip).limit(limit).all()
    return models

@router.get("/{model_id}", response_model=Model)
def get_model(model_id: str, db: Session = Depends(get_db)):
    model = db.query(ModelModel).filter(ModelModel.id == model_id).first()
    if model is None:
        raise HTTPException(status_code=404, detail="Model não encontrado")
    return model

@router.put("/{model_id}", response_model=Model)
def update_model(model_id: str, model: ModelCreate, db: Session = Depends(get_db)):
    db_model = db.query(ModelModel).filter(ModelModel.id == model_id).first()
    if db_model is None:
        raise HTTPException(status_code=404, detail="Model não encontrado")
    
    db_model.brand_id = model.brand_id
    db_model.nome = model.nome
    db_model.valor_fipe = model.valor_fipe
    db.commit()
    db.refresh(db_model)
    return db_model

@router.delete("/{model_id}")
def delete_model(model_id: str, db: Session = Depends(get_db)):
    db_model = db.query(ModelModel).filter(ModelModel.id == model_id).first()
    if db_model is None:
        raise HTTPException(status_code=404, detail="Model não encontrado")
    
    db.delete(db_model)
    db.commit()
    return {"message": "Model deletado com sucesso"}

def configure(app):
    app.include_router(router)
