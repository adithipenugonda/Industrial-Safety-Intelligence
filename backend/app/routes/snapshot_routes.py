from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.snapshot_repo import SnapshotRepository
from app.schemas.snapshot_schema import (
    CreateSnapshot,
    SnapshotList,
    SnapshotResponse,
    UpdateSnapshot
)
from app.services.snapshot_builder import SnapshotBuilderService

router = APIRouter(
    prefix="/snapshot",
    tags=["Snapshots"]
)


@router.post("/create", response_model=SnapshotResponse, status_code=201)
def create_snapshot(db: Session = Depends(get_db)):
    return SnapshotBuilderService.create_snapshot(db)


@router.get("/latest", response_model=SnapshotResponse)
def get_latest_snapshot(db: Session = Depends(get_db)):
    snapshot = SnapshotRepository.get_latest(db)

    if not snapshot:
        raise HTTPException(status_code=404, detail="No snapshot found")

    return snapshot


@router.get("/", response_model=SnapshotList)
def get_all_snapshots(db: Session = Depends(get_db)):
    snapshots = SnapshotRepository.get_all(db)

    return SnapshotList(items=snapshots, total=len(snapshots))


@router.get("/{snapshot_id}", response_model=SnapshotResponse)
def get_snapshot(snapshot_id: int, db: Session = Depends(get_db)):
    snapshot = SnapshotRepository.get_by_id(db, snapshot_id)

    if not snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")

    return snapshot


@router.put("/{snapshot_id}", response_model=SnapshotResponse)
def update_snapshot(
    snapshot_id: int,
    snapshot: UpdateSnapshot,
    db: Session = Depends(get_db)
):
    updated_snapshot = SnapshotRepository.update(db, snapshot_id, snapshot)

    if not updated_snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")

    return updated_snapshot


@router.delete("/{snapshot_id}")
def delete_snapshot(snapshot_id: int, db: Session = Depends(get_db)):
    deleted_snapshot = SnapshotRepository.delete(db, snapshot_id)

    if not deleted_snapshot:
        raise HTTPException(status_code=404, detail="Snapshot not found")

    return {"message": "Snapshot deleted successfully"}
