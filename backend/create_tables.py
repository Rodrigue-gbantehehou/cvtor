#!/usr/bin/env python3
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from database.database import engine, Base
from models.models import User, Resume, Template, Category

def create_tables():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    print("Tables: users, resumes, templates, categories")

if __name__ == "__main__":
    create_tables()
