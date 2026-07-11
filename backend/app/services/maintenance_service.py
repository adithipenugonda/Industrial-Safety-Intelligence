from sqlalchemy.orm import Session

from app.repositories.maintenance_repo import MaintenanceRepository
from app.repositories.zone_repo import ZoneRepository
from app.schemas.maintenance_schema import MaintenanceCreate, MaintenanceUpdate


class MaintenanceService:

    @staticmethod
    def get_all_maintenance(db: Session):
        return MaintenanceRepository.get_all(db)

    @staticmethod
    def get_maintenance_by_id(db: Session, maintenance_id: int):
        return MaintenanceRepository.get_by_id(db, maintenance_id)

    @staticmethod
    def create_maintenance(db: Session, maintenance: MaintenanceCreate):

        zone = ZoneRepository.get_by_id(db, maintenance.zone_id)

        if not zone:
            raise ValueError("Zone not found.")

        return MaintenanceRepository.create(db, maintenance)

    @staticmethod
    def update_maintenance(
        db: Session,
        maintenance_id: int,
        maintenance: MaintenanceUpdate
    ):
        return MaintenanceRepository.update(
            db,
            maintenance_id,
            maintenance
        )

    @staticmethod
    def delete_maintenance(db: Session, maintenance_id: int):
        return MaintenanceRepository.delete(db, maintenance_id)