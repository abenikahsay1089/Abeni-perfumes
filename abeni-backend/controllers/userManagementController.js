const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json({
        success: true,
        data: user
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update user fields
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.email) user.email = req.body.email;
    if (req.body.isActive !== undefined) user.isActive = req.body.isActive;

    const updatedUser = await user.save();
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Prevent deleting owners
    if (user.role === 'owner') {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot delete owner accounts' 
      });
    }

    await user.deleteOne();
    res.json({ 
      success: true, 
      message: 'User removed' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Promote user to admin
const promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Only promote users, not admins or owners
    if (user.role !== 'user') {
      return res.status(400).json({ 
        success: false, 
        message: 'Can only promote regular users to admin' 
      });
    }

    user.role = 'admin';
    const updatedUser = await user.save();
    
    res.json({
      success: true,
      message: `${updatedUser.firstName} ${updatedUser.lastName} has been promoted to Admin`,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Demote admin to user
const demoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Only demote admins, not users or owners
    if (user.role !== 'admin') {
      return res.status(400).json({ 
        success: false, 
        message: 'Can only demote admins to regular users' 
      });
    }

    user.role = 'user';
    const updatedUser = await user.save();
    
    res.json({
      success: true,
      message: `${updatedUser.firstName} ${updatedUser.lastName} has been demoted to User`,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Search users by email
const searchUsers = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email || email.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Email search requires at least 3 characters'
      });
    }

    // Case-insensitive email search
    const users = await User.find({
      email: { $regex: email.trim(), $options: 'i' }
    }).select('-password').limit(50); // Limit results to prevent abuse
    
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  promoteUser,
  demoteUser,
  searchUsers
};
