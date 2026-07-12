import random
import threading
import time

from app.database import SessionLocal
from app.models.sensor import Sensor
from app.models.telemetry import Telemetry


class SimulationService:

    running = False

    @classmethod
    def start(cls):

        if cls.running:
            return

        cls.running = True

        thread = threading.Thread(
            target=cls.generate_data,
            daemon=True
        )

        thread.start()

        print("✅ Live Telemetry Simulator Started")

    @classmethod
    def stop(cls):
        cls.running = False
        print("🛑 Live Telemetry Simulator Stopped")

    @classmethod
    def generate_data(cls):

        while cls.running:

            db = SessionLocal()

            try:

                sensors = db.query(Sensor).all()

                for sensor in sensors:

                    value = cls.generate_sensor_value(sensor)

                    telemetry = Telemetry(
                        sensor_id=sensor.id,
                        reading_value=value
                    )

                    db.add(telemetry)

                db.commit()

            except Exception as e:

                print("Simulation Error:", e)
                db.rollback()

            finally:

                db.close()

            time.sleep(1)

    @staticmethod
    def generate_sensor_value(sensor):

        sensor_type = sensor.sensor_type.lower()

        if sensor_type == "gas":
            return round(random.uniform(180, 260), 2)

        elif sensor_type == "temperature":
            return round(random.uniform(30, 60), 2)

        elif sensor_type == "pressure":
            return round(random.uniform(2, 8), 2)

        elif sensor_type == "humidity":
            return round(random.uniform(40, 90), 2)

        elif sensor_type == "smoke":
            return round(random.uniform(0, 80), 2)

        elif sensor_type == "vibration":
            return round(random.uniform(0, 20), 2)

        return round(
            random.uniform(
                sensor.min_threshold,
                sensor.max_threshold
            ),
            2
        )