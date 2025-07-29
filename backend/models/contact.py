from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, Literal
from datetime import datetime
import uuid

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: Literal['new', 'read', 'replied'] = Field(default='new')
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()

    @validator('subject')
    def validate_subject(cls, v):
        if not v.strip():
            raise ValueError('Subject cannot be empty')
        return v.strip()

    @validator('message')
    def validate_message(cls, v):
        if not v.strip():
            raise ValueError('Message cannot be empty')
        return v.strip()

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactMessageResponse(BaseModel):
    success: bool
    message: str
    id: str
    timestamp: datetime

class PortfolioStats(BaseModel):
    total_projects: int = 15
    total_contacts: int
    technologies: int = 20
    years_experience: int = 3