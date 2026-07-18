from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, text

from app.config import settings

# --------------------------------------------------
# Create Database Engine
# --------------------------------------------------

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True
)

# --------------------------------------------------
# Create Session Factory
# --------------------------------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# --------------------------------------------------
# Base Class for all Models
# --------------------------------------------------

Base = declarative_base()

# Import all models so SQLAlchemy can resolve relationships
# consistently before any repository queries run.
from app.models.telemetry import Telemetry  # noqa: E402,F401
from app.models.zone import Zone  # noqa: E402,F401
from app.models.sensor import Sensor  # noqa: E402,F401
from app.models.worker import Worker  # noqa: E402,F401
from app.models.permit import Permit  # noqa: E402,F401
from app.models.maintenance import Maintenance  # noqa: E402,F401
from app.models.weather import Weather  # noqa: E402,F401
from app.models.snapshot import Snapshot  # noqa: E402,F401

# --------------------------------------------------
# Dependency to get DB Session
# --------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()