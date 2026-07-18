from sqlalchemy.orm import Session

from app.models.alert import Alert


class AlertRepository:

    @staticmethod
    def create(db: Session, alert: Alert):
        db.add(alert)
        db.commit()
        db.refresh(alert)
        return alert

    @staticmethod
    def get_all(db: Session):
        return db.query(Alert).order_by(Alert.created_at.desc()).all()

    @staticmethod
    def get_by_id(db: Session, alert_id: int):
        return db.query(Alert).filter(Alert.id == alert_id).first()

    @staticmethod
    def delete(db: Session, alert_id: int):
        alert = db.query(Alert).filter(Alert.id == alert_id).first()

        if alert:
            db.delete(alert)
            db.commit()

        return alert