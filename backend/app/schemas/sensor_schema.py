from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class SensorBase(BaseModel):
    sensor_name: str = Field(..., min_length=2, max_length=100)
    sensor_type: str
    zone_id: int
    unit: str
    current_value: float
    min_threshold: float
    max_threshold: float
    status: str = "Active"


class SensorCreate(SensorBase):
    pass


class SensorUpdate(BaseModel):
    sensor_name: Optional[str] = None
    sensor_type: Optional[str] = None
    zone_id: Optional[int] = None
    unit: Optional[str] = None
    current_value: Optional[float] = None
    min_threshold: Optional[float] = None
    max_threshold: Optional[float] = None
    status: Optional[str] = None


class SensorResponse(SensorBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)