from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Telemetry(Base):
    __tablename__ = "telemetry"

    id = Column(Integer, primary_key=True, index=True)

    sensor_id = Column(
        Integer,
        ForeignKey("sensors.id"),
        nullable=False
    )

    reading_value = Column(
        Float,
        nullable=False
    )

    reading_time = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    sensor = relationship(
        "Sensor",
        back_populates="telemetry"
    )