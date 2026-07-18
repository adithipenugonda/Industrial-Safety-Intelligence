from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.risk_engine import RiskEngineService

router = APIRouter(
    prefix="/risk",
    tags=["Risk Engine"]
)


@router.post("/analyze")
def analyze_risk(db: Session = Depends(get_db)):
    try:
        return RiskEngineService.analyze(db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/")
def get_all_risk(db: Session = Depends(get_db)):
    return RiskEngineService.get_all(db)


@router.get("/latest")
def get_latest_risk(db: Session = Depends(get_db)):
    risk = RiskEngineService.get_latest(db)

    if not risk:
        raise HTTPException(
            status_code=404,
            detail="No risk analysis found."
        )

    return risk


@router.get("/{risk_id}")
def get_risk_by_id(
    risk_id: int,
    db: Session = Depends(get_db)
):
    risk = RiskEngineService.get_by_id(db, risk_id)

    if not risk:
        raise HTTPException(
            status_code=404,
            detail="Risk analysis not found."
        )

    return risk


@router.delete("/{risk_id}")
def delete_risk(
    risk_id: int,
    db: Session = Depends(get_db)
):
    deleted = RiskEngineService.delete(db, risk_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Risk analysis not found."
        )

    return {
        "message": "Risk analysis deleted successfully."
    }