from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Permit(Base):
    __tablename__ = "permits"

    id = Column(Integer, primary_key=True, index=True)

    permit_type = Column(String(100), nullable=False)

    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)

    issued_to = Column(String(100), nullable=False)

    issued_by = Column(String(100), nullable=False)

    status = Column(String(30), default="Active")

    valid_from = Column(DateTime(timezone=True), nullable=False)

    valid_to = Column(DateTime(timezone=True), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    zone = relationship("Zone", back_populates="permits")