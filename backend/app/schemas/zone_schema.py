from pydantic import BaseModel, Field
from typing import Optional


class ZoneBase(BaseModel):
    zone_name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    status: str = "Active"


class ZoneCreate(ZoneBase):
    pass


class ZoneUpdate(BaseModel):
    zone_name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class ZoneResponse(ZoneBase):
    id: int

    class Config:
        from_attributes = True