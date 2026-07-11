from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class WeatherBase(BaseModel):
    location: str
    temperature: float
    humidity: float
    wind_speed: float
    weather_condition: str
    status: str = "Active"


class WeatherCreate(WeatherBase):
    pass


class WeatherUpdate(BaseModel):
    location: Optional[str] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    wind_speed: Optional[float] = None
    weather_condition: Optional[str] = None
    status: Optional[str] = None


class WeatherResponse(WeatherBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)