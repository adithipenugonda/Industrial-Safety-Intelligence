from sqlalchemy.orm import Session

from app.repositories.sensor_repo import SensorRepository
from app.repositories.zone_repo import ZoneRepository
from app.schemas.sensor_schema import SensorCreate, SensorUpdate


class SensorService:

    @staticmethod
    def get_all_sensors(db: Session):
        return SensorRepository.get_all(db)

    @staticmethod
    def get_sensor_by_id(db: Session, sensor_id: int):
        return SensorRepository.get_by_id(db, sensor_id)

    @staticmethod
    def create_sensor(db: Session, sensor: SensorCreate):

        existing_sensor = SensorRepository.get_by_name(
            db,
            sensor.sensor_name
        )

        if existing_sensor:
            raise ValueError("Sensor with this name already exists.")

        zone = ZoneRepository.get_by_id(db, sensor.zone_id)

        if not zone:
            raise ValueError("Zone not found.")

        return SensorRepository.create(db, sensor)

    @staticmethod
    def update_sensor(
        db: Session,
        sensor_id: int,
        sensor: SensorUpdate
    ):
        return SensorRepository.update(db, sensor_id, sensor)

    @staticmethod
    def delete_sensor(db: Session, sensor_id: int):
        return SensorRepository.delete(db, sensor_id)