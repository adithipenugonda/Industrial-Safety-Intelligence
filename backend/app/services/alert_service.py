from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.repositories.alert_repo import AlertRepository
from app.repositories.risk_repo import RiskRepository


class AlertService:

    @staticmethod
    def generate_alerts(db: Session):

        latest_risk = RiskRepository.get_latest(db)

        if not latest_risk:
            raise Exception("No risk analysis found.")

        created_alerts = []

        sensor_analysis = latest_risk.sensor_analysis

        for sensor_name, details in sensor_analysis.items():

            severity = details.get("status")

            if severity not in ["HIGH", "CRITICAL"]:
                continue

            # Alert Type
            if sensor_name.lower() == "gas":
                alert_type = "Gas Leakage"
                action = "Evacuate workers immediately and inspect gas lines."

            elif sensor_name.lower() == "temperature":
                alert_type = "Overheating"
                action = "Inspect cooling systems immediately."

            elif sensor_name.lower() == "pressure":
                alert_type = "Pressure Build-up"
                action = "Release pressure safely and inspect equipment."

            elif sensor_name.lower() == "humidity":
                alert_type = "Humidity Warning"
                action = "Inspect ventilation and humidity control."

            else:
                alert_type = f"{sensor_name} Alert"
                action = "Inspect the sensor immediately."

            alert = Alert(
                risk_id=latest_risk.id,
                sensor_name=sensor_name,
                alert_type=alert_type,
                severity=severity,
                message=f"{sensor_name} reached {severity} level.",
                recommended_action=action,
                status="OPEN"
            )

            AlertRepository.create(db, alert)

            created_alerts.append(alert)

        return created_alerts

    @staticmethod
    def get_all_alerts(db: Session):
        return AlertRepository.get_all(db)

    @staticmethod
    def get_alert(db: Session, alert_id: int):
        return AlertRepository.get_by_id(db, alert_id)

    @staticmethod
    def delete_alert(db: Session, alert_id: int):
        return AlertRepository.delete(db, alert_id)