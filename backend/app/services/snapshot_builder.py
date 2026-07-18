from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.repositories.snapshot_repo import SnapshotRepository
from app.schemas.snapshot_schema import CreateSnapshot
from app.services.context_engine import build_factory_context


class SnapshotBuilderService:

    @staticmethod
    def build_snapshot(db: Session):
        context = build_factory_context(db)

        total_zones = len(context.get("zones", []))
        total_sensors = len(context.get("sensors", []))
        total_workers = len(context.get("workers", []))
        active_workers = sum(
            1 for worker in context.get("workers", []) if worker.get("status") == "Active"
        )
        active_permits = len(context.get("permits", []))
        scheduled_maintenance = sum(
            1 for item in context.get("maintenance", []) if item.get("status") in {"Scheduled", "Pending", "Overdue"}
        )
        latest_weather = context.get("weather")
        telemetry_summary = context.get("telemetry_summary", {})
        factory_status = context.get("summary", {}).get("factory_status", "NORMAL")

        snapshot_data = CreateSnapshot(
            timestamp=datetime.now(timezone.utc),
            total_zones=total_zones,
            total_sensors=total_sensors,
            total_workers=total_workers,
            active_workers=active_workers,
            active_permits=active_permits,
            scheduled_maintenance=scheduled_maintenance,
            latest_weather=latest_weather,
            telemetry_summary=telemetry_summary,
            factory_status=factory_status,
            notes="Auto-generated factory snapshot from factory context."
        )

        return SnapshotRepository.create(db, snapshot_data)

    @staticmethod
    def create_snapshot(db: Session):
        return SnapshotBuilderService.build_snapshot(db)
