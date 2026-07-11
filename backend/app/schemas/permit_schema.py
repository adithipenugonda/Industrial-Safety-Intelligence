from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class PermitBase(BaseModel):
    permit_type: str = Field(..., min_length=2, max_length=100)
    zone_id: int
    issued_to: str
    issued_by: str
    status: str = "Active"
    valid_from: datetime
    valid_to: datetime


class PermitCreate(PermitBase):
    pass


class PermitUpdate(BaseModel):
    permit_type: Optional[str] = None
    zone_id: Optional[int] = None
    issued_to: Optional[str] = None
    issued_by: Optional[str] = None
    status: Optional[str] = None
    valid_from: Optional[datetime] = None
    valid_to: Optional[datetime] = None


class PermitResponse(PermitBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)