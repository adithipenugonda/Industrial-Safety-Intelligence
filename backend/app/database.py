from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, text

from app.config import settings

# --------------------------------------------------
# Create Database Engine
# --------------------------------------------------

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True
)

# --------------------------------------------------
# Create Session Factory
# --------------------------------------------------

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# --------------------------------------------------
# Base Class for all Models
# --------------------------------------------------

Base = declarative_base()

# --------------------------------------------------
# Dependency to get DB Session
# --------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()