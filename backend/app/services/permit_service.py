from sqlalchemy.orm import Session

from app.repositories.permit_repo import PermitRepository
from app.repositories.zone_repo import ZoneRepository
from app.schemas.permit_schema import PermitCreate, PermitUpdate


class PermitService:

    @staticmethod
    def get_all_permits(db: Session):
        return PermitRepository.get_all(db)

    @staticmethod
    def get_permit_by_id(db: Session, permit_id: int):
        return PermitRepository.get_by_id(db, permit_id)

    @staticmethod
    def create_permit(db: Session, permit: PermitCreate):

        zone = ZoneRepository.get_by_id(db, permit.zone_id)

        if not zone:
            raise ValueError("Zone not found.")

        return PermitRepository.create(db, permit)

    @staticmethod
    def update_permit(db: Session, permit_id: int, permit: PermitUpdate):
        return PermitRepository.update(db, permit_id, permit)

    @staticmethod
    def delete_permit(db: Session, permit_id: int):
        return PermitRepository.delete(db, permit_id)