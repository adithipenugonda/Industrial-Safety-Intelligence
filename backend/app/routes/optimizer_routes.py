from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.optimizer_service import OptimizerService
from app.schemas.optimizer_schema import OptimizerResponse

optimizer_router = APIRouter(
    prefix="/optimizer",
    tags=["Smart Factory Optimizer"]
)


@optimizer_router.get(
    "/recommend",
    response_model=OptimizerResponse
)
def get_recommendations(db: Session = Depends(get_db)):
    return OptimizerService.optimize_factory(db)