#!/usr/bin/env python3
from database import engine, Base
from models.models import User, Resume

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

if __name__ == "__main__":
    init_db()
