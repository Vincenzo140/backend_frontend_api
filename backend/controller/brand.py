from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.database import get_db
from models.brand import Brand as BrandModel
from schemas.brand import Brand, BrandCreate

router = APIRouter(prefix="/brands", tags=["Brands"])

@router.post("/", response_model=Brand)
def create_brand(brand: BrandCreate, db: Session = Depends(get_db)):
    db_brand = BrandModel(nome_marca=brand.nome_marca)
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

@router.get("/", response_model=List[Brand])
def get_brands(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    brands = db.query(BrandModel).offset(skip).limit(limit).all()
    return brands

@router.get("/{brand_id}", response_model=Brand)
def get_brand(brand_id: str, db: Session = Depends(get_db)):
    brand = db.query(BrandModel).filter(BrandModel.id == brand_id).first()
    if brand is None:
        raise HTTPException(status_code=404, detail="Brand não encontrada")
    return brand

@router.put("/{brand_id}", response_model=Brand)
def update_brand(brand_id: str, brand: BrandCreate, db: Session = Depends(get_db)):
    db_brand = db.query(BrandModel).filter(BrandModel.id == brand_id).first()
    if db_brand is None:
        raise HTTPException(status_code=404, detail="Brand não encontrada")
    
    db_brand.nome_marca = brand.nome_marca
    db.commit()
    db.refresh(db_brand)
    return db_brand

@router.delete("/{brand_id}")
def delete_brand(brand_id: str, db: Session = Depends(get_db)):
    db_brand = db.query(BrandModel).filter(BrandModel.id == brand_id).first()
    if db_brand is None:
        raise HTTPException(status_code=404, detail="Brand não encontrada")
    
    db.delete(db_brand)
    db.commit()
    return {"message": "Brand deletada com sucesso"}

def configure(app):
    app.include_router(router)
