#!/usr/bin/env python3
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from database.database import SessionLocal
from models.models import Category, Template, User
import bcrypt

def seed_database():
    db = SessionLocal()
    
    try:
        print("🌱 Seeding database...")
        
        if db.query(User).filter(User.email == "admin@cvtor.com").first():
            print("⏭️  Admin user already exists, skipping...")
        else:
            password = "admin123"
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            admin_user = User(
                email="admin@cvtor.com",
                hashed_password=hashed.decode('utf-8'),
                full_name="Admin CVtor",
                is_admin=True,
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print("✅ Admin user created (email: admin@cvtor.com, password: admin123)")
        
        categories_data = [
            {"name": "Professionnel", "slug": "professionnel", "description": "Templates professionnels pour cadres et managers"},
            {"name": "Créatif", "slug": "creatif", "description": "Templates créatifs pour designers et artistes"},
            {"name": "Minimaliste", "slug": "minimaliste", "description": "Templates épurés et modernes"},
            {"name": "Traditionnel", "slug": "traditionnel", "description": "Templates classiques et intemporels"},
        ]
        
        for cat_data in categories_data:
            existing = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
            if not existing:
                category = Category(**cat_data)
                db.add(category)
                print(f"✅ Category '{cat_data['name']}' created")
        
        db.commit()
        
        pro_category = db.query(Category).filter(Category.slug == "professionnel").first()
        creative_category = db.query(Category).filter(Category.slug == "creatif").first()
        minimal_category = db.query(Category).filter(Category.slug == "minimaliste").first()
        trad_category = db.query(Category).filter(Category.slug == "traditionnel").first()
        
        templates_data = [
            {
                "title": "Classique",
                "slug": "classique",
                "description": "Élégant et intemporel",
                "price": 0.0,
                "category_id": trad_category.id if trad_category else None,
                "is_active": True
            },
            {
                "title": "Moderne",
                "slug": "moderne",
                "description": "Créatif et dynamique",
                "price": 0.0,
                "category_id": creative_category.id if creative_category else None,
                "is_active": True
            },
            {
                "title": "Professional",
                "slug": "professional",
                "description": "Sobre et efficace",
                "price": 0.0,
                "category_id": pro_category.id if pro_category else None,
                "is_active": True
            },
            {
                "title": "Tokyo",
                "slug": "tokyo",
                "description": "Minimaliste et épuré",
                "price": 0.0,
                "category_id": minimal_category.id if minimal_category else None,
                "is_active": True
            },
        ]
        
        for tpl_data in templates_data:
            existing = db.query(Template).filter(Template.slug == tpl_data["slug"]).first()
            if not existing:
                template = Template(**tpl_data)
                db.add(template)
                print(f"✅ Template '{tpl_data['title']}' created")
        
        db.commit()
        print("\n🎉 Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
