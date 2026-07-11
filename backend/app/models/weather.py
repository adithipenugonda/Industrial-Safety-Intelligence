from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Weather(Base):
    __tablename__ = "weather"

    id = Column(Integer, primary_key=True, index=True)

    location = Column(String(100), nullable=False)

    temperature = Column(Float, nullable=False)

    humidity = Column(Float, nullable=False)

    wind_speed = Column(Float, nullable=False)

    weather_condition = Column(String(50), nullable=False)

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