from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from models.contact import ContactMessage, ContactMessageCreate, ContactMessageResponse, PortfolioStats
from utils.validation import validate_contact_message, get_client_ip
from utils.rate_limiter import check_rate_limit
import logging
from typing import List
import os

router = APIRouter()

# Get database from app state
def get_database():
    from server import db
    return db

logger = logging.getLogger(__name__)

@router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact_form(
    contact_data: ContactMessageCreate,
    request: Request,
    db: AsyncIOMotorClient = Depends(get_database)
):
    """
    Submit a contact form message
    """
    try:
        # Get client information
        client_ip = get_client_ip(request)
        user_agent = request.headers.get("user-agent", "")
        
        # Check rate limiting (max 5 submissions per IP per hour)
        if not await check_rate_limit(client_ip, db):
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later."
            )
        
        # Validate contact message
        if not validate_contact_message(contact_data):
            raise HTTPException(
                status_code=422,
                detail="Invalid contact message data"
            )
        
        # Create contact message
        contact_message = ContactMessage(
            name=contact_data.name,
            email=contact_data.email,
            subject=contact_data.subject,
            message=contact_data.message,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"Contact message saved: {contact_message.id}")
            
            # Return success response
            return ContactMessageResponse(
                success=True,
                message="Thank you for reaching out! I'll get back to you within 24 hours.",
                id=contact_message.id,
                timestamp=contact_message.timestamp
            )
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to save contact message"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )

@router.get("/stats", response_model=PortfolioStats)
async def get_portfolio_stats(db: AsyncIOMotorClient = Depends(get_database)):
    """
    Get portfolio statistics
    """
    try:
        # Count total contact messages
        total_contacts = await db.contact_messages.count_documents({})
        
        return PortfolioStats(
            total_contacts=total_contacts
        )
        
    except Exception as e:
        logger.error(f"Error getting portfolio stats: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get portfolio statistics"
        )

@router.get("/admin/contacts")
async def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    db: AsyncIOMotorClient = Depends(get_database)
):
    """
    Get all contact messages (admin endpoint)
    """
    try:
        # Get total count
        total = await db.contact_messages.count_documents({})
        
        # Get messages with pagination
        cursor = db.contact_messages.find({}).sort("timestamp", -1).skip(skip).limit(limit)
        messages = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string for JSON serialization
        for message in messages:
            message['_id'] = str(message['_id'])
        
        return {
            "messages": messages,
            "total": total,
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Error getting contact messages: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get contact messages"
        )