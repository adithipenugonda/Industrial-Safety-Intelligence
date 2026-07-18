from app.database import Base, engine

# Import all models
from app.models.zone import Zone
from app.models.zone import Zone
from app.models.sensor import Sensor
from app.models.worker import Worker
from app.models.permit import Permit
from app.models.maintenance import Maintenance
from app.models.weather import Weather
from app.models.telemetry import Telemetry
from app.models.snapshot import Snapshot
from app.models.risk import RiskEngine
from app.models.alert import Alert

Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")