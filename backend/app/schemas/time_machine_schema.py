from datetime import datetime
from typing import List
from typing import Optional

from pydantic import BaseModel, ConfigDict


class TimelineResponse(BaseModel):
    snapshot_id: int
    created_at: datetime
    risk_score: float
    risk_level: str

    model_config = ConfigDict(from_attributes=True)


# class SnapshotData(BaseModel):
#     id: int
#     factory_status: str
#     active_workers: int
#     active_permits: int
#     scheduled_maintenance: int
#     latest_weather: str
#     created_at: datetime

#     model_config = ConfigDict(from_attributes=True)

from typing import Optional

class WeatherData(BaseModel):
    id: int
    location: str
    temperature: float
    humidity: float
    wind_speed: float
    weather_condition: str
    status: str

    model_config = ConfigDict(from_attributes=True)


class SnapshotData(BaseModel):
    id: int
    timestamp: datetime
    factory_status: str
    active_workers: int
    active_permits: int
    scheduled_maintenance: int
    latest_weather: Optional[WeatherData]

    model_config = ConfigDict(from_attributes=True)


class RiskData(BaseModel):
    id: int
    snapshot_id: int
    risk_score: float
    risk_level: str
    recommendation: str

    model_config = ConfigDict(from_attributes=True)


class AlertData(BaseModel):
    id: int
    sensor_name: str
    alert_type: str
    severity: str
    message: str
    recommended_action: str
    status: str

    model_config = ConfigDict(from_attributes=True)


class ReplayResponse(BaseModel):
    snapshot: SnapshotData
    risk: RiskData | None
    alerts: List[AlertData]