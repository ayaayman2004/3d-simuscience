from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

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
    created_at = Column(DateTime, server_default=func.now())