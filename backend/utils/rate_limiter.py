from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import logging

logger = logging.getLogger(__name__)

async def check_rate_limit(ip_address: str, db: AsyncIOMotorClient, max_requests: int = 5, window_hours: int = 1) -> bool:
    """
    Check if IP address is within rate limit
    Returns True if within limit, False if exceeded
    """
    try:
        # Calculate time window
        time_window = datetime.utcnow() - timedelta(hours=window_hours)
        
        # Count requests from this IP in the time window
        count = await db.contact_messages.count_documents({
            "ip_address": ip_address,
            "timestamp": {"$gte": time_window}
        })
        
        # Check if within limit
        if count >= max_requests:
            logger.warning(f"Rate limit exceeded for IP: {ip_address} ({count} requests)")
            return False
        
        return True
        
    except Exception as e:
        logger.error(f"Error checking rate limit: {str(e)}")
        # Allow request if rate limiting check fails
        return True

async def cleanup_old_rate_limit_data(db: AsyncIOMotorClient, days_old: int = 7):
    """
    Clean up old contact messages for rate limiting
    """
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=days_old)
        
        result = await db.contact_messages.delete_many({
            "timestamp": {"$lt": cutoff_date}
        })
        
        logger.info(f"Cleaned up {result.deleted_count} old contact messages")
        
    except Exception as e:
        logger.error(f"Error cleaning up old rate limit data: {str(e)}")