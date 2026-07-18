from sqlalchemy.orm import Session

from app.models.snapshot import Snapshot
from app.models.risk import RiskEngine
from app.models.alert import Alert


class OptimizerRepository:

    @staticmethod
    def get_latest_snapshot(db: Session):
        return (
            db.query(Snapshot)
            .order_by(Snapshot.created_at.desc())
            .first()
        )

    @staticmethod
    def get_latest_risk(db: Session):
        return (
            db.query(RiskEngine)
            .order_by(RiskEngine.created_at.desc())
            .first()
        )

    @staticmethod
    def get_open_alerts(db: Session):
        return (
            db.query(Alert)
            .filter(Alert.status == "OPEN")
            .all()
    )