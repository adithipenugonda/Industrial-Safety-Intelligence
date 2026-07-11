from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.worker_schema import (
    WorkerCreate,
    WorkerUpdate,
    WorkerResponse
)
from app.services.worker_service import WorkerService

router = APIRouter(
    prefix="/workers",
    tags=["Workers"]
)


@router.get("/", response_model=list[WorkerResponse])
def get_all_workers(db: Session = Depends(get_db)):
    return WorkerService.get_all_workers(db)


@router.get("/{worker_id}", response_model=WorkerResponse)
def get_worker(worker_id: int, db: Session = Depends(get_db)):
    worker = WorkerService.get_worker_by_id(db, worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    return worker


@router.post("/", response_model=WorkerResponse, status_code=201)
def create_worker(worker: WorkerCreate, db: Session = Depends(get_db)):
    try:
        return WorkerService.create_worker(db, worker)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{worker_id}", response_model=WorkerResponse)
def update_worker(worker_id: int, worker: WorkerUpdate, db: Session = Depends(get_db)):
    updated = WorkerService.update_worker(db, worker_id, worker)

    if not updated:
        raise HTTPException(status_code=404, detail="Worker not found")

    return updated


@router.delete("/{worker_id}")
def delete_worker(worker_id: int, db: Session = Depends(get_db)):
    deleted = WorkerService.delete_worker(db, worker_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Worker not found")

    return {"message": "Worker deleted successfully"}