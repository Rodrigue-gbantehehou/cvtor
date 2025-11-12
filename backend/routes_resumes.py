#!/usr/bin/env python3
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models import User, Resume
from auth import get_current_active_user, check_quota
import json

router = APIRouter(prefix="/resumes", tags=["Resumes"])

class ResumeCreate(BaseModel):
    title: str
    template_name: str
    data: Dict[str, Any]

class ResumeUpdate(BaseModel):
    title: str | None = None
    template_name: str | None = None
    data: Dict[str, Any] | None = None

class ResumeResponse(BaseModel):
    id: int
    user_id: int
    title: str
    template_name: str
    data: Dict[str, Any]
    is_public: bool
    created_at: str
    updated_at: str | None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[ResumeResponse])
def list_my_resumes(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    resumes = db.query(Resume).filter(Resume.user_id == current_user.id).all()
    return [
        {
            "id": r.id,
            "user_id": r.user_id,
            "title": r.title,
            "template_name": r.template_name,
            "data": json.loads(r.data),
            "is_public": r.is_public,
            "created_at": str(r.created_at),
            "updated_at": str(r.updated_at) if r.updated_at else None
        }
        for r in resumes
    ]

@router.get("/quota")
def get_quota(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    resume_count = db.query(Resume).filter(Resume.user_id == current_user.id).count()
    can_create = check_quota(current_user, resume_count)
    max_resumes = None if current_user.subscription_plan.value == "premium" else 3
    
    return {
        "subscription_plan": current_user.subscription_plan.value,
        "current_count": resume_count,
        "max_resumes": max_resumes,
        "can_create_more": can_create
    }

@router.post("/", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
def create_resume(
    resume_data: ResumeCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    resume_count = db.query(Resume).filter(Resume.user_id == current_user.id).count()
    
    if not check_quota(current_user, resume_count):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Quota exceeded. Free plan allows 3 CVs. Upgrade to Premium for unlimited CVs."
        )
    
    new_resume = Resume(
        user_id=current_user.id,
        title=resume_data.title,
        template_name=resume_data.template_name,
        data=json.dumps(resume_data.data)
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    
    return {
        "id": new_resume.id,
        "user_id": new_resume.user_id,
        "title": new_resume.title,
        "template_name": new_resume.template_name,
        "data": json.loads(new_resume.data),
        "is_public": new_resume.is_public,
        "created_at": str(new_resume.created_at),
        "updated_at": str(new_resume.updated_at) if new_resume.updated_at else None
    }

@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume(
    resume_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {
        "id": resume.id,
        "user_id": resume.user_id,
        "title": resume.title,
        "template_name": resume.template_name,
        "data": json.loads(resume.data),
        "is_public": resume.is_public,
        "created_at": str(resume.created_at),
        "updated_at": str(resume.updated_at) if resume.updated_at else None
    }

@router.put("/{resume_id}", response_model=ResumeResponse)
def update_resume(
    resume_id: int,
    resume_data: ResumeUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if resume_data.title is not None:
        resume.title = resume_data.title
    if resume_data.template_name is not None:
        resume.template_name = resume_data.template_name
    if resume_data.data is not None:
        resume.data = json.dumps(resume_data.data)
    
    db.commit()
    db.refresh(resume)
    
    return {
        "id": resume.id,
        "user_id": resume.user_id,
        "title": resume.title,
        "template_name": resume.template_name,
        "data": json.loads(resume.data),
        "is_public": resume.is_public,
        "created_at": str(resume.created_at),
        "updated_at": str(resume.updated_at) if resume.updated_at else None
    }

@router.delete("/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    db.delete(resume)
    db.commit()
    
    return None
