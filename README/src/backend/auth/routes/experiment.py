# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from database import get_db
# from models.experiment import Experiment
# from models.user import User
# from schemas.experiment import ExperimentCreate, ExperimentOut
# from core.security import decode_token
# from fastapi.security import OAuth2PasswordBearer
# from typing import List

# router = APIRouter(prefix="/experiments", tags=["Experiments"])
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     payload = decode_token(token)
#     if not payload:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     email = payload.get("sub")
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         raise HTTPException(status_code=401, detail="User not found")
#     return user

# @router.post("/save", response_model=ExperimentOut)
# def save_experiment(
#     exp: ExperimentCreate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     new_exp = Experiment(**exp.dict(), user_id=current_user.id)
#     db.add(new_exp)
#     db.commit()
#     db.refresh(new_exp)
#     return new_exp

# @router.get("/history", response_model=List[ExperimentOut])
# def get_history(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     return db.query(Experiment).filter(
#         Experiment.user_id == current_user.id
#     ).order_by(Experiment.created_at.desc()).all()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.experiment import Experiment
from models.user import User
from schemas.experiment import ExperimentCreate, ExperimentOut
from core.security import decode_token
from fastapi.security import OAuth2PasswordBearer
from typing import List

router = APIRouter(prefix="/experiments", tags=["Experiments"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.post("/save", response_model=ExperimentOut)
def save_experiment(
    exp: ExperimentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_exp = Experiment(**exp.dict(), user_id=current_user.id)
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp

@router.get("/history", response_model=List[ExperimentOut])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Experiment).filter(
        Experiment.user_id == current_user.id
    ).order_by(Experiment.created_at.desc()).all()

@router.delete("/delete/{experiment_id}")
def delete_experiment(
    experiment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    exp = db.query(Experiment).filter(
        Experiment.id == experiment_id,
        Experiment.user_id == current_user.id
    ).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(exp)
    db.commit()
    return {"message": "Deleted"}