# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from routes import experiments
# app.include_router(experiments.router)
# from models.experiment import Experiment
# Base.metadata.create_all(bind=engine)
# # استيراد الموديلات والسكيمات الخاصة بك هنا

# app = FastAPI()

# # مهم جداً لربط React مع FastAPI
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000", "http://localhost:5173"], # روابط الـ React
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/register")
# def register_user(user: UserCreate, db: Session = Depends(get_db)):
#     # منطق التحقق من وجود الإيميل وتشفير الباسورد
#     # db_user = models.User(...)
#     # db.add(db_user)
#     # db.commit()
#     return {"message": "User created"}

# @app.post("/login")
# def login(user: UserLogin, db: Session = Depends(get_db)):
#     # منطق التحقق من الباسورد وتوليد الـ JWT Token
#     return {"access_token": "...", "token_type": "bearer"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import auth, experiment
from models.experiment import Experiment

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(experiment.router)