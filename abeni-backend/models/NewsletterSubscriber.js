const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  lastEmailSent: {
    type: Date
  },
  emailCount: {
    type: Number,
    default: 0
  },
  preferences: {
    marketing: {
      type: Boolean,
      default: true
    },
    productUpdates: {
      type: Boolean,
      default: true
    },
    specialOffers: {
      type: Boolean,
      default: true
    },
    events: {
      type: Boolean,
      default: true
    }
  },
  source: {
    type: String,
    enum: ['website', 'checkout', 'admin', 'api'],
    default: 'website'
  },
  tags: [{
    type: String
  }],
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String
  },
  // Track if welcome email with discount code was sent
  welcomeEmailSent: {
    type: Boolean,
    default: false
  },
  welcomeEmailSentAt: {
    type: Date
  },
  // Personal unique discount code for this subscriber
  personalDiscountCode: {
    type: String,
    unique: true,
    sparse: true
  },
  // Track discount code usage
  discountCodeUsed: {
    type: Boolean,
    default: false
  },
  discountCodeUsedAt: {
    type: Date
  },
  discountCodeOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
newsletterSubscriberSchema.index({ email: 1 });
newsletterSubscriberSchema.index({ isActive: 1 });
newsletterSubscriberSchema.index({ subscribedAt: 1 });
newsletterSubscriberSchema.index({ welcomeEmailSent: 1 });

// Method to check if subscriber can receive welcome email
newsletterSubscriberSchema.methods.canReceiveWelcomeEmail = function() {
  return !this.welcomeEmailSent && this.isActive;
};

// Method to mark welcome email as sent
newsletterSubscriberSchema.methods.markWelcomeEmailSent = function() {
  this.welcomeEmailSent = true;
  this.welcomeEmailSentAt = new Date();
  return this.save();
};

// Method to generate and set personal discount code
newsletterSubscriberSchema.methods.generatePersonalDiscountCode = function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  const emailHash = this.email.substring(0, 3).toUpperCase();
  this.personalDiscountCode = `WELCOME${emailHash}${timestamp}${random}`.toUpperCase();
  return this.save();
};

// Method to check if subscriber can use discount code
newsletterSubscriberSchema.methods.canUseDiscountCode = function() {
  return this.welcomeEmailSent && !this.discountCodeUsed && this.isActive;
};

// Method to mark discount code as used
newsletterSubscriberSchema.methods.markDiscountCodeUsed = function(orderId) {
  this.discountCodeUsed = true;
  this.discountCodeUsedAt = new Date();
  this.discountCodeOrderId = orderId;
  return this.save();
};

// Static method to find active subscriber
newsletterSubscriberSchema.statics.findActiveSubscriber = function(email) {
  return this.findOne({
    email: email.toLowerCase(),
    isActive: true
  });
};

// Static method to check if email is already subscribed
newsletterSubscriberSchema.statics.isEmailSubscribed = function(email) {
  return this.exists({
    email: email.toLowerCase(),
    isActive: true
  });
};

// Pre-save middleware to ensure email is lowercase
newsletterSubscriberSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

module.exports = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
