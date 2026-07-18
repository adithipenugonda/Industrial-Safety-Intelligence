from datetime import datetime
from pydantic import BaseModel, ConfigDict


class AlertResponse(BaseModel):
    id: int
    risk_id: int
    sensor_name: str
    alert_type: str
    severity: str
    message: str
    recommended_action: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)