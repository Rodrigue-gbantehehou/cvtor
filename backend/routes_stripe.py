#!/usr/bin/env python3
import os
import stripe
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models import User, SubscriptionPlan
from auth import get_current_active_user

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5000")

router = APIRouter(prefix="/stripe", tags=["Stripe"])

class CreateCheckoutSession(BaseModel):
    plan: str  # "premium"

@router.post("/create-checkout-session")
async def create_checkout_session(
    data: CreateCheckoutSession,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not stripe.api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe is not configured"
        )
    
    try:
        if not current_user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": current_user.id}
            )
            current_user.stripe_customer_id = customer.id
            db.commit()
        
        price_id = os.getenv("STRIPE_PREMIUM_PRICE_ID")
        if not price_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Stripe price ID not configured"
            )
        
        session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            payment_method_types=["card"],
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url=f"{FRONTEND_URL}/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{FRONTEND_URL}/pricing",
            metadata={"user_id": current_user.id}
        )
        
        return {"checkout_url": session.url, "session_id": session.id}
    
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Webhook secret not configured"
        )
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        metadata = session.get("metadata", {})
        
        if not metadata.get("user_id"):
            print(f"[Stripe webhook] No user_id in metadata for session {session.get('id')}")
            return {"status": "ignored", "reason": "missing_user_id"}
        
        try:
            user_id = int(metadata["user_id"])
        except (ValueError, TypeError) as e:
            print(f"[Stripe webhook] Invalid user_id in metadata: {metadata.get('user_id')}, error: {e}")
            return {"status": "error", "reason": "invalid_user_id"}
        
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.subscription_plan = SubscriptionPlan.PREMIUM
            user.stripe_subscription_id = session.get("subscription")
            db.commit()
            print(f"[Stripe webhook] User {user_id} upgraded to premium")
        else:
            print(f"[Stripe webhook] User {user_id} not found")
    
    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        subscription_id = subscription.get("id")
        
        if not subscription_id:
            print("[Stripe webhook] No subscription ID in event")
            return {"status": "ignored", "reason": "missing_subscription_id"}
        
        user = db.query(User).filter(
            User.stripe_subscription_id == subscription_id
        ).first()
        if user:
            user.subscription_plan = SubscriptionPlan.FREE
            user.stripe_subscription_id = None
            db.commit()
            print(f"[Stripe webhook] User {user.id} downgraded to free")
        else:
            print(f"[Stripe webhook] User with subscription {subscription_id} not found")
    
    return {"status": "success"}

@router.post("/create-portal-session")
async def create_portal_session(
    current_user: User = Depends(get_current_active_user)
):
    if not stripe.api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe is not configured"
        )
    
    if not current_user.stripe_customer_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Stripe customer found"
        )
    
    try:
        session = stripe.billing_portal.Session.create(
            customer=current_user.stripe_customer_id,
            return_url=f"{FRONTEND_URL}/dashboard",
        )
        return {"portal_url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
