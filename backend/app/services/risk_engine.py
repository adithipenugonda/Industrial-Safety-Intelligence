from typing import Any


class RiskEngineService:
    """Prepare factory context for downstream risk evaluation."""

    @staticmethod
    def prepare_context(context: dict[str, Any]) -> dict[str, Any]:
        return {
            "timestamp": context.get("timestamp"),
            "summary": context.get("summary", {}),
            "zones": context.get("zones", []),
            "sensors": context.get("sensors", []),
            "workers": context.get("workers", []),
            "permits": context.get("permits", []),
            "maintenance": context.get("maintenance", []),
            "weather": context.get("weather"),
            "telemetry": context.get("telemetry"),
            "telemetry_summary": context.get("telemetry_summary", {})
        }
