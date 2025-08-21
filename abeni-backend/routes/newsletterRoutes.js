const express = require('express');
const router = express.Router();
const { sendNewsletterSubscriptionEmail } = require('../utils/email');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const DiscountCode = require('../models/DiscountCode');

// Newsletter subscription endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { email, firstName, lastName, source = 'website', metadata = {} } = req.body;

    // Basic validation
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const emailLower = email.trim().toLowerCase();

    // Check if email is already subscribed
    const existingSubscriber = await NewsletterSubscriber.findActiveSubscriber(emailLower);
    
    if (existingSubscriber) {
      // If subscriber exists but hasn't received welcome email, send it
      if (existingSubscriber.canReceiveWelcomeEmail()) {
        // Generate personal discount code if not exists
        if (!existingSubscriber.personalDiscountCode) {
          await existingSubscriber.generatePersonalDiscountCode();
        }
        
        await sendNewsletterSubscriptionEmail(emailLower, existingSubscriber.personalDiscountCode);
        await existingSubscriber.markWelcomeEmailSent();
        
        return res.status(200).json({
          success: true,
          message: 'Welcome email sent to existing subscriber',
          data: {
            email: emailLower,
            isNewSubscriber: false,
            welcomeEmailSent: true
          }
        });
      }
      
      // If subscriber already received welcome email
      return res.status(200).json({
        success: true,
        message: 'Email already subscribed to newsletter',
        data: {
          email: emailLower,
          isNewSubscriber: false,
          alreadySubscribed: true
        }
      });
    }

    // Create new subscriber
    const newSubscriber = new NewsletterSubscriber({
      email: emailLower,
      firstName,
      lastName,
      source,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        referrer: req.get('Referrer'),
        ...metadata
      }
    });

    await newSubscriber.save();

    // Generate personal discount code
    await newSubscriber.generatePersonalDiscountCode();

    // Send welcome email with personal discount code
    await sendNewsletterSubscriptionEmail(emailLower, newSubscriber.personalDiscountCode);
    
    // Mark welcome email as sent
    await newSubscriber.markWelcomeEmailSent();

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: emailLower,
        isNewSubscriber: true,
        subscribedAt: newSubscriber.subscribedAt,
        welcomeEmailSent: true
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Handle specific email errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error. Please try again later.'
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Unable to send confirmation email. Please try again later.'
      });
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again later.'
    });
  }
});

// Validate discount code endpoint
router.post('/validate-discount', async (req, res) => {
  try {
    const { code, orderTotal, customerEmail } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Discount code is required'
      });
    }

    if (!orderTotal || orderTotal <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid order total is required'
      });
    }

    // First check if this is a personal discount code from newsletter subscription
    let subscriber = null;
    if (customerEmail) {
      subscriber = await NewsletterSubscriber.findActiveSubscriber(customerEmail);
    }

    // Check if this is a personal discount code
    if (subscriber && subscriber.personalDiscountCode === code.toUpperCase().trim()) {
      // Validate personal discount code
      if (subscriber.discountCodeUsed) {
        return res.status(400).json({
          success: false,
          message: 'This discount code has already been used'
        });
      }

      // Personal discount code is always 15% off
      const discountAmount = Math.min(orderTotal * 0.15, 1000); // 15% off, max 1000 ETB
      const finalTotal = orderTotal - discountAmount;

      return res.status(200).json({
        success: true,
        message: 'Personal discount code applied successfully',
        data: {
          code: subscriber.personalDiscountCode,
          description: 'Personal welcome discount',
          discountType: 'percentage',
          discountValue: 15,
          discountAmount,
          orderTotal,
          finalTotal,
          minimumOrderAmount: 100, // Minimum 100 ETB order
          maximumDiscount: 1000
        }
      });
    }

    // If not personal code, check global discount codes
    const discountCode = await DiscountCode.findOne({ 
      code: code.toUpperCase().trim(),
      isActive: true
    });

    if (!discountCode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid discount code'
      });
    }

    // Check if code is valid
    if (!discountCode.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Discount code is expired or inactive'
      });
    }

    // Check minimum order amount
    if (orderTotal < discountCode.minimumOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ${discountCode.minimumOrderAmount} ETB required`
      });
    }

    // Check if customer can use this code (for newsletter subscribers)
    if (discountCode.restrictions.firstTimeOnly && customerEmail) {
      const subscriber = await NewsletterSubscriber.findActiveSubscriber(customerEmail);
      
      if (subscriber && !subscriber.canUseDiscountCode()) {
        return res.status(400).json({
          success: false,
          message: 'This discount code has already been used'
        });
      }
    }

    // Calculate discount
    const discountAmount = discountCode.calculateDiscount(orderTotal);
    const finalTotal = orderTotal - discountAmount;

    res.status(200).json({
      success: true,
      message: 'Discount code applied successfully',
      data: {
        code: discountCode.code,
        description: discountCode.description,
        discountType: discountCode.discountType,
        discountValue: discountCode.discountValue,
        discountAmount,
        orderTotal,
        finalTotal,
        minimumOrderAmount: discountCode.minimumOrderAmount,
        maximumDiscount: discountCode.maximumDiscount
      }
    });

  } catch (error) {
    console.error('Discount code validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate discount code. Please try again later.'
    });
  }
});

// Apply discount code to order
router.post('/apply-discount', async (req, res) => {
  try {
    const { code, orderId, customerEmail } = req.body;

    if (!code || !orderId || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Code, order ID, and customer email are required'
      });
    }

    // First check if this is a personal discount code from newsletter subscription
    let subscriber = null;
    if (customerEmail) {
      subscriber = await NewsletterSubscriber.findActiveSubscriber(customerEmail);
    }

    // Check if this is a personal discount code
    if (subscriber && subscriber.personalDiscountCode === code.toUpperCase().trim()) {
      // Validate personal discount code
      if (subscriber.discountCodeUsed) {
        return res.status(400).json({
          success: false,
          message: 'This discount code has already been used'
        });
      }

      // Mark personal discount code as used
      await subscriber.markDiscountCodeUsed(orderId);

      return res.status(200).json({
        success: true,
        message: 'Personal discount code applied to order successfully',
        data: {
          code: subscriber.personalDiscountCode,
          orderId,
          usageCount: 1
        }
      });
    }

    // If not personal code, check global discount codes
    const discountCode = await DiscountCode.findOne({ 
      code: code.toUpperCase().trim(),
      isActive: true
    });

    if (!discountCode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid discount code'
      });
    }

    // Check if code is valid
    if (!discountCode.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Discount code is expired or inactive'
      });
    }

    // For newsletter subscriber codes, check if customer can use it
    if (discountCode.restrictions.firstTimeOnly) {
      const subscriber = await NewsletterSubscriber.findActiveSubscriber(customerEmail);
      
      if (!subscriber || !subscriber.canUseDiscountCode()) {
        return res.status(400).json({
          success: false,
          message: 'This discount code has already been used or is not available'
        });
      }
    }

    // Increment usage count
    discountCode.usedCount += 1;
    await discountCode.save();

    // If this is a newsletter subscriber code, mark it as used
    if (discountCode.restrictions.firstTimeOnly && customerEmail) {
      const subscriber = await NewsletterSubscriber.findActiveSubscriber(customerEmail);
      if (subscriber) {
        await subscriber.markDiscountCodeUsed(orderId);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Discount code applied to order successfully',
      data: {
        code: discountCode.code,
        orderId,
        usageCount: discountCode.usedCount
      }
    });

  } catch (error) {
    console.error('Apply discount code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to apply discount code. Please try again later.'
    });
  }
});

// Unsubscribe endpoint
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    const emailLower = email.trim().toLowerCase();
    const subscriber = await NewsletterSubscriber.findActiveSubscriber(emailLower);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
      data: {
        email: emailLower,
        unsubscribedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe from newsletter. Please try again later.'
    });
  }
});

// Get subscription status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    const emailLower = email.trim().toLowerCase();
    const subscriber = await NewsletterSubscriber.findActiveSubscriber(emailLower);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        email: subscriber.email,
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        isSubscribed: subscriber.isActive,
        subscribedAt: subscriber.subscribedAt,
        lastEmailSent: subscriber.lastEmailSent,
        welcomeEmailSent: subscriber.welcomeEmailSent,
        discountCodeUsed: subscriber.discountCodeUsed,
        canUseDiscountCode: subscriber.canUseDiscountCode()
      }
    });

  } catch (error) {
    console.error('Newsletter status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check subscription status. Please try again later.'
    });
  }
});

module.exports = router;
