from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Zone(Base):
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True, index=True)

    zone_name = Column(String(100), nullable=False, unique=True)

    description = Column(String(255), nullable=True)

    status = Column(String(20), nullable=False, default="Active")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    sensors = relationship(
    "Sensor",
    back_populates="zone",
    cascade="all, delete"
)
    
    workers = relationship(
    "Worker",
    back_populates="zone",
    cascade="all, delete"
)
    
    permits = relationship(
    "Permit",
    back_populates="zone",
    cascade="all, delete"
)