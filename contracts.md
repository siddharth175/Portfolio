# API Contracts - Siddharth Singh Portfolio

## Overview
This document defines the API contracts between the React frontend and FastAPI backend for Siddharth Singh's portfolio website.

## Current Mock Data (Frontend Only)
The following functionalities are currently mocked in `mock.js`:
- Contact form submission
- Resume download
- Project details retrieval

## Backend API Endpoints to Implement

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`
**Purpose:** Handle contact form submissions and store in database

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for reaching out! I'll get back to you within 24 hours.",
  "id": "contact_message_id",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Database Model:** `ContactMessage`
- id: ObjectId
- name: String
- email: String
- subject: String
- message: String
- timestamp: DateTime
- status: String (enum: 'new', 'read', 'replied')

### 2. Resume Download
**Endpoint:** `GET /api/resume/download`
**Purpose:** Serve resume PDF file

**Response:** 
- Content-Type: application/pdf
- File download with proper headers

### 3. Portfolio Statistics
**Endpoint:** `GET /api/stats`
**Purpose:** Get portfolio statistics for dashboard

**Response:**
```json
{
  "totalProjects": 15,
  "totalContacts": 25,
  "technologies": 20,
  "yearsExperience": 3
}
```

### 4. Contact Messages (Admin - Optional)
**Endpoint:** `GET /api/admin/contacts`
**Purpose:** Retrieve all contact messages for admin view

**Response:**
```json
{
  "messages": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "subject": "string",
      "message": "string",
      "timestamp": "datetime",
      "status": "string"
    }
  ],
  "total": "number"
}
```

## Frontend Integration Points

### 1. Contact Component Integration
**Current Mock:** `mockApi.submitContactForm(formData)`
**Replace with:** Direct API call to `/api/contact`

**Integration Steps:**
1. Remove mock API import
2. Create axios API call
3. Handle loading states
4. Show success/error messages via toast

### 2. Navigation/Resume Download
**Current Mock:** `mockApi.downloadResume()`
**Replace with:** Direct link to `/api/resume/download`

**Integration Steps:**
1. Replace mock function with direct download link
2. Handle download errors gracefully

### 3. Statistics Display (Future Enhancement)
**Purpose:** Add real-time portfolio statistics
**Location:** Could be added to About section or Admin dashboard

## Database Schema

### ContactMessage Collection
```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  email: String (required, valid email),
  subject: String (required, max 200 chars), 
  message: String (required, max 2000 chars),
  timestamp: Date (default: current date),
  status: String (enum: ['new', 'read', 'replied'], default: 'new'),
  ipAddress: String (optional, for security),
  userAgent: String (optional, for analytics)
}
```

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": "string",
  "details": "string (optional)",
  "code": "error_code"
}
```

### Error Codes
- `VALIDATION_ERROR`: Invalid input data
- `EMAIL_INVALID`: Invalid email format
- `SERVER_ERROR`: Internal server error
- `FILE_NOT_FOUND`: Resume file not found

## Security Considerations
1. **Rate Limiting:** Implement rate limiting for contact form (max 5 submissions per IP per hour)
2. **Input Validation:** Sanitize all inputs to prevent XSS
3. **Email Validation:** Verify email format and check against disposable email services
4. **Spam Protection:** Basic spam filtering for contact messages

## File Structure to Create
```
backend/
├── models/
│   └── contact.py
├── routes/
│   ├── contact.py
│   └── resume.py
├── utils/
│   ├── validation.py
│   └── email.py
└── static/
    └── resume.pdf
```

## Integration Testing Plan
1. Test contact form submission with valid data
2. Test contact form validation with invalid data
3. Test resume download functionality
4. Test error handling scenarios
5. Test database connectivity and data persistence

## Environment Variables Required
```
# Email configuration (optional for notifications)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Resume file path
RESUME_FILE_PATH=./static/resume.pdf
```

## Frontend Changes Required
1. Remove `mock.js` imports from Contact.jsx and Navigation.jsx
2. Create API utility functions for backend calls
3. Update error handling to work with real API responses
4. Add proper loading states during API calls
5. Update toast messages to show real API responses