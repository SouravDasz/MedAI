#library imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
 
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


origins = [
    "http://localhost:3000",      # React/Next.js default local port
    "http://127.0.0.1:5500",     # Live Server extension port
    "https://yourfrontend.com",  # Your production domain
    "http://localhost:5173"
]

# 2. Add the CORSMiddleware to your FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Allows requests from these origins
    allow_credentials=True,          # Allows cookies and credentials (like HttpOnly cookies)
    allow_methods=["*"],             # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],             # Allows all request headers
)

@app.get("/")
def home():
    return {
        "response":True,
        "message":"Server is runnig"
    }
# # from alembic import op
# import sqlalchemy as sa
# 
# # The Alembic migration command
# op.add_column('User', sa.Column('phone', sa.String()))