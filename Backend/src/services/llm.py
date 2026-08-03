from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os


load_dotenv()



model=ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0
)

