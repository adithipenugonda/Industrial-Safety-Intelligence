from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.telemetry_schema import (
    TelemetryCreate,
    TelemetryUpdate,
    TelemetryResponse
)

from app.services.telemetry_service import TelemetryService

router = APIRouter(
    prefix="/telemetry",
    tags=["Telemetry"]
)


@router.post(
    "/",
    response_model=TelemetryResponse,
    status_code=201
)
def create(
    telemetry: TelemetryCreate,
    db: Session = Depends(get_db)
):
    try:
        return TelemetryService.create(
            db,
            telemetry
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/latest/{sensor_id}",
    response_model=TelemetryResponse
)
def latest(
    sensor_id: int,
    db: Session = Depends(get_db)
):

    telemetry = TelemetryService.latest(
        db,
        sensor_id
    )

    if not telemetry:
        raise HTTPException(
            status_code=404,
            detail="No telemetry found"
        )

    return telemetry


@router.get(
    "/history/{sensor_id}",
    response_model=list[TelemetryResponse]
)
def history(
    sensor_id: int,
    db: Session = Depends(get_db)
):
    return TelemetryService.history(
        db,
        sensor_id
    )


@router.delete("/{telemetry_id}")
def delete(
    telemetry_id: int,
    db: Session = Depends(get_db)
):

    deleted = TelemetryService.delete(
        db,
        telemetry_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Telemetry not found"
        )

    return {
        "message": "Telemetry deleted successfully"
    }