from sqlalchemy.orm import Session

from app.models.snapshot import Snapshot
from app.schemas.snapshot_schema import CreateSnapshot, UpdateSnapshot


class SnapshotRepository:

    @staticmethod
    def create(db: Session, snapshot_data: CreateSnapshot):
        payload = snapshot_data.model_dump(exclude_unset=True)

        if "timestamp" in payload and payload["timestamp"] is None:
            payload.pop("timestamp")

        db_snapshot = Snapshot(**payload)

        db.add(db_snapshot)
        db.commit()
        db.refresh(db_snapshot)

        return db_snapshot

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Snapshot)
            .order_by(Snapshot.timestamp.desc())
            .all()
        )

    @staticmethod
    def get_by_id(db: Session, snapshot_id: int):
        return (
            db.query(Snapshot)
            .filter(Snapshot.id == snapshot_id)
            .first()
        )

    @staticmethod
    def get_latest(db: Session):
        return (
            db.query(Snapshot)
            .order_by(Snapshot.timestamp.desc())
            .first()
        )

    @staticmethod
    def update(db: Session, snapshot_id: int, snapshot_data: UpdateSnapshot):
        db_snapshot = SnapshotRepository.get_by_id(db, snapshot_id)

        if not db_snapshot:
            return None

        update_data = snapshot_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_snapshot, key, value)

        db.commit()
        db.refresh(db_snapshot)

        return db_snapshot

    @staticmethod
    def delete(db: Session, snapshot_id: int):
        db_snapshot = SnapshotRepository.get_by_id(db, snapshot_id)

        if not db_snapshot:
            return None

        db.delete(db_snapshot)
        db.commit()

        return db_snapshot
