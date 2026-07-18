from typing import List
from pydantic import BaseModel


class OptimizerResponse(BaseModel):
    priority: str
    summary: str
    root_cause: str
    recommendations: List[str]
    estimated_risk_reduction: str