#library imports
from fastapi import FastAPI


#funciton and services imports
from src.core.database import Base,engine


#route imports


Base.metadata.create_all(bind=engine)


app=FastAPI(
    title="MedAI",
    summary="MedAI is a medical application which helps users to analyze their health and identify issues and solutions through the help of AI.")

@app.get("/")
def home():
    return {
        "response":True,
        "message":"Server is runnig"
    }