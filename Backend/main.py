#library imports
from fastapi import FastAPI


#funciton and services imports
from src.core.database import Base,engine


#route imports
from src.routers.auth import router as auth_router

Base.metadata.create_all(bind=engine)


app=FastAPI(
    title="MedAI",
    summary="MedAI is a medical application which helps users to analyze their health and identify issues and solutions through the help of AI.")

router_list=[auth_router]

for i in range(len(router_list)):  
    app.include_router(router_list[i])


@app.get("/")
def home():
    return {
        "response":True,
        "message":"Server is runnig"
    }