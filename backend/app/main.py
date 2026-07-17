from fastapi import FastAPI
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi import Depends


from app.database import get_db
from app.routes.zone_routes import router as zone_router
from app.routes.sensor_routes import router as sensor_router
from app.routes.worker_routes import router as worker_router
from app.routes.permit_routes import router as permit_router
from app.routes.maintenance_routes import router as maintenance_router
from app.routes.weather_routes import router as weather_router
from app.routes.telemetry_routes import router as telemetry_router
from app.routes.snapshot_routes import router as snapshot_router
from app.services.simulation_service import SimulationService

app = FastAPI(
    title="Industrial Safety Intelligence Platform",
    version="1.0.0"
)

@app.on_event("startup")
def startup():
    SimulationService.start()


@app.on_event("shutdown")
def shutdown():
    SimulationService.stop()

app.include_router(zone_router)
app.include_router(sensor_router)
app.include_router(worker_router)
app.include_router(permit_router)
app.include_router(maintenance_router)
app.include_router(weather_router)
app.include_router(telemetry_router)
app.include_router(snapshot_router)

@app.get("/")
def home():
    return {
        "message": "Backend is Running 🚀"
    }


@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))

        return {
            "status": "success",
            "database": "Connected Successfully ✅"
        }

    except Exception as e:
        return {
            "status": "failed",
            "error": str(e)
        }