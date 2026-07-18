import logging
from datetime import datetime, timezone
from typing import Any, Optional

from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry
from app.services.maintenance_service import MaintenanceService
from app.services.permit_service import PermitService
from app.services.sensor_service import SensorService
from app.services.telemetry_service import TelemetryService
from app.services.weather_service import WeatherService
from app.services.worker_service import WorkerService
from app.services.zone_service import ZoneService

logger = logging.getLogger(__name__)


class ContextEngineService:
    """Build a lightweight, reusable view of the current factory state."""

    @staticmethod
    def _serialize_zone(zone: Any) -> dict[str, Any]:
        return {
            "id": zone.id,
            "zone_name": zone.zone_name,
            "description": zone.description,
            "status": zone.status,
            "created_at": (
                zone.created_at.isoformat() if zone.created_at else None
            )
        }

    @staticmethod
    def _serialize_sensor(sensor: Any) -> dict[str, Any]:
        return {
            "id": sensor.id,
            "sensor_name": sensor.sensor_name,
            "sensor_type": sensor.sensor_type,
            "zone_id": sensor.zone_id,
            "unit": sensor.unit,
            "min_threshold": sensor.min_threshold,
            "max_threshold": sensor.max_threshold,
            "status": sensor.status,
            "created_at": (
                sensor.created_at.isoformat() if sensor.created_at else None
            )
        }

    @staticmethod
    def _serialize_worker(worker: Any) -> dict[str, Any]:
        return {
            "id": worker.id,
            "worker_name": worker.worker_name,
            "employee_id": worker.employee_id,
            "zone_id": worker.zone_id,
            "designation": worker.designation,
            "shift": worker.shift,
            "ppe_status": worker.ppe_status,
            "status": worker.status,
            "created_at": (
                worker.created_at.isoformat() if worker.created_at else None
            )
        }

    @staticmethod
    def _serialize_permit(permit: Any) -> dict[str, Any]:
        return {
            "id": permit.id,
            "permit_type": permit.permit_type,
            "zone_id": permit.zone_id,
            "issued_to": permit.issued_to,
            "issued_by": permit.issued_by,
            "status": permit.status,
            "valid_from": (
                permit.valid_from.isoformat() if permit.valid_from else None
            ),
            "valid_to": (
                permit.valid_to.isoformat() if permit.valid_to else None
            )
        }

    @staticmethod
    def _serialize_maintenance(maintenance: Any) -> dict[str, Any]:
        return {
            "id": maintenance.id,
            "machine_name": maintenance.machine_name,
            "zone_id": maintenance.zone_id,
            "maintenance_type": maintenance.maintenance_type,
            "assigned_to": maintenance.assigned_to,
            "status": maintenance.status,
            "start_time": (
                maintenance.start_time.isoformat() if maintenance.start_time else None
            ),
            "end_time": (
                maintenance.end_time.isoformat() if maintenance.end_time else None
            )
        }

    @staticmethod
    def _serialize_weather(weather: Optional[Any]) -> Optional[dict[str, Any]]:
        if not weather:
            return None

        return {
            "id": weather.id,
            "location": weather.location,
            "temperature": weather.temperature,
            "humidity": weather.humidity,
            "wind_speed": weather.wind_speed,
            "weather_condition": weather.weather_condition,
            "status": weather.status,
            "created_at": (
                weather.created_at.isoformat() if weather.created_at else None
            )
        }

    @staticmethod
    def _serialize_telemetry(telemetry: Optional[Any]) -> Optional[dict[str, Any]]:
        if not telemetry:
            return None

        return {
            "id": telemetry.id,
            "sensor_id": telemetry.sensor_id,
            "reading_value": telemetry.reading_value,
            "reading_time": (
                telemetry.reading_time.isoformat() if telemetry.reading_time else None
            )
        }

    @staticmethod
    def _resolve_factory_status(
        telemetry_available: bool,
        weather_available: bool,
        sensors: list[dict[str, Any]],
        maintenance_items: list[dict[str, Any]],
        missing_modules: int,
    ) -> str:
        if not telemetry_available and missing_modules >= 2:
            return "CRITICAL"

        if not telemetry_available or missing_modules >= 2:
            return "CRITICAL"

        if not weather_available or not sensors or not any(
            sensor.get("status") == "Active" for sensor in sensors
        ):
            return "WARNING"

        if any(
            item.get("status") in {"Scheduled", "Pending", "Overdue"}
            for item in maintenance_items
        ):
            return "WARNING"

        return "NORMAL"

    @staticmethod
    def build_factory_context(db: Session) -> dict[str, Any]:
        """Assemble the current factory context from the existing modules."""
        try:
            zones = ZoneService.get_all_zones(db) or []
            sensors = SensorService.get_all_sensors(db) or []
            workers = WorkerService.get_all_workers(db) or []
            permits = PermitService.get_all_permits(db) or []
            maintenance_items = MaintenanceService.get_all_maintenance(db) or []
            weather_items = WeatherService.get_all_weather(db) or []

            serialized_zones = [
                ContextEngineService._serialize_zone(zone)
                for zone in zones
            ]
            serialized_sensors = [
                ContextEngineService._serialize_sensor(sensor)
                for sensor in sensors
            ]
            serialized_workers = [
                ContextEngineService._serialize_worker(worker)
                for worker in workers
            ]
            serialized_permits = [
                ContextEngineService._serialize_permit(permit)
                for permit in permits
                if getattr(permit, "status", None) == "Active"
            ]
            serialized_maintenance = [
                ContextEngineService._serialize_maintenance(item)
                for item in maintenance_items
            ]

            latest_weather = None
            if weather_items:
                latest_weather = max(
                    weather_items,
                    key=lambda item: (
                        item.created_at or datetime.min.replace(tzinfo=timezone.utc)
                    )
                )

            telemetry_rows = (
                db.query(Telemetry)
                .order_by(Telemetry.reading_time.desc())
                .all()
            )

            latest_telemetry = telemetry_rows[0] if telemetry_rows else None

            telemetry_total = len(telemetry_rows)
            telemetry_average = (
                sum(item.reading_value for item in telemetry_rows) / telemetry_total
                if telemetry_total
                else 0
            )
            telemetry_max = (
                max(item.reading_value for item in telemetry_rows)
                if telemetry_total
                else 0
            )
            telemetry_min = (
                min(item.reading_value for item in telemetry_rows)
                if telemetry_total
                else 0
            )

            sensor_readings = {}

            for sensor in sensors:
                sensor_readings[sensor.sensor_type] = {
                    "value": sensor.current_value,
                    "unit": sensor.unit,
                    "min_threshold": sensor.min_threshold,
                    "max_threshold": sensor.max_threshold,
                    "status": sensor.status
                }

            telemetry_summary = {
                "sensor_readings": sensor_readings,
                "statistics": {
                    "total_readings": telemetry_total,
                    "latest_value": (
                        latest_telemetry.reading_value if latest_telemetry else None
                    ),
                    "latest_time": (
                        latest_telemetry.reading_time.isoformat()
                        if latest_telemetry and latest_telemetry.reading_time
                        else None
                    ),
                    "average_value": round(float(telemetry_average), 2),
                    "max_value": round(float(telemetry_max), 2),
                    "min_value": round(float(telemetry_min), 2),
                    "sensor_count": len({item.sensor_id for item in telemetry_rows})
                }
            }

            telemetry_available = latest_telemetry is not None
            weather_available = latest_weather is not None

            missing_modules = 0
            if not telemetry_available:
                missing_modules += 1
            if not weather_available:
                missing_modules += 1
            if not serialized_sensors:
                missing_modules += 1

            factory_status = ContextEngineService._resolve_factory_status(
                telemetry_available=telemetry_available,
                weather_available=weather_available,
                sensors=serialized_sensors,
                maintenance_items=serialized_maintenance,
                missing_modules=missing_modules,
            )

            summary = {
                "zone_count": len(serialized_zones),
                "sensor_count": len(serialized_sensors),
                "worker_count": len(serialized_workers),
                "active_permits": len(serialized_permits),
                "maintenance_due": sum(
                    1
                    for item in serialized_maintenance
                    if item.get("status") in {"Scheduled", "Pending", "Overdue"}
                ),
                "factory_status": factory_status
            }

            return {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "zones": serialized_zones,
                "sensors": serialized_sensors,
                "workers": serialized_workers,
                "permits": serialized_permits,
                "maintenance": serialized_maintenance,
                "weather": ContextEngineService._serialize_weather(latest_weather),
                "telemetry": ContextEngineService._serialize_telemetry(latest_telemetry),
                "telemetry_summary": telemetry_summary,
                "summary": summary
            }

        except Exception as exc:
            logger.exception("Failed to build factory context")
            return {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "zones": [],
                "sensors": [],
                "workers": [],
                "permits": [],
                "maintenance": [],
                "weather": None,
                "telemetry": None,
                "telemetry_summary": {},
                "summary": {
                    "zone_count": 0,
                    "sensor_count": 0,
                    "worker_count": 0,
                    "active_permits": 0,
                    "maintenance_due": 0,
                    "factory_status": "CRITICAL"
                },
                "error": str(exc)
            }


def build_factory_context(db: Session) -> dict[str, Any]:
    """Convenience function for downstream services and modules."""
    return ContextEngineService.build_factory_context(db)