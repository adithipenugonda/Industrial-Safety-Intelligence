from sqlalchemy.orm import Session

from app.models.risk import RiskEngine
from app.schemas.risk_schema import (
    CreateRiskAnalysis,
    UpdateRiskAnalysis,
)


class RiskRepository:

    @staticmethod
    def create(db: Session, risk: CreateRiskAnalysis):
        db_risk = RiskEngine(**risk.model_dump())

        db.add(db_risk)
        db.commit()
        db.refresh(db_risk)

        return db_risk

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(RiskEngine)
            .order_by(RiskEngine.created_at.desc())
            .all()
        )

    @staticmethod
    def get_latest(db: Session):
        return (
            db.query(RiskEngine)
            .order_by(RiskEngine.created_at.desc())
            .first()
        )

    @staticmethod
    def get_by_id(db: Session, risk_id: int):
        return (
            db.query(RiskEngine)
            .filter(RiskEngine.id == risk_id)
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        risk_id: int,
        risk: UpdateRiskAnalysis
    ):
        db_risk = (
            db.query(RiskEngine)
            .filter(RiskEngine.id == risk_id)
            .first()
        )

        if not db_risk:
            return None

        update_data = risk.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_risk, key, value)

        db.commit()
        db.refresh(db_risk)

        return db_risk

    @staticmethod
    def delete(db: Session, risk_id: int):
        db_risk = (
            db.query(RiskEngine)
            .filter(RiskEngine.id == risk_id)
            .first()
        )

        if not db_risk:
            return False

        db.delete(db_risk)
        db.commit()

        return True