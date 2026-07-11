from sqlalchemy.orm import Session

from app.models.maintenance import Maintenance
from app.schemas.maintenance_schema import MaintenanceCreate, MaintenanceUpdate


class MaintenanceRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Maintenance).all()

    @staticmethod
    def get_by_id(db: Session, maintenance_id: int):
        return db.query(Maintenance).filter(
            Maintenance.id == maintenance_id
        ).first()

    @staticmethod
    def create(db: Session, maintenance: MaintenanceCreate):
        db_maintenance = Maintenance(**maintenance.model_dump())

        db.add(db_maintenance)
        db.commit()
        db.refresh(db_maintenance)

        return db_maintenance

    @staticmethod
    def update(db: Session, maintenance_id: int, maintenance: MaintenanceUpdate):
        db_maintenance = MaintenanceRepository.get_by_id(db, maintenance_id)

        if not db_maintenance:
            return None

        update_data = maintenance.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_maintenance, key, value)

        db.commit()
        db.refresh(db_maintenance)

        return db_maintenance

    @staticmethod
    def delete(db: Session, maintenance_id: int):
        db_maintenance = MaintenanceRepository.get_by_id(db, maintenance_id)

        if not db_maintenance:
            return None

        db.delete(db_maintenance)
        db.commit()

        return db_maintenance