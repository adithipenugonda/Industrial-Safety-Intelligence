from sqlalchemy.orm import Session

from app.repositories.zone_repo import ZoneRepository
from app.schemas.zone_schema import ZoneCreate, ZoneUpdate


class ZoneService:

    @staticmethod
    def get_all_zones(db: Session):
        return ZoneRepository.get_all(db)

    @staticmethod
    def get_zone_by_id(db: Session, zone_id: int):
        return ZoneRepository.get_by_id(db, zone_id)

    @staticmethod
    def create_zone(db: Session, zone: ZoneCreate):

        existing_zone = ZoneRepository.get_by_name(db, zone.zone_name)

        if existing_zone:
            raise ValueError("Zone with this name already exists.")

        return ZoneRepository.create(db, zone)

    @staticmethod
    def update_zone(db: Session, zone_id: int, zone: ZoneUpdate):
        return ZoneRepository.update(db, zone_id, zone)

    @staticmethod
    def delete_zone(db: Session, zone_id: int):
        return ZoneRepository.delete(db, zone_id)