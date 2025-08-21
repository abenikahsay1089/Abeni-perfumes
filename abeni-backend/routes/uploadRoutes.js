const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/auth');
const { uploadImage } = require('../controllers/uploadController');
const { upload, handleMulterError } = require('../utils/upload');

// Upload single image (for admin/owner use)
router.post('/', 
  protect, 
  restrictTo('admin', 'owner'), 
  upload.single('image'), 
  handleMulterError,
  uploadImage
);

// Test upload endpoint (for debugging)
router.post('/test', 
  upload.single('image'), 
  handleMulterError,
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      res.json({ 
        success: true, 
        message: 'Test upload successful',
        file: {
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype,
          originalname: req.file.originalname
        }
      });
    } catch (error) {
      console.error('Test upload error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;