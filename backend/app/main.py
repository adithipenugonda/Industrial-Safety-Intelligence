import asyncio
import json
import random
import time
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

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
from app.routes.risk_routes import router as risk_router
from app.routes.alert_routes import router as alert_router
from app.routes.time_machine_routes import router as time_machine_router
from app.routes.optimizer_routes import optimizer_router

app = FastAPI(
    title="Industrial Safety Intelligence Platform",
    version="1.0.0"
)

# Enable CORS for frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    try:
        SimulationService.start()
    except Exception:
        pass

@app.on_event("shutdown")
def shutdown():
    try:
        SimulationService.stop()
    except Exception:
        pass

app.include_router(zone_router)
app.include_router(sensor_router)
app.include_router(worker_router)
app.include_router(permit_router)
app.include_router(maintenance_router)
app.include_router(weather_router)
app.include_router(telemetry_router)
app.include_router(snapshot_router)
app.include_router(risk_router)
app.include_router(alert_router)
app.include_router(time_machine_router)
app.include_router(optimizer_router)

@app.get("/")
def home():
    return {
        "message": "Industrial Safety Intelligence FastAPI Backend Running 🚀",
        "websocket": "ws://localhost:8000/ws/telemetry"
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

# =========================================================================
# REAL-TIME SCADA WEBSOCKET STREAM ENDPOINT
# =========================================================================
@app.websocket("/ws/telemetry")
async def websocket_telemetry_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("⚡ Real-Time SCADA WebSocket Client Connected!")

    sensors_base = [
        {"id": 1, "name": "Flow Rate", "type": "FLOW RATE", "unit": "L/min", "base": 37, "variance": 3, "status": "NOMINAL"},
        {"id": 2, "name": "Vibration", "type": "VIBRATION", "unit": "mm/s", "base": 152, "variance": 5, "status": "NOMINAL"},
        {"id": 3, "name": "Core Temp", "type": "TEMP °C", "unit": "°C", "base": 855, "variance": 20, "status": "NOMINAL"},
        {"id": 4, "name": "Exhaust", "type": "EXHAUST °C", "unit": "°C", "base": 1288, "variance": 40, "status": "NOMINAL"},
        {"id": 5, "name": "Oxygen", "type": "OXYGEN %", "unit": "%", "base": 43.81, "variance": 2, "status": "NOMINAL"},
        {"id": 6, "name": "Power", "type": "POWER %", "unit": "%", "base": 85.8, "variance": 3, "status": "NOMINAL"},
        {"id": 7, "name": "Air Flow", "type": "AIR FLOW", "unit": "m³/s", "base": 0.05, "variance": 0.01, "status": "NOMINAL"},
        {"id": 8, "name": "Pressure", "type": "PRESSURE", "unit": "Bar", "base": 0.69, "variance": 0.2, "status": "CRITICAL"}
    ]

    try:
        while True:
            updated_sensors = []
            for s in sensors_base:
                val = s["base"] + (random.random() * s["variance"] * 2 - s["variance"])
                if s["unit"] in ["%", "Bar", "m³/s"]:
                    val = round(val, 2)
                else:
                    val = round(val)

                updated_sensors.append({
                    "id": s["id"],
                    "name": s["name"],
                    "type": s["type"],
                    "unit": s["unit"],
                    "value": val,
                    "status": "CRITICAL" if s["id"] == 8 else "NOMINAL"
                })

            payload = {
                "timestamp": time.strftime("%H:%M:%S"),
                "sensors": updated_sensors,
                "overallHealth": "WARNING"
            }

            await websocket.send_text(json.dumps(payload))
            await asyncio.sleep(1.8)

    except WebSocketDisconnect:
        print("🔌 SCADA WebSocket Client Disconnected")
    except Exception as e:
        print(f"WebSocket Error: {e}")