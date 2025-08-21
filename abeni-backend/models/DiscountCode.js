const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  minimumOrderAmount: {
    type: Number,
    default: 0
  },
  maximumDiscount: {
    type: Number,
    default: null
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    default: null // null means no expiration
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableCategories: [{
    type: String
  }],
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  restrictions: {
    firstTimeOnly: {
      type: Boolean,
      default: false
    },
    newCustomersOnly: {
      type: Boolean,
      default: false
    },
    oneTimePerCustomer: {
      type: Boolean,
      default: false
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient code lookups
discountCodeSchema.index({ code: 1, isActive: 1 });
discountCodeSchema.index({ validFrom: 1, validUntil: 1 });

// Method to check if code is valid
discountCodeSchema.methods.isValid = function() {
  const now = new Date();
  
  // Check if code is active
  if (!this.isActive) return false;
  
  // Check if within valid date range
  if (this.validFrom && now < this.validFrom) return false;
  if (this.validUntil && now > this.validUntil) return false;
  
  // Check usage limit
  if (this.usageLimit && this.usedCount >= this.usageLimit) return false;
  
  return true;
};

// Method to calculate discount amount
discountCodeSchema.methods.calculateDiscount = function(orderTotal) {
  if (orderTotal < this.minimumOrderAmount) {
    return 0;
  }
  
  let discountAmount = 0;
  
  if (this.discountType === 'percentage') {
    discountAmount = orderTotal * (this.discountValue / 100);
    
    // Apply maximum discount limit if set
    if (this.maximumDiscount && discountAmount > this.maximumDiscount) {
      discountAmount = this.maximumDiscount;
    }
  } else {
    discountAmount = this.discountValue;
  }
  
  return Math.min(discountAmount, orderTotal); // Can't discount more than order total
};

// Static method to find valid code
discountCodeSchema.statics.findValidCode = function(code) {
  return this.findOne({
    code: code.toUpperCase(),
    isActive: true,
    $or: [
      { validUntil: null },
      { validUntil: { $gt: new Date() } }
    ],
    $or: [
      { usageLimit: null },
      { usedCount: { $lt: '$usageLimit' } }
    ]
  });
};

module.exports = mongoose.model('DiscountCode', discountCodeSchema);
