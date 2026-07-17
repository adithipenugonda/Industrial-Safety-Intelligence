from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.sql import func

from app.database import Base


class Snapshot(Base):
    __tablename__ = "snapshots"

    id = Column(Integer, primary_key=True, index=True)

    timestamp = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True
    )

    total_zones = Column(Integer, nullable=False, default=0)

    total_sensors = Column(Integer, nullable=False, default=0)

    total_workers = Column(Integer, nullable=False, default=0)

    active_workers = Column(Integer, nullable=False, default=0)

    active_permits = Column(Integer, nullable=False, default=0)

    scheduled_maintenance = Column(Integer, nullable=False, default=0)

    latest_weather = Column(JSON, nullable=True)

    telemetry_summary = Column(JSON, nullable=True)

    factory_status = Column(String(50), nullable=False, default="Normal")

    notes = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
