from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.permit_schema import (
    PermitCreate,
    PermitUpdate,
    PermitResponse
)
from app.services.permit_service import PermitService

router = APIRouter(
    prefix="/permits",
    tags=["Permits"]
)


@router.get("/", response_model=list[PermitResponse])
def get_all_permits(db: Session = Depends(get_db)):
    return PermitService.get_all_permits(db)


@router.get("/{permit_id}", response_model=PermitResponse)
def get_permit(permit_id: int, db: Session = Depends(get_db)):
    permit = PermitService.get_permit_by_id(db, permit_id)

    if not permit:
        raise HTTPException(status_code=404, detail="Permit not found")

    return permit


@router.post("/", response_model=PermitResponse, status_code=201)
def create_permit(permit: PermitCreate, db: Session = Depends(get_db)):
    try:
        return PermitService.create_permit(db, permit)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{permit_id}", response_model=PermitResponse)
def update_permit(
    permit_id: int,
    permit: PermitUpdate,
    db: Session = Depends(get_db)
):
    updated = PermitService.update_permit(db, permit_id, permit)

    if not updated:
        raise HTTPException(status_code=404, detail="Permit not found")

    return updated


@router.delete("/{permit_id}")
def delete_permit(permit_id: int, db: Session = Depends(get_db)):
    deleted = PermitService.delete_permit(db, permit_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Permit not found")

    return {"message": "Permit deleted successfully"}