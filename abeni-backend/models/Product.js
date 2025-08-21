const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    scentNotes: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sustainabilityScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
    tags: {
  type: [String],
  default: []
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);