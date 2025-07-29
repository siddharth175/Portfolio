import re
from fastapi import Request
from models.contact import ContactMessageCreate
from typing import Optional

def validate_contact_message(contact_data: ContactMessageCreate) -> bool:
    """
    Validate contact message data
    """
    try:
        # Basic validation (Pydantic handles most of this)
        if not contact_data.name.strip():
            return False
        
        if not contact_data.subject.strip():
            return False
            
        if not contact_data.message.strip():
            return False
        
        # Check for potential spam patterns
        if is_spam_message(contact_data.message):
            return False
            
        return True
        
    except Exception:
        return False

def is_spam_message(message: str) -> bool:
    """
    Basic spam detection
    """
    spam_patterns = [
        r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
        r'buy now',
        r'click here',
        r'limited time',
        r'free money',
        r'make money fast',
        r'casino',
        r'viagra',
        r'pills'
    ]
    
    message_lower = message.lower()
    
    for pattern in spam_patterns:
        if re.search(pattern, message_lower):
            return True
    
    # Check for excessive repetition
    words = message_lower.split()
    if len(words) > 5:
        unique_words = set(words)
        if len(unique_words) < len(words) * 0.3:  # Less than 30% unique words
            return True
    
    return False

def get_client_ip(request: Request) -> str:
    """
    Get client IP address from request
    """
    # Check for forwarded headers first
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    
    # Fallback to direct client IP
    return request.client.host if request.client else "unknown"

def validate_email_format(email: str) -> bool:
    """
    Validate email format
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_input(input_string: str) -> str:
    """
    Basic input sanitization
    """
    # Remove potential HTML/script tags
    import html
    sanitized = html.escape(input_string)
    
    # Remove excessive whitespace
    sanitized = re.sub(r'\s+', ' ', sanitized).strip()
    
    return sanitized