from pydantic import BaseModel, ConfigDict
from typing import Dict, Any
from datetime import datetime


class CreateRiskAnalysis(BaseModel):
    snapshot_id: int
    risk_score: float
    risk_level: str
    sensor_analysis: Dict[str, Any]
    recommendation: str


class UpdateRiskAnalysis(BaseModel):
    risk_score: float
    risk_level: str
    sensor_analysis: Dict[str, Any]
    recommendation: str


class RiskAnalysisResponse(BaseModel):
    id: int
    snapshot_id: int
    risk_score: float
    risk_level: str
    sensor_analysis: Dict[str, Any]
    recommendation: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)