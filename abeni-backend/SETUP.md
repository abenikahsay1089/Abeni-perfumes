# Abeni Perfumes Backend Setup Guide

## Email Service Configuration

To enable the newsletter subscription email functionality, you need to configure your email service in the `.env` file.

### 1. Create Environment File

Create a `.env` file in the `abeni-backend` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/abeni-perfumes

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Email Service Setup

#### Option A: Gmail (Recommended for Development)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in `EMAIL_PASSWORD`

#### Option B: Other Email Services

You can use other email services by changing `EMAIL_SERVICE`:
- `outlook` for Outlook/Hotmail
- `yahoo` for Yahoo Mail
- `sendgrid` for SendGrid
- `mailgun` for Mailgun

### 3. Testing the Email Service

1. Start the backend server: `npm run server`
2. Test the newsletter subscription endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/newsletter/subscribe \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

### 4. Setting Up Discount Codes

1. Seed the discount codes database:
   ```bash
   npm run seed-discounts
   ```
   
   This will create:
   - **WELCOME15**: 15% off for newsletter subscribers (first order only)
   - **ETHIOPIAN10**: 10% off Ethiopian coffee collection
   - **FLORAL20**: 20% off floral fragrances
   - **FREESHIP**: Free shipping on orders over 2000 ETB

2. Test discount code validation:
   ```bash
   curl -X POST http://localhost:5000/api/newsletter/validate-discount \
     -H "Content-Type: application/json" \
     -d '{"code":"WELCOME15","orderTotal":1000,"customerEmail":"test@example.com"}'
   ```

### 5. Frontend Integration

The frontend is already configured to use the `/api/newsletter/subscribe` endpoint. Make sure your backend is running on the correct port and CORS is properly configured.

## Features Added

### Enhanced Search Functionality
- Advanced search with suggestions
- Search history and popular searches
- Quick filters for categories and price ranges
- Comprehensive search results page with filtering and sorting

### Newsletter Subscription System
- Email validation and error handling
- Beautiful welcome email templates
- Backend API endpoints for subscription management
- Integration with existing email utility

## API Endpoints

### Newsletter Routes
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/status/:email` - Check subscription status

## Notes

- The email service requires proper SMTP configuration
- For production, consider using a professional email service like SendGrid or Mailgun
- The newsletter subscription data is currently stored in memory (implement database storage for production)
- All email templates are customizable in the `utils/email.js` file
