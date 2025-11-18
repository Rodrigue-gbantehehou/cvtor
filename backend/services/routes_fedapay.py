#!/usr/bin/env python3
import os
import fedapay
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database.database import get_db
from models.models import User, SubscriptionPlan
from auth.auth import get_current_active_user

FEDAPAY_API_KEY = os.getenv("FEDAPAY_SECRET_KEY")
FEDAPAY_ENVIRONMENT = os.getenv("FEDAPAY_ENVIRONMENT", "sandbox")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5000")

if FEDAPAY_API_KEY:
    fedapay.api_key = FEDAPAY_API_KEY
    fedapay.environment = FEDAPAY_ENVIRONMENT

router = APIRouter(prefix="/fedapay", tags=["FedaPay"])

class CreateCheckoutSession(BaseModel):
    plan: str
    amount: int = 5000

@router.post("/create-checkout-session")
async def create_checkout_session(
    data: CreateCheckoutSession,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not FEDAPAY_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="FedaPay is not configured"
        )
    
    try:
        from fedapay import Transaction
        
        transaction = Transaction.create({
            'amount': data.amount,
            'description': f'Abonnement {data.plan.upper()} - CVtor',
            'currency': {
                'iso': 'XOF'
            },
            'customer': {
                'email': current_user.email,
                'firstname': current_user.full_name or current_user.email.split('@')[0],
                'lastname': ''
            },
            'callback_url': f"{FRONTEND_URL}/success?provider=fedapay",
            'metadata': {
                'user_id': str(current_user.id),
                'plan': data.plan
            }
        })
        
        token = transaction.generate_token()
        
        return {
            "checkout_url": token.url,
            "transaction_id": transaction.id,
            "token": token.token
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"FedaPay error: {str(e)}"
        )

@router.post("/webhook")
async def fedapay_webhook(request: Request, db: Session = Depends(get_db)):
    try:
        payload = await request.json()
        
        event_type = payload.get('type')
        event_data = payload.get('data', {})
        
        if event_type == 'transaction.approved':
            transaction_id = event_data.get('id')
            metadata = event_data.get('metadata', {})
            
            if not metadata.get('user_id'):
                print(f"[FedaPay webhook] No user_id in metadata for transaction {transaction_id}")
                return {"status": "ignored", "reason": "missing_user_id"}
            
            try:
                user_id = int(metadata['user_id'])
            except (ValueError, TypeError) as e:
                print(f"[FedaPay webhook] Invalid user_id in metadata: {metadata.get('user_id')}, error: {e}")
                return {"status": "error", "reason": "invalid_user_id"}
            
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                plan = metadata.get('plan', 'premium')
                if plan.lower() == 'premium':
                    user.subscription_plan = SubscriptionPlan.PREMIUM
                    db.commit()
                    print(f"[FedaPay webhook] User {user_id} upgraded to premium via FedaPay")
                else:
                    print(f"[FedaPay webhook] Unknown plan: {plan}")
            else:
                print(f"[FedaPay webhook] User {user_id} not found")
        
        elif event_type == 'transaction.declined':
            transaction_id = event_data.get('id')
            print(f"[FedaPay webhook] Transaction {transaction_id} declined")
        
        return {"status": "success"}
    
    except Exception as e:
        print(f"[FedaPay webhook] Error processing webhook: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Webhook processing error: {str(e)}"
        )

@router.get("/transaction/{transaction_id}")
async def get_transaction_status(
    transaction_id: str,
    current_user: User = Depends(get_current_active_user)
):
    if not FEDAPAY_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="FedaPay is not configured"
        )
    
    try:
        from fedapay import Transaction
        
        transaction = Transaction.retrieve(transaction_id)
        
        return {
            "id": transaction.id,
            "status": transaction.status,
            "amount": transaction.amount,
            "description": transaction.description
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error retrieving transaction: {str(e)}"
        )
