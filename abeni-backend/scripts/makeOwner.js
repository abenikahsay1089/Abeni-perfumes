const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('../models/User');

const makeOwner = async () => {
  try {
    console.log('🔍 Looking for user: abinikahsay6@gmail.com');
    
    // Find the user by email
    const user = await User.findOne({ email: 'abinikahsay6@gmail.com' });
    
    if (!user) {
      console.log('❌ User not found with email: abinikahsay6@gmail.com');
      return;
    }
    
    console.log(`✅ Found user: ${user.firstName || 'N/A'} ${user.lastName || 'N/A'}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Current role: ${user.role}`);
    
    // Check if user is already owner
    if (user.role === 'owner') {
      console.log('🎉 User is already an owner!');
      return;
    }
    
    // Set default firstName and lastName if they don't exist
    if (!user.firstName) {
      user.firstName = 'Owner';
      console.log('📝 Setting default firstName: Owner');
    }
    
    if (!user.lastName) {
      user.lastName = 'Admin';
      console.log('📝 Setting default lastName: Admin');
    }
    
    // Update user to owner
    user.role = 'owner';
    user.permissions = {
      canManageProducts: true,
      canManageUsers: true,
      canManageOrders: true,
      canViewAnalytics: true
    };
    
    // Save the updated user
    await user.save();
    
    console.log('✅ Successfully updated user to owner!');
    console.log(`👑 New role: ${user.role}`);
    console.log(`🔑 Permissions: ${JSON.stringify(user.permissions, null, 2)}`);
    console.log(`👤 Name: ${user.firstName} ${user.lastName}`);
    
  } catch (error) {
    console.error('❌ Error updating user:', error);
    
    // If validation fails, try a different approach
    if (error.name === 'ValidationError') {
      console.log('🔄 Trying alternative update method...');
      try {
        // Use findOneAndUpdate to bypass validation
        const updatedUser = await User.findOneAndUpdate(
          { email: 'abinikahsay6@gmail.com' },
          {
            $set: {
              role: 'owner',
              firstName: 'Owner',
              lastName: 'Admin',
              permissions: {
                canManageProducts: true,
                canManageUsers: true,
                canManageOrders: true,
                canViewAnalytics: true
              }
            }
          },
          { new: true, runValidators: false }
        );
        
        if (updatedUser) {
          console.log('✅ Successfully updated user to owner using alternative method!');
          console.log(`👑 New role: ${updatedUser.role}`);
          console.log(`👤 Name: ${updatedUser.firstName} ${updatedUser.lastName}`);
        }
      } catch (updateError) {
        console.error('❌ Alternative update also failed:', updateError);
      }
    }
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
makeOwner();
