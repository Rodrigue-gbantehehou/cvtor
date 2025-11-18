#!/usr/bin/env python3
from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.database import get_db
from models.models import Template, Category

router = APIRouter(prefix="/api", tags=["public"])

class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str]
    
    class Config:
        from_attributes = True

class TemplatePublicResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: Optional[str]
    price: float
    thumbnail_url: Optional[str]
    category: Optional[CategoryResponse]
    
    class Config:
        from_attributes = True

@router.get("/categories", response_model=List[CategoryResponse])
def list_public_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories

@router.get("/templates", response_model=List[TemplatePublicResponse])
def list_public_templates(
    category_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Template).filter(Template.is_active == True)
    if category_id:
        query = query.filter(Template.category_id == category_id)
    templates = query.all()
    return templates

@router.get("/templates/{slug}", response_model=TemplatePublicResponse)
def get_template_by_slug(slug: str, db: Session = Depends(get_db)):
    template = db.query(Template).filter(
        Template.slug == slug,
        Template.is_active == True
    ).first()
    if not template:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.get("/templates/category/{category_slug}", response_model=List[TemplatePublicResponse])
def list_templates_by_category(category_slug: str, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.slug == category_slug).first()
    if not category:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Category not found")
    
    templates = db.query(Template).filter(
        Template.category_id == category.id,
        Template.is_active == True
    ).all()
    return templates
