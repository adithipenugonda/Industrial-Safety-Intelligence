from sqlalchemy.orm import Session

from app.repositories.worker_repo import WorkerRepository
from app.repositories.zone_repo import ZoneRepository
from app.schemas.worker_schema import WorkerCreate, WorkerUpdate


class WorkerService:

    @staticmethod
    def get_all_workers(db: Session):
        return WorkerRepository.get_all(db)

    @staticmethod
    def get_worker_by_id(db: Session, worker_id: int):
        return WorkerRepository.get_by_id(db, worker_id)

    @staticmethod
    def create_worker(db: Session, worker: WorkerCreate):

        existing = WorkerRepository.get_by_employee_id(
            db,
            worker.employee_id
        )

        if existing:
            raise ValueError("Employee ID already exists.")

        zone = ZoneRepository.get_by_id(db, worker.zone_id)

        if not zone:
            raise ValueError("Zone not found.")

        return WorkerRepository.create(db, worker)

    @staticmethod
    def update_worker(
        db: Session,
        worker_id: int,
        worker: WorkerUpdate
    ):
        return WorkerRepository.update(db, worker_id, worker)

    @staticmethod
    def delete_worker(db: Session, worker_id: int):
        return WorkerRepository.delete(db, worker_id)