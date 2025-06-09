from pymongo import MongoClient
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["voiceAgent"]
collection = db["calls"]

def log_interaction(phone, query, response):
    collection.insert_one({
        "phone": phone,
        "query": query,
        "response": response,
        "timestamp": datetime.datetime.utcnow()
    })
