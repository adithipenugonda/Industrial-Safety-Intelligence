from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Maintenance(Base):
    __tablename__ = "maintenance"

    id = Column(Integer, primary_key=True, index=True)

    machine_name = Column(String(100), nullable=False)

    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)

    maintenance_type = Column(String(100), nullable=False)

    assigned_to = Column(String(100), nullable=False)

    status = Column(String(30), default="Scheduled")

    start_time = Column(DateTime(timezone=True), nullable=False)

    end_time = Column(DateTime(timezone=True), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    zone = relationship("Zone", back_populates="maintenances")