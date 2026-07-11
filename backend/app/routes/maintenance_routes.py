from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.maintenance_schema import (
    MaintenanceCreate,
    MaintenanceUpdate,
    MaintenanceResponse
)
from app.services.maintenance_service import MaintenanceService

router = APIRouter(
    prefix="/maintenance",
    tags=["Maintenance"]
)


@router.get("/", response_model=list[MaintenanceResponse])
def get_all_maintenance(db: Session = Depends(get_db)):
    return MaintenanceService.get_all_maintenance(db)


@router.get("/{maintenance_id}", response_model=MaintenanceResponse)
def get_maintenance(maintenance_id: int, db: Session = Depends(get_db)):
    maintenance = MaintenanceService.get_maintenance_by_id(db, maintenance_id)

    if not maintenance:
        raise HTTPException(status_code=404, detail="Maintenance not found")

    return maintenance


@router.post("/", response_model=MaintenanceResponse, status_code=201)
def create_maintenance(
    maintenance: MaintenanceCreate,
    db: Session = Depends(get_db)
):
    try:
        return MaintenanceService.create_maintenance(db, maintenance)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{maintenance_id}", response_model=MaintenanceResponse)
def update_maintenance(
    maintenance_id: int,
    maintenance: MaintenanceUpdate,
    db: Session = Depends(get_db)
):
    updated = MaintenanceService.update_maintenance(
        db,
        maintenance_id,
        maintenance
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Maintenance not found")

    return updated


@router.delete("/{maintenance_id}")
def delete_maintenance(
    maintenance_id: int,
    db: Session = Depends(get_db)
):
    deleted = MaintenanceService.delete_maintenance(db, maintenance_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Maintenance not found")

    return {"message": "Maintenance deleted successfully"}