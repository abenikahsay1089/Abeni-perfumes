const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/auth');
const { upload, handleMulterError } = require('../utils/upload');

// Product routes
router.route('/')
  .get(getProducts)
  .post(protect, restrictTo('admin', 'owner'), upload.single('image'), handleMulterError, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, restrictTo('admin', 'owner'), upload.single('image'), handleMulterError, updateProduct)
  .delete(protect, restrictTo('admin', 'owner'), deleteProduct);

module.exports = router;