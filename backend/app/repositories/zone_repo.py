from sqlalchemy.orm import Session

from app.models.zone import Zone
from app.schemas.zone_schema import ZoneCreate, ZoneUpdate


class ZoneRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Zone).all()

    @staticmethod
    def get_by_id(db: Session, zone_id: int):
        return db.query(Zone).filter(Zone.id == zone_id).first()

    @staticmethod
    def get_by_name(db: Session, zone_name: str):
        return db.query(Zone).filter(Zone.zone_name == zone_name).first()

    @staticmethod
    def create(db: Session, zone: ZoneCreate):
        db_zone = Zone(
            zone_name=zone.zone_name,
            description=zone.description,
            status=zone.status
        )

        db.add(db_zone)
        db.commit()
        db.refresh(db_zone)

        return db_zone

    @staticmethod
    def update(db: Session, zone_id: int, zone: ZoneUpdate):
        db_zone = ZoneRepository.get_by_id(db, zone_id)

        if not db_zone:
            return None

        update_data = zone.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_zone, key, value)

        db.commit()
        db.refresh(db_zone)

        return db_zone

    @staticmethod
    def delete(db: Session, zone_id: int):
        db_zone = ZoneRepository.get_by_id(db, zone_id)

        if not db_zone:
            return None

        db.delete(db_zone)
        db.commit()

        return db_zone