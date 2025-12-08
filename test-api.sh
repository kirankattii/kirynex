#!/bin/bash

# Test script for BREVO API integration
# Usage: ./test-api.sh

echo "Testing Contact Form API..."
echo ""

curl -X POST 'https://www.kirynex.in/api/send-contact' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "interest": "Web Development",
    "brief": "This is a test message"
  }' \
  -v

echo ""
echo ""
echo "Testing Project Inquiry API..."
echo ""

curl -X POST 'https://www.kirynex.in/api/send-project-inquiry' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "service": "web",
    "timeline": "1-3m",
    "message": "This is a test project inquiry"
  }' \
  -v





