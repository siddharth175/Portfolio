from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
import os
import logging
from pathlib import Path

router = APIRouter()
logger = logging.getLogger(__name__)

# Resume file path
RESUME_FILE_PATH = Path(__file__).parent.parent / "static" / "Siddharth_Singh_Resume.pdf"

@router.get("/resume/download")
async def download_resume():
    """
    Download resume PDF file
    """
    try:
        # Check if resume file exists
        if not RESUME_FILE_PATH.exists():
            # Create a placeholder PDF if it doesn't exist
            create_placeholder_resume()
        
        # Return file response
        return FileResponse(
            path=RESUME_FILE_PATH,
            filename="Siddharth_Singh_Resume.pdf",
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=Siddharth_Singh_Resume.pdf"
            }
        )
        
    except Exception as e:
        logger.error(f"Error downloading resume: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to download resume"
        )

def create_placeholder_resume():
    """
    Create a placeholder PDF file if resume doesn't exist
    """
    try:
        # Create static directory if it doesn't exist
        static_dir = RESUME_FILE_PATH.parent
        static_dir.mkdir(exist_ok=True)
        
        # Create a simple placeholder PDF content
        placeholder_content = b"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 12 Tf
100 700 Td
(Siddharth Singh - Resume) Tj
100 650 Td
(Please upload your actual resume PDF to:) Tj
100 600 Td
(/app/backend/static/Siddharth_Singh_Resume.pdf) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000265 00000 n 
0000000415 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
495
%%EOF"""
        
        # Write placeholder PDF
        with open(RESUME_FILE_PATH, 'wb') as f:
            f.write(placeholder_content)
            
        logger.info(f"Created placeholder resume at: {RESUME_FILE_PATH}")
        
    except Exception as e:
        logger.error(f"Error creating placeholder resume: {str(e)}")
        raise