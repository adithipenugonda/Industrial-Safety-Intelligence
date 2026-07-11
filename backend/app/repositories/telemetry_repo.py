from sqlalchemy.orm import Session

from app.models.telemetry import Telemetry
from app.schemas.telemetry_schema import (
    TelemetryCreate,
    TelemetryUpdate
)


class TelemetryRepository:

    @staticmethod
    def create(db: Session, telemetry: TelemetryCreate):

        db_obj = Telemetry(
            **telemetry.model_dump()
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj

    @staticmethod
    def get_latest_by_sensor(
        db: Session,
        sensor_id: int
    ):
        return (
            db.query(Telemetry)
            .filter(Telemetry.sensor_id == sensor_id)
            .order_by(Telemetry.reading_time.desc())
            .first()
        )

    @staticmethod
    def get_history(
        db: Session,
        sensor_id: int
    ):
        return (
            db.query(Telemetry)
            .filter(Telemetry.sensor_id == sensor_id)
            .order_by(Telemetry.reading_time.desc())
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        telemetry_id: int,
        telemetry: TelemetryUpdate
    ):

        db_obj = (
            db.query(Telemetry)
            .filter(Telemetry.id == telemetry_id)
            .first()
        )

        if not db_obj:
            return None

        update_data = telemetry.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_obj, key, value)

        db.commit()
        db.refresh(db_obj)

        return db_obj

    @staticmethod
    def delete(
        db: Session,
        telemetry_id: int
    ):

        db_obj = (
            db.query(Telemetry)
            .filter(Telemetry.id == telemetry_id)
            .first()
        )

        if not db_obj:
            return None

        db.delete(db_obj)
        db.commit()

        return db_obj