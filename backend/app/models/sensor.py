from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.orm import relationship

from app.database import Base


class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)

    sensor_name = Column(String(100), nullable=False)

    sensor_type = Column(String(50), nullable=False)

    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)

    unit = Column(String(20), nullable=False)

    # current_value = Column(Float, nullable=False)

    min_threshold = Column(Float, nullable=False)

    max_threshold = Column(Float, nullable=False)

    status = Column(String(20), default="Active")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    zone = relationship(
    "Zone",
    back_populates="sensors"
)
    
    telemetry = relationship(
    "Telemetry",
    back_populates="sensor",
    cascade="all, delete-orphan"
)