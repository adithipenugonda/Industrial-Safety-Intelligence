from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.time_machine_schema import TimelineResponse, ReplayResponse
from app.services.time_machine_service import TimeMachineService
from fastapi import HTTPException

router = APIRouter(
    prefix="/time-machine",
    tags=["Industrial Time Machine"]
)


@router.get(
    "/timeline",
    response_model=list[TimelineResponse]
)
def get_timeline(db: Session = Depends(get_db)):
    return TimeMachineService.get_timeline(db)

@router.get(
    "/replay/{snapshot_id}",
    response_model=ReplayResponse
)
def replay_snapshot(
    snapshot_id: int,
    db: Session = Depends(get_db)
):
    try:
        return TimeMachineService.replay_snapshot(db, snapshot_id)
    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )