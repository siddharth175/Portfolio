#!/usr/bin/env python3
"""
Backend API Testing Suite for Siddharth Singh's Portfolio
Tests all backend endpoints including health check, contact form, resume download, and stats
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from frontend environment
BACKEND_URL = "https://dd97c70a-b998-4179-92eb-ee496e9b3664.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.contact_id = None
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict[str, Any] = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_health_check(self):
        """Test GET /api/ health check endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/")
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Portfolio API" in data["message"]:
                    self.log_test(
                        "Health Check",
                        True,
                        "Backend is running and responding correctly",
                        {"status_code": response.status_code, "response": data}
                    )
                else:
                    self.log_test(
                        "Health Check",
                        False,
                        "Unexpected response format",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Health Check",
                    False,
                    f"Unexpected status code: {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Health Check",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        try:
            contact_data = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "subject": "Interested in your portfolio",
                "message": "Hi Siddharth, I came across your portfolio and I'm impressed with your work. I'd like to discuss a potential collaboration opportunity. Could we schedule a call this week?"
            }
            
            response = self.session.post(
                f"{BACKEND_URL}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "id" in data:
                    self.contact_id = data["id"]  # Store for later verification
                    self.log_test(
                        "Contact Form - Valid Data",
                        True,
                        "Contact form submitted successfully",
                        {"status_code": response.status_code, "response": data}
                    )
                else:
                    self.log_test(
                        "Contact Form - Valid Data",
                        False,
                        "Unexpected response format",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Contact Form - Valid Data",
                    False,
                    f"Unexpected status code: {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Contact Form - Valid Data",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email format"""
        try:
            contact_data = {
                "name": "Jane Doe",
                "email": "invalid-email-format",
                "subject": "Test Subject",
                "message": "This is a test message with invalid email format."
            }
            
            response = self.session.post(
                f"{BACKEND_URL}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test(
                    "Contact Form - Invalid Email",
                    True,
                    "Correctly rejected invalid email format",
                    {"status_code": response.status_code, "response": response.json()}
                )
            else:
                self.log_test(
                    "Contact Form - Invalid Email",
                    False,
                    f"Expected 422 status code, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Contact Form - Invalid Email",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_contact_form_empty_fields(self):
        """Test POST /api/contact with empty required fields"""
        try:
            contact_data = {
                "name": "",
                "email": "test@example.com",
                "subject": "",
                "message": ""
            }
            
            response = self.session.post(
                f"{BACKEND_URL}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test(
                    "Contact Form - Empty Fields",
                    True,
                    "Correctly rejected empty required fields",
                    {"status_code": response.status_code, "response": response.json()}
                )
            else:
                self.log_test(
                    "Contact Form - Empty Fields",
                    False,
                    f"Expected 422 status code, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Contact Form - Empty Fields",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_rate_limiting(self):
        """Test rate limiting by making multiple contact form submissions"""
        try:
            # Make 6 requests quickly (limit is 5 per hour)
            contact_data = {
                "name": "Rate Test User",
                "email": "ratetest@example.com",
                "subject": "Rate limiting test",
                "message": "Testing rate limiting functionality."
            }
            
            rate_limit_hit = False
            for i in range(6):
                response = self.session.post(
                    f"{BACKEND_URL}/contact",
                    json=contact_data,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 429:
                    rate_limit_hit = True
                    break
                    
                time.sleep(0.1)  # Small delay between requests
            
            if rate_limit_hit:
                self.log_test(
                    "Rate Limiting",
                    True,
                    "Rate limiting is working correctly",
                    {"rate_limit_triggered": True}
                )
            else:
                self.log_test(
                    "Rate Limiting",
                    False,
                    "Rate limiting not triggered after 6 requests",
                    {"rate_limit_triggered": False}
                )
                
        except Exception as e:
            self.log_test(
                "Rate Limiting",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_resume_download(self):
        """Test GET /api/resume/download"""
        try:
            response = self.session.get(f"{BACKEND_URL}/resume/download")
            
            if response.status_code == 200:
                # Check if it's a PDF file
                content_type = response.headers.get('content-type', '')
                content_disposition = response.headers.get('content-disposition', '')
                
                if 'application/pdf' in content_type or 'pdf' in content_disposition.lower():
                    self.log_test(
                        "Resume Download",
                        True,
                        "Resume PDF downloaded successfully",
                        {
                            "status_code": response.status_code,
                            "content_type": content_type,
                            "content_disposition": content_disposition,
                            "file_size": len(response.content)
                        }
                    )
                else:
                    self.log_test(
                        "Resume Download",
                        False,
                        "Response is not a PDF file",
                        {
                            "status_code": response.status_code,
                            "content_type": content_type,
                            "content_disposition": content_disposition
                        }
                    )
            else:
                self.log_test(
                    "Resume Download",
                    False,
                    f"Unexpected status code: {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Resume Download",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_portfolio_stats(self):
        """Test GET /api/stats"""
        try:
            response = self.session.get(f"{BACKEND_URL}/stats")
            
            if response.status_code == 200:
                data = response.json()
                if "total_contacts" in data:
                    self.log_test(
                        "Portfolio Stats",
                        True,
                        "Portfolio statistics retrieved successfully",
                        {"status_code": response.status_code, "stats": data}
                    )
                else:
                    self.log_test(
                        "Portfolio Stats",
                        False,
                        "Missing required fields in stats response",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Portfolio Stats",
                    False,
                    f"Unexpected status code: {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Portfolio Stats",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def test_admin_contacts(self):
        """Test GET /api/admin/contacts (admin endpoint)"""
        try:
            response = self.session.get(f"{BACKEND_URL}/admin/contacts")
            
            if response.status_code == 200:
                data = response.json()
                if "messages" in data and "total" in data:
                    # Check if our test contact is in the results
                    found_test_contact = False
                    if self.contact_id:
                        for message in data["messages"]:
                            if message.get("id") == self.contact_id:
                                found_test_contact = True
                                break
                    
                    self.log_test(
                        "Admin Contacts",
                        True,
                        f"Admin contacts retrieved successfully. Found {data['total']} total contacts",
                        {
                            "status_code": response.status_code,
                            "total_contacts": data["total"],
                            "test_contact_found": found_test_contact
                        }
                    )
                else:
                    self.log_test(
                        "Admin Contacts",
                        False,
                        "Missing required fields in admin contacts response",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Admin Contacts",
                    False,
                    f"Unexpected status code: {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Admin Contacts",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )

    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 80)
        print("SIDDHARTH SINGH PORTFOLIO - BACKEND API TESTING")
        print("=" * 80)
        print(f"Testing backend at: {BACKEND_URL}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Run tests in order
        self.test_health_check()
        self.test_contact_form_valid()
        self.test_contact_form_invalid_email()
        self.test_contact_form_empty_fields()
        self.test_rate_limiting()
        self.test_resume_download()
        self.test_portfolio_stats()
        self.test_admin_contacts()
        
        # Summary
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        print()
        
        # Failed tests details
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("FAILED TESTS:")
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['message']}")
                if test.get('details'):
                    print(f"   Details: {test['details']}")
            print()
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)