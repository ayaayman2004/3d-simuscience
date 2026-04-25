from pydantic import BaseModel
from datetime import datetime

class ExperimentCreate(BaseModel):
    reactants: str
    products: str
    observation: str
    reaction_type: str
    safety: str
    equation: str

class ExperimentOut(ExperimentCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True