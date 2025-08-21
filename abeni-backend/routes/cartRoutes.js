// abeni-backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  updateCart
} = require('../controllers/cartController');

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart)
  .put(protect, updateCart);

router.route('/:id')  // Change to item ID instead of product ID
  .delete(protect, removeFromCart)
  .put(protect, updateCartItem);

module.exports = router;