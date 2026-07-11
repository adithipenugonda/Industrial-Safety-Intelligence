from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)

    worker_name = Column(String(100), nullable=False)

    employee_id = Column(String(50), unique=True, nullable=False)

    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)

    designation = Column(String(100), nullable=False)

    shift = Column(String(50), nullable=False)

    ppe_status = Column(String(30), default="Wearing")

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

    zone = relationship("Zone", back_populates="workers")