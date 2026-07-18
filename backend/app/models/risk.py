from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class RiskEngine(Base):
    __tablename__ = "risk_engine"

    id = Column(Integer, primary_key=True, index=True)
    snapshot_id = Column(Integer, ForeignKey("snapshots.id"), nullable=False)

    risk_score = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)

    sensor_analysis = Column(JSONB, nullable=False)
    recommendation = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    snapshot = relationship("Snapshot")