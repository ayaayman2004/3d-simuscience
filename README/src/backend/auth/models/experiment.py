from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone, timedelta
from database import Base

egypt_tz = timezone(timedelta(hours=3))

class Experiment(Base):
    __tablename__ = "experiments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    reactants = Column(String)
    products = Column(String)
    observation = Column(String)
    reaction_type = Column(String)
    safety = Column(String)
    equation = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(egypt_tz).replace(tzinfo=None))