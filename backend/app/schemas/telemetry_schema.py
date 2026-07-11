from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class TelemetryBase(BaseModel):
    sensor_id: int
    reading_value: float


class TelemetryCreate(TelemetryBase):
    pass


class TelemetryUpdate(BaseModel):
    reading_value: Optional[float] = None


class TelemetryResponse(TelemetryBase):
    id: int
    reading_time: datetime

    model_config = ConfigDict(from_attributes=True)