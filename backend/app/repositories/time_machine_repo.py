from sqlalchemy.orm import Session

from app.models.snapshot import Snapshot
from app.models.risk import RiskEngine
from app.models.alert import Alert


class TimeMachineRepository:

    @staticmethod
    def get_timeline(db: Session):
        return (
            db.query(RiskEngine)
            .order_by(RiskEngine.created_at.asc())
            .all()
        )

    @staticmethod
    def get_snapshot(db: Session, snapshot_id: int):
        return (
            db.query(Snapshot)
            .filter(Snapshot.id == snapshot_id)
            .first()
        )

    @staticmethod
    def get_risk(db: Session, snapshot_id: int):
        return (
            db.query(RiskEngine)
            .filter(RiskEngine.snapshot_id == snapshot_id)
            .order_by(RiskEngine.created_at.desc())
            .first()
        )

    @staticmethod
    def get_alerts(db: Session, risk_id: int):
        return (
            db.query(Alert)
            .filter(Alert.risk_id == risk_id)
            .all()
        )