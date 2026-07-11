from sqlalchemy.orm import Session

from app.repositories.telemetry_repo import TelemetryRepository
from app.repositories.sensor_repo import SensorRepository

from app.schemas.telemetry_schema import (
    TelemetryCreate,
    TelemetryUpdate
)


class TelemetryService:

    @staticmethod
    def create(
        db: Session,
        telemetry: TelemetryCreate
    ):

        sensor = SensorRepository.get_by_id(
            db,
            telemetry.sensor_id
        )

        if not sensor:
            raise ValueError("Sensor not found.")

        return TelemetryRepository.create(
            db,
            telemetry
        )

    @staticmethod
    def latest(
        db: Session,
        sensor_id: int
    ):
        return TelemetryRepository.get_latest_by_sensor(
            db,
            sensor_id
        )

    @staticmethod
    def history(
        db: Session,
        sensor_id: int
    ):
        return TelemetryRepository.get_history(
            db,
            sensor_id
        )

    @staticmethod
    def update(
        db: Session,
        telemetry_id: int,
        telemetry: TelemetryUpdate
    ):
        return TelemetryRepository.update(
            db,
            telemetry_id,
            telemetry
        )

    @staticmethod
    def delete(
        db: Session,
        telemetry_id: int
    ):
        return TelemetryRepository.delete(
            db,
            telemetry_id
        )