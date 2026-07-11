from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class MaintenanceBase(BaseModel):
    machine_name: str = Field(..., min_length=2, max_length=100)
    zone_id: int
    maintenance_type: str
    assigned_to: str
    status: str = "Scheduled"
    start_time: datetime
    end_time: datetime


class MaintenanceCreate(MaintenanceBase):
    pass


class MaintenanceUpdate(BaseModel):
    machine_name: Optional[str] = None
    zone_id: Optional[int] = None
    maintenance_type: Optional[str] = None
    assigned_to: Optional[str] = None
    status: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None


class MaintenanceResponse(MaintenanceBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)