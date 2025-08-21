const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const User = require('../models/User');

const resetPassword = async () => {
  try {
    const email = 'abinikahsay6@gmail.com';
    const newPassword = 'admin123456'; // Change this to your desired password
    
    console.log(`🔍 Looking for user: ${email}`);
    
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log(`✅ Found user: ${user.firstName} ${user.lastName}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Role: ${user.role}`);
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update the password directly in the database
    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    
    console.log('✅ Password updated successfully!');
    console.log(`🔑 New password: ${newPassword}`);
    console.log('⚠️  Please change this password after logging in!');
    
  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
resetPassword();
