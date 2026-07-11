from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class WorkerBase(BaseModel):
    worker_name: str = Field(..., min_length=2, max_length=100)
    employee_id: str
    zone_id: int
    designation: str
    shift: str
    ppe_status: str = "Wearing"
    status: str = "Active"


class WorkerCreate(WorkerBase):
    pass


class WorkerUpdate(BaseModel):
    worker_name: Optional[str] = None
    employee_id: Optional[str] = None
    zone_id: Optional[int] = None
    designation: Optional[str] = None
    shift: Optional[str] = None
    ppe_status: Optional[str] = None
    status: Optional[str] = None


class WorkerResponse(WorkerBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)