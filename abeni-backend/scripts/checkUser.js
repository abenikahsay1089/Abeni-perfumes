const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const User = require('../models/User');

const checkUser = async () => {
  try {
    const email = 'abinikahsay6@gmail.com';
    
    console.log(`🔍 Checking user: ${email}`);
    
    // Find the user by email with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found!');
    console.log(`👤 Name: ${user.firstName} ${user.lastName}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`👑 Role: ${user.role}`);
    console.log(`🔐 Password hash exists: ${!!user.password}`);
    console.log(`✉️ Email verified: ${user.isEmailVerified}`);
    console.log(`🟢 Is active: ${user.isActive}`);
    console.log(`📅 Created: ${user.createdAt}`);
    console.log(`🔑 Permissions:`, user.permissions);
    
    // Test password verification
    const bcrypt = require('bcryptjs');
    const testPassword = 'admin123456';
    const passwordMatch = await bcrypt.compare(testPassword, user.password);
    console.log(`🔓 Password 'admin123456' matches: ${passwordMatch}`);
    
  } catch (error) {
    console.error('❌ Error checking user:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
checkUser();
