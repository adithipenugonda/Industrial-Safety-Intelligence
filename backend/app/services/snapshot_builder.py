from datetime import datetime, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.maintenance import Maintenance
from app.models.permit import Permit
from app.models.sensor import Sensor
from app.models.telemetry import Telemetry
from app.models.weather import Weather
from app.models.worker import Worker
from app.models.zone import Zone
from app.repositories.snapshot_repo import SnapshotRepository
from app.schemas.snapshot_schema import CreateSnapshot


class SnapshotBuilderService:

    @staticmethod
    def _serialize_weather(weather):
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
                weather.created_at.isoformat()
                if weather.created_at else None
            )
        }

    @staticmethod
    def build_snapshot(db: Session):
        total_zones = db.query(Zone).count()
        total_sensors = db.query(Sensor).count()
        total_workers = db.query(Worker).count()
        active_workers = db.query(Worker).filter(Worker.status == "Active").count()
        active_permits = db.query(Permit).filter(Permit.status == "Active").count()
        scheduled_maintenance = db.query(Maintenance).filter(
            Maintenance.status == "Scheduled"
        ).count()

        latest_weather = (
            db.query(Weather)
            .order_by(Weather.created_at.desc())
            .first()
        )

        telemetry_total = db.query(func.count(Telemetry.id)).scalar() or 0
        telemetry_average = db.query(func.avg(Telemetry.reading_value)).scalar() or 0
        telemetry_max = db.query(func.max(Telemetry.reading_value)).scalar() or 0
        telemetry_min = db.query(func.min(Telemetry.reading_value)).scalar() or 0
        telemetry_sensor_count = (
            db.query(func.count(func.distinct(Telemetry.sensor_id))).scalar() or 0
        )
        latest_telemetry = (
            db.query(Telemetry)
            .order_by(Telemetry.reading_time.desc())
            .first()
        )

        telemetry_summary = {
            "total_readings": telemetry_total,
            "latest_value": (
                latest_telemetry.reading_value
                if latest_telemetry else None
            ),
            "latest_time": (
                latest_telemetry.reading_time.isoformat()
                if latest_telemetry and latest_telemetry.reading_time else None
            ),
            "average_value": round(float(telemetry_average), 2),
            "max_value": round(float(telemetry_max), 2),
            "min_value": round(float(telemetry_min), 2),
            "sensor_count": telemetry_sensor_count
        }

        anomaly_count = 0
        sensors = db.query(Sensor).all()

        for sensor in sensors:
            latest_sensor_telemetry = (
                db.query(Telemetry)
                .filter(Telemetry.sensor_id == sensor.id)
                .order_by(Telemetry.reading_time.desc())
                .first()
            )

            if latest_sensor_telemetry and sensor.min_threshold is not None:
                if (
                    latest_sensor_telemetry.reading_value < sensor.min_threshold
                    or latest_sensor_telemetry.reading_value > sensor.max_threshold
                ):
                    anomaly_count += 1

        if anomaly_count > 2:
            factory_status = "Critical"
        elif anomaly_count > 0:
            factory_status = "Warning"
        else:
            factory_status = "Normal"

        if scheduled_maintenance > 0 and factory_status == "Normal":
            factory_status = "Warning"

        snapshot_data = CreateSnapshot(
            timestamp=datetime.now(timezone.utc),
            total_zones=total_zones,
            total_sensors=total_sensors,
            total_workers=total_workers,
            active_workers=active_workers,
            active_permits=active_permits,
            scheduled_maintenance=scheduled_maintenance,
            latest_weather=SnapshotBuilderService._serialize_weather(latest_weather),
            telemetry_summary=telemetry_summary,
            factory_status=factory_status,
            notes="Auto-generated factory snapshot."
        )

        return SnapshotRepository.create(db, snapshot_data)

    @staticmethod
    def create_snapshot(db: Session):
        return SnapshotBuilderService.build_snapshot(db)
