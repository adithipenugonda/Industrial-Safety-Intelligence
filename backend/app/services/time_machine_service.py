from sqlalchemy.orm import Session

from app.repositories.time_machine_repo import TimeMachineRepository


class TimeMachineService:

    @staticmethod
    def get_timeline(db: Session):

        history = TimeMachineRepository.get_timeline(db)

        timeline = []

        for item in history:

            timeline.append(
                {
                    "snapshot_id": item.snapshot_id,
                    "created_at": item.created_at,
                    "risk_score": item.risk_score,
                    "risk_level": item.risk_level
                }
            )

        return timeline

    @staticmethod
    def replay_snapshot(db: Session, snapshot_id: int):

        snapshot = TimeMachineRepository.get_snapshot(db, snapshot_id)

        if not snapshot:
            raise Exception("Snapshot not found.")

        risk = TimeMachineRepository.get_risk(db, snapshot_id)

        alerts = []

        if risk:
            alerts = TimeMachineRepository.get_alerts(db, risk.id)

        return {
            "snapshot": snapshot,
            "risk": risk,
            "alerts": alerts
        }