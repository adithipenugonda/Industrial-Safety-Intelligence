from sqlalchemy.orm import Session

from app.models.permit import Permit
from app.schemas.permit_schema import PermitCreate, PermitUpdate


class PermitRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Permit).all()

    @staticmethod
    def get_by_id(db: Session, permit_id: int):
        return db.query(Permit).filter(Permit.id == permit_id).first()

    @staticmethod
    def create(db: Session, permit: PermitCreate):
        db_permit = Permit(**permit.model_dump())

        db.add(db_permit)
        db.commit()
        db.refresh(db_permit)

        return db_permit

    @staticmethod
    def update(db: Session, permit_id: int, permit: PermitUpdate):
        db_permit = PermitRepository.get_by_id(db, permit_id)

        if not db_permit:
            return None

        update_data = permit.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_permit, key, value)

        db.commit()
        db.refresh(db_permit)

        return db_permit

    @staticmethod
    def delete(db: Session, permit_id: int):
        db_permit = PermitRepository.get_by_id(db, permit_id)

        if not db_permit:
            return None

        db.delete(db_permit)
        db.commit()

        return db_permit