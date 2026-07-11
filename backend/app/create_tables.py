from app.database import Base, engine

# Import all models
from app.models.zone import Zone
from app.models.zone import Zone
from app.models.sensor import Sensor
from app.models.worker import Worker
from app.models.permit import Permit

Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")