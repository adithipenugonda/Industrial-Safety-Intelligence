from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    risk_id = Column(
        Integer,
        ForeignKey("risk_engine.id"),
        nullable=False
    )

    sensor_name = Column(String, nullable=False)

    alert_type = Column(String, nullable=False)

    severity = Column(String, nullable=False)

    message = Column(String, nullable=False)

    recommended_action = Column(String, nullable=False)

    status = Column(
        String,
        default="OPEN",
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    risk = relationship("RiskEngine")