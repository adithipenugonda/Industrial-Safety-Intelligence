from sqlalchemy.orm import Session

from app.models.sensor import Sensor
from app.schemas.sensor_schema import SensorCreate, SensorUpdate


class SensorRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Sensor).all()

    @staticmethod
    def get_by_id(db: Session, sensor_id: int):
        return db.query(Sensor).filter(Sensor.id == sensor_id).first()

    @staticmethod
    def get_by_name(db: Session, sensor_name: str):
        return db.query(Sensor).filter(
            Sensor.sensor_name == sensor_name
        ).first()

    @staticmethod
    def create(db: Session, sensor: SensorCreate):
        db_sensor = Sensor(
            sensor_name=sensor.sensor_name,
            sensor_type=sensor.sensor_type,
            zone_id=sensor.zone_id,
            unit=sensor.unit,
            current_value=sensor.current_value,
            min_threshold=sensor.min_threshold,
            max_threshold=sensor.max_threshold,
            status=sensor.status
        )

        db.add(db_sensor)
        db.commit()
        db.refresh(db_sensor)

        return db_sensor

    @staticmethod
    def update(db: Session, sensor_id: int, sensor: SensorUpdate):
        db_sensor = SensorRepository.get_by_id(db, sensor_id)

        if not db_sensor:
            return None

        update_data = sensor.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_sensor, key, value)

        db.commit()
        db.refresh(db_sensor)

        return db_sensor

    @staticmethod
    def delete(db: Session, sensor_id: int):
        db_sensor = SensorRepository.get_by_id(db, sensor_id)

        if not db_sensor:
            return None

        db.delete(db_sensor)
        db.commit()

        return db_sensor