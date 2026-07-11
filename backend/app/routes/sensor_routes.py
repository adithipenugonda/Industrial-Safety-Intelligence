from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.sensor_schema import (
    SensorCreate,
    SensorUpdate,
    SensorResponse
)
from app.services.sensor_service import SensorService

router = APIRouter(
    prefix="/sensors",
    tags=["Sensors"]
)


@router.get("/", response_model=list[SensorResponse])
def get_all_sensors(db: Session = Depends(get_db)):
    return SensorService.get_all_sensors(db)


@router.get("/{sensor_id}", response_model=SensorResponse)
def get_sensor(sensor_id: int, db: Session = Depends(get_db)):
    sensor = SensorService.get_sensor_by_id(db, sensor_id)

    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    return sensor


@router.post("/", response_model=SensorResponse, status_code=201)
def create_sensor(sensor: SensorCreate, db: Session = Depends(get_db)):
    try:
        return SensorService.create_sensor(db, sensor)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{sensor_id}", response_model=SensorResponse)
def update_sensor(
    sensor_id: int,
    sensor: SensorUpdate,
    db: Session = Depends(get_db)
):
    updated_sensor = SensorService.update_sensor(
        db,
        sensor_id,
        sensor
    )

    if not updated_sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    return updated_sensor


@router.delete("/{sensor_id}")
def delete_sensor(sensor_id: int, db: Session = Depends(get_db)):
    deleted_sensor = SensorService.delete_sensor(db, sensor_id)

    if not deleted_sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    return {"message": "Sensor deleted successfully"}