
from sqlalchemy.orm import Session

from app.repositories.risk_repo import RiskRepository
from app.repositories.snapshot_repo import SnapshotRepository
from app.schemas.risk_schema import CreateRiskAnalysis


class RiskEngineService:

    @staticmethod
    def _calculate_sensor_risk(sensor: dict):
        value = sensor.get("value", 0) or 0
        min_t = sensor.get("min_threshold", 0) or 0
        max_t = sensor.get("max_threshold", 0) or 0

        if max_t <= min_t:
            return {
                "value": value,
                "risk_percent": 0.0,
                "status": "UNKNOWN"
            }

        risk_percent = ((value - min_t) / (max_t - min_t)) * 100
        risk_percent = max(0.0, min(100.0, risk_percent))

        if risk_percent >= 90:
            status = "CRITICAL"
        elif risk_percent >= 70:
            status = "HIGH"
        elif risk_percent >= 40:
            status = "MEDIUM"
        else:
            status = "LOW"

        return {
            "value": value,
            "min_threshold": min_t,
            "max_threshold": max_t,
            "risk_percent": round(risk_percent, 2),
            "status": status
        }

    @staticmethod
    def _recommendation(level: str):
        recommendations = {
            "LOW": "Factory conditions are normal.",
            "MEDIUM": "Monitor sensors and schedule preventive inspection.",
            "HIGH": "Immediate inspection is recommended.",
            "CRITICAL": "Emergency response required. Stop operations if necessary."
        }
        return recommendations[level]

    @staticmethod
    def analyze(db: Session):
        snapshot = SnapshotRepository.get_latest(db)

        if not snapshot:
            raise ValueError("No snapshot found. Create a snapshot first.")

        telemetry_summary = snapshot.telemetry_summary or {}
        sensor_readings = telemetry_summary.get("sensor_readings", {})

        if not sensor_readings:
            raise ValueError("No sensor readings available in latest snapshot.")

        sensor_analysis = {}
        scores = []

        for sensor_name, sensor in sensor_readings.items():
            analysis = RiskEngineService._calculate_sensor_risk(sensor)
            sensor_analysis[sensor_name] = analysis
            scores.append(analysis["risk_percent"])

        overall_score = round(sum(scores) / len(scores), 2) if scores else 0

        if overall_score >= 90:
            level = "CRITICAL"
        elif overall_score >= 70:
            level = "HIGH"
        elif overall_score >= 40:
            level = "MEDIUM"
        else:
            level = "LOW"

        risk = CreateRiskAnalysis(
            snapshot_id=snapshot.id,
            risk_score=overall_score,
            risk_level=level,
            sensor_analysis=sensor_analysis,
            recommendation=RiskEngineService._recommendation(level)
        )

        return RiskRepository.create(db, risk)

    @staticmethod
    def get_all(db: Session):
        return RiskRepository.get_all(db)

    @staticmethod
    def get_latest(db: Session):
        return RiskRepository.get_latest(db)

    @staticmethod
    def get_by_id(db: Session, risk_id: int):
        return RiskRepository.get_by_id(db, risk_id)

    @staticmethod
    def delete(db: Session, risk_id: int):
        return RiskRepository.delete(db, risk_id)
