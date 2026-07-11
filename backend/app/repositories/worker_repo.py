from sqlalchemy.orm import Session

from app.models.worker import Worker
from app.schemas.worker_schema import WorkerCreate, WorkerUpdate


class WorkerRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Worker).all()

    @staticmethod
    def get_by_id(db: Session, worker_id: int):
        return db.query(Worker).filter(Worker.id == worker_id).first()

    @staticmethod
    def get_by_employee_id(db: Session, employee_id: str):
        return db.query(Worker).filter(
            Worker.employee_id == employee_id
        ).first()

    @staticmethod
    def create(db: Session, worker: WorkerCreate):
        db_worker = Worker(**worker.model_dump())

        db.add(db_worker)
        db.commit()
        db.refresh(db_worker)

        return db_worker

    @staticmethod
    def update(db: Session, worker_id: int, worker: WorkerUpdate):
        db_worker = WorkerRepository.get_by_id(db, worker_id)

        if not db_worker:
            return None

        update_data = worker.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_worker, key, value)

        db.commit()
        db.refresh(db_worker)

        return db_worker

    @staticmethod
    def delete(db: Session, worker_id: int):
        db_worker = WorkerRepository.get_by_id(db, worker_id)

        if not db_worker:
            return None

        db.delete(db_worker)
        db.commit()

        return db_worker