const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const User = require('../models/User');

const verifyEmail = async () => {
  try {
    const email = 'abinikahsay6@gmail.com';
    
    console.log(`🔍 Verifying email for: ${email}`);
    
    // Update the user to mark email as verified
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { 
        $set: { 
          isEmailVerified: true,
          isActive: true 
        } 
      },
      { new: true }
    );
    
    if (!updatedUser) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ Email verification updated successfully!');
    console.log(`👤 User: ${updatedUser.firstName} ${updatedUser.lastName}`);
    console.log(`📧 Email: ${updatedUser.email}`);
    console.log(`✉️ Email verified: ${updatedUser.isEmailVerified}`);
    console.log(`🟢 Is active: ${updatedUser.isActive}`);
    console.log(`👑 Role: ${updatedUser.role}`);
    
    console.log('\n🎉 You can now login with:');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: admin123456`);
    
  } catch (error) {
    console.error('❌ Error verifying email:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
verifyEmail();
