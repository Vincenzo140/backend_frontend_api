from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.database import get_db
from models.car import Car as CarModel
from schemas.car import CarCreate, CarUpdate, CarDelete, CarResponse

router = APIRouter(prefix="/cars", tags=["Cars"])

@router.post("/", response_model=CarResponse)
def create_car(car: CarCreate, db: Session = Depends(get_db)):
    db_car = CarModel(
        modelo_id=car.modelo_id,
        ano=car.ano,
        combustivel=car.combustivel,
        num_portas=car.num_portas,
        cor=car.cor
    )
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

@router.get("/", response_model=List[CarResponse])
def get_cars(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cars = db.query(CarModel).offset(skip).limit(limit).all()
    return cars

@router.get("/{car_id}", response_model=CarResponse)
def get_car(car_id: str, db: Session = Depends(get_db)):
    car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if car is None:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    return car

@router.put("/{car_id}", response_model=CarResponse)
def update_car(car_id: str, car: CarUpdate, db: Session = Depends(get_db)):
    db_car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if db_car is None:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    
    if car.timestamp_cadastro is not None:
        db_car.timestamp_cadastro = car.timestamp_cadastro
    if car.modelo_id is not None:
        db_car.modelo_id = car.modelo_id
    if car.ano is not None:
        db_car.ano = car.ano
    if car.combustivel is not None:
        db_car.combustivel = car.combustivel
    if car.num_portas is not None:
        db_car.num_portas = car.num_portas
    if car.cor is not None:
        db_car.cor = car.cor
    
    db.commit()
    db.refresh(db_car)
    return db_car

@router.delete("/{car_id}")
def delete_car(car_id: str, db: Session = Depends(get_db)):
    db_car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if db_car is None:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    
    db.delete(db_car)
    db.commit()
    return {"message": "Carro deletado com sucesso"}

def configure(app):
    app.include_router(router)
