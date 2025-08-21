const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/auth');
const { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  promoteUser,
  demoteUser,
  searchUsers
} = require('../controllers/userManagementController');

// All routes require authentication and owner role
router.use(protect);
router.use(restrictTo('owner'));

// Search route - MUST come before parameterized routes
router.get('/search', searchUsers);

// User management routes
router.route('/')
  .get(getUsers)
  .post(updateUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Role management routes
router.patch('/:id/promote', promoteUser);
router.patch('/:id/demote', demoteUser);

module.exports = router;