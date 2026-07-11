from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.weather_schema import (
    WeatherCreate,
    WeatherUpdate,
    WeatherResponse
)
from app.services.weather_service import WeatherService

router = APIRouter(
    prefix="/weather",
    tags=["Weather"]
)


@router.get("/", response_model=list[WeatherResponse])
def get_all_weather(db: Session = Depends(get_db)):
    return WeatherService.get_all_weather(db)


@router.get("/{weather_id}", response_model=WeatherResponse)
def get_weather(weather_id: int, db: Session = Depends(get_db)):
    weather = WeatherService.get_weather_by_id(db, weather_id)

    if not weather:
        raise HTTPException(status_code=404, detail="Weather record not found")

    return weather


@router.post("/", response_model=WeatherResponse, status_code=201)
def create_weather(weather: WeatherCreate, db: Session = Depends(get_db)):
    return WeatherService.create_weather(db, weather)


@router.put("/{weather_id}", response_model=WeatherResponse)
def update_weather(
    weather_id: int,
    weather: WeatherUpdate,
    db: Session = Depends(get_db)
):
    updated = WeatherService.update_weather(
        db,
        weather_id,
        weather
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Weather record not found")

    return updated


@router.delete("/{weather_id}")
def delete_weather(weather_id: int, db: Session = Depends(get_db)):
    deleted = WeatherService.delete_weather(db, weather_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Weather record not found")

    return {"message": "Weather record deleted successfully"}