#!/usr/bin/env python3
import os
from typing import List, Optional
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.database import get_db
from models.models import Template, Category, User
from auth.auth import get_current_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

UPLOAD_DIR = Path(__file__).parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None

class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str]
    
    class Config:
        from_attributes = True

class TemplateCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    price: float = 0.0
    category_id: Optional[int] = None
    template_data: Optional[str] = None
    is_active: bool = True

class TemplateUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None
    template_data: Optional[str] = None
    is_active: Optional[bool] = None

class TemplateResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: Optional[str]
    price: float
    thumbnail_url: Optional[str]
    template_data: Optional[str]
    category_id: Optional[int]
    is_active: bool
    category: Optional[CategoryResponse]
    
    class Config:
        from_attributes = True

def verify_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Access forbidden: admin only")
    return current_user

@router.get("/categories", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories

@router.post("/categories", response_model=CategoryResponse)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    existing = db.query(Category).filter(
        (Category.name == category.name) | (Category.slug == category.slug)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category with this name or slug already exists")
    
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.put("/categories/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = category.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_category, key, value)
    
    db.commit()
    db.refresh(db_category)
    return db_category

@router.delete("/categories/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db.delete(db_category)
    db.commit()
    return {"message": "Category deleted successfully"}

@router.get("/templates", response_model=List[TemplateResponse])
def get_all_templates(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    templates = db.query(Template).offset(skip).limit(limit).all()
    return templates

@router.get("/templates/{template_id}", response_model=TemplateResponse)
def get_template(template_id: int, db: Session = Depends(get_db)):
    template = db.query(Template).filter(Template.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.post("/templates", response_model=TemplateResponse)
async def create_template(
    title: str = Form(...),
    slug: str = Form(...),
    description: Optional[str] = Form(None),
    price: float = Form(0.0),
    category_id: Optional[int] = Form(None),
    template_data: Optional[str] = Form(None),
    is_active: bool = Form(True),
    thumbnail: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    existing = db.query(Template).filter(Template.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Template with this slug already exists")
    
    thumbnail_url = None
    if thumbnail:
        file_ext = thumbnail.filename.split(".")[-1]
        file_path = UPLOAD_DIR / f"{slug}_thumbnail.{file_ext}"
        with open(file_path, "wb") as f:
            content = await thumbnail.read()
            f.write(content)
        thumbnail_url = f"/uploads/{file_path.name}"
    
    db_template = Template(
        title=title,
        slug=slug,
        description=description,
        price=price,
        category_id=category_id,
        template_data=template_data,
        is_active=is_active,
        thumbnail_url=thumbnail_url
    )
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template

@router.put("/templates/{template_id}", response_model=TemplateResponse)
async def update_template(
    template_id: int,
    title: Optional[str] = Form(None),
    slug: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    category_id: Optional[int] = Form(None),
    template_data: Optional[str] = Form(None),
    is_active: Optional[bool] = Form(None),
    thumbnail: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    db_template = db.query(Template).filter(Template.id == template_id).first()
    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    if title is not None:
        db_template.title = title
    if slug is not None:
        db_template.slug = slug
    if description is not None:
        db_template.description = description
    if price is not None:
        db_template.price = price
    if category_id is not None:
        db_template.category_id = category_id
    if template_data is not None:
        db_template.template_data = template_data
    if is_active is not None:
        db_template.is_active = is_active
    
    if thumbnail:
        file_ext = thumbnail.filename.split(".")[-1]
        file_path = UPLOAD_DIR / f"{db_template.slug}_thumbnail.{file_ext}"
        with open(file_path, "wb") as f:
            content = await thumbnail.read()
            f.write(content)
        db_template.thumbnail_url = f"/uploads/{file_path.name}"
    
    db.commit()
    db.refresh(db_template)
    return db_template

@router.delete("/templates/{template_id}")
def delete_template(
    template_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    db_template = db.query(Template).filter(Template.id == template_id).first()
    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    if db_template.thumbnail_url:
        thumbnail_path = Path(__file__).parent.parent / db_template.thumbnail_url.lstrip("/")
        if thumbnail_path.exists():
            thumbnail_path.unlink()
    
    db.delete(db_template)
    db.commit()
    return {"message": "Template deleted successfully"}

@router.post("/templates/{template_id}/upload-thumbnail")
async def upload_template_thumbnail(
    template_id: int,
    thumbnail: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: User = Depends(verify_admin)
):
    db_template = db.query(Template).filter(Template.id == template_id).first()
    if not db_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    file_ext = thumbnail.filename.split(".")[-1]
    file_path = UPLOAD_DIR / f"{db_template.slug}_thumbnail.{file_ext}"
    with open(file_path, "wb") as f:
        content = await thumbnail.read()
        f.write(content)
    
    db_template.thumbnail_url = f"/uploads/{file_path.name}"
    db.commit()
    db.refresh(db_template)
    
    return {"thumbnail_url": db_template.thumbnail_url}
