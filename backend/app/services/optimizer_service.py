from sqlalchemy.orm import Session
from app.repositories.optimizer_repo import OptimizerRepository
from app.ai.gemini import model
import json


class OptimizerService:

    @staticmethod
    def optimize_factory(db: Session):

        # Fetch latest data
        snapshot = OptimizerRepository.get_latest_snapshot(db)
        risk = OptimizerRepository.get_latest_risk(db)
        alerts = OptimizerRepository.get_open_alerts(db)

        if not snapshot or not risk:
            return {
                "message": "No factory data available."
            }

        # -----------------------------
        # Convert Sensor Analysis to Text
        # -----------------------------
        sensor_text = ""

        if risk.sensor_analysis:
            for sensor, details in risk.sensor_analysis.items():
                sensor_text += (
                    f"- {sensor}: "
                    f"Status={details.get('status')}, "
                    f"Value={details.get('value')}\n"
                )
        else:
            sensor_text = "No sensor data available."

        # -----------------------------
        # Convert Alerts to Text
        # -----------------------------
        alert_text = ""

        if alerts:
            for alert in alerts:
                alert_text += (
                    f"- {alert.alert_type} "
                    f"({alert.severity}): "
                    f"{alert.message}\n"
                )
        else:
            alert_text = "No active alerts."

        # -----------------------------
        # Build Prompt
        # -----------------------------
        prompt = f"""
You are an AI Industrial Safety Expert with over 20 years of experience.

Analyze the following factory conditions and provide intelligent recommendations.

Factory Information

Factory Status:
{snapshot.factory_status}

Active Workers:
{snapshot.active_workers}

Pending Maintenance:
{snapshot.scheduled_maintenance}

Risk Score:
{risk.risk_score}

Risk Level:
{risk.risk_level}

Sensor Analysis:
{sensor_text}

Current Alerts:
{alert_text}

Instructions:

1. Analyze the overall factory condition.
2. Identify the biggest safety concerns.
3. Explain the likely root cause.
4. Suggest practical recommendations in priority order.
5. Estimate approximately how much the overall risk can be reduced.

Return ONLY valid JSON.

Response Format:

{{
    "priority": "",
    "summary": "",
    "root_cause": "",
    "recommendations": [],
    "estimated_risk_reduction": ""
}}

Do NOT use markdown.
Do NOT use ```json.
Do NOT write anything except the JSON.
"""

        if not model:
            return {
                "error": "Gemini model is unavailable. Please install google-generativeai and configure GEMINI_API_KEY."
            }

        # -----------------------------
        # Call Gemini
        # -----------------------------
        response = model.generate_content(prompt)

        text = response.text.strip()

        # Remove markdown if Gemini returns it
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        # -----------------------------
        # Convert JSON String -> Python Dict
        # -----------------------------
        try:
            result = json.loads(text)
        except json.JSONDecodeError:
            return {
                "error": "Failed to parse Gemini response.",
                "raw_response": text
            }

        return result