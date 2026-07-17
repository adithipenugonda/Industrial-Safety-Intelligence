from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class CreateSnapshot(BaseModel):
    timestamp: Optional[datetime] = None
    total_zones: int = Field(default=0)
    total_sensors: int = Field(default=0)
    total_workers: int = Field(default=0)
    active_workers: int = Field(default=0)
    active_permits: int = Field(default=0)
    scheduled_maintenance: int = Field(default=0)
    latest_weather: Optional[dict[str, Any]] = None
    telemetry_summary: Optional[dict[str, Any]] = None
    factory_status: str = Field(default="Normal")
    notes: Optional[str] = None


class UpdateSnapshot(BaseModel):
    timestamp: Optional[datetime] = None
    total_zones: Optional[int] = None
    total_sensors: Optional[int] = None
    total_workers: Optional[int] = None
    active_workers: Optional[int] = None
    active_permits: Optional[int] = None
    scheduled_maintenance: Optional[int] = None
    latest_weather: Optional[dict[str, Any]] = None
    telemetry_summary: Optional[dict[str, Any]] = None
    factory_status: Optional[str] = None
    notes: Optional[str] = None


class SnapshotResponse(CreateSnapshot):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SnapshotList(BaseModel):
    items: list[SnapshotResponse]
    total: int
