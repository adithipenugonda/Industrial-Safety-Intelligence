from sqlalchemy.orm import Session

from app.repositories.weather_repo import WeatherRepository
from app.schemas.weather_schema import WeatherCreate, WeatherUpdate


class WeatherService:

    @staticmethod
    def get_all_weather(db: Session):
        return WeatherRepository.get_all(db)

    @staticmethod
    def get_weather_by_id(db: Session, weather_id: int):
        return WeatherRepository.get_by_id(db, weather_id)

    @staticmethod
    def create_weather(db: Session, weather: WeatherCreate):
        return WeatherRepository.create(db, weather)

    @staticmethod
    def update_weather(
        db: Session,
        weather_id: int,
        weather: WeatherUpdate
    ):
        return WeatherRepository.update(
            db,
            weather_id,
            weather
        )

    @staticmethod
    def delete_weather(db: Session, weather_id: int):
        return WeatherRepository.delete(db, weather_id)