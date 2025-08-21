const mongoose = require('mongoose');
const DiscountCode = require('./models/DiscountCode');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abeni-perfumes')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Create the WELCOME15 discount code
const createWelcomeDiscountCode = async () => {
  try {
    // Check if WELCOME15 code already exists
    const existingCode = await DiscountCode.findOne({ code: 'WELCOME15' });
    
    if (existingCode) {
      console.log('🔄 WELCOME15 discount code already exists, updating...');
      
      // Update existing code
      existingCode.description = 'Welcome discount for newsletter subscribers - 15% off first order';
      existingCode.discountType = 'percentage';
      existingCode.discountValue = 15;
      existingCode.minimumOrderAmount = 500; // Minimum 500 ETB order
      existingCode.maximumDiscount = 1000; // Maximum 1000 ETB discount
      existingCode.isActive = true;
      existingCode.restrictions = {
        firstTimeOnly: true,
        newCustomersOnly: false,
        oneTimePerCustomer: true
      };
      
      await existingCode.save();
      console.log('✅ WELCOME15 discount code updated successfully');
    } else {
      // Create new WELCOME15 code
      const welcomeCode = new DiscountCode({
        code: 'WELCOME15',
        description: 'Welcome discount for newsletter subscribers - 15% off first order',
        discountType: 'percentage',
        discountValue: 15,
        minimumOrderAmount: 500, // Minimum 500 ETB order
        maximumDiscount: 1000, // Maximum 1000 ETB discount
        usageLimit: null, // Unlimited usage (but restricted per customer)
        validFrom: new Date(),
        validUntil: null, // No expiration
        isActive: true,
        applicableCategories: ['all'],
        restrictions: {
          firstTimeOnly: true, // Only for newsletter subscribers
          newCustomersOnly: false,
          oneTimePerCustomer: true // Can only be used once per customer
        },
        createdBy: null // Will be set to admin user ID in production
      });
      
      await welcomeCode.save();
      console.log('✅ WELCOME15 discount code created successfully');
    }
    
    // Display the created/updated code
    const code = await DiscountCode.findOne({ code: 'WELCOME15' });
    console.log('\n📋 WELCOME15 Discount Code Details:');
    console.log('Code:', code.code);
    console.log('Description:', code.description);
    console.log('Discount:', `${code.discountValue}% off`);
    console.log('Minimum Order:', `${code.minimumOrderAmount} ETB`);
    console.log('Maximum Discount:', `${code.maximumDiscount} ETB`);
    console.log('First Time Only:', code.restrictions.firstTimeOnly);
    console.log('One Time Per Customer:', code.restrictions.oneTimePerCustomer);
    console.log('Active:', code.isActive);
    
  } catch (error) {
    console.error('❌ Error creating WELCOME15 discount code:', error);
  }
};

// Create additional discount codes for testing
const createAdditionalDiscountCodes = async () => {
  try {
    const additionalCodes = [
      {
        code: 'ETHIOPIAN10',
        description: '10% off Ethiopian coffee collection',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrderAmount: 1000,
        maximumDiscount: 500,
        applicableCategories: ['coffee', 'ethiopian'],
        restrictions: {
          firstTimeOnly: false,
          newCustomersOnly: false,
          oneTimePerCustomer: false
        }
      },
      {
        code: 'FLORAL20',
        description: '20% off floral fragrances',
        discountType: 'percentage',
        discountValue: 20,
        minimumOrderAmount: 800,
        maximumDiscount: 800,
        applicableCategories: ['floral', 'women'],
        restrictions: {
          firstTimeOnly: false,
          newCustomersOnly: false,
          oneTimePerCustomer: false
        }
      },
      {
        code: 'FREESHIP',
        description: 'Free shipping on orders over 2000 ETB',
        discountType: 'fixed',
        discountValue: 200, // Assuming shipping cost is 200 ETB
        minimumOrderAmount: 2000,
        maximumDiscount: 200,
        applicableCategories: ['all'],
        restrictions: {
          firstTimeOnly: false,
          newCustomersOnly: false,
          oneTimePerCustomer: false
        }
      }
    ];
    
    for (const codeData of additionalCodes) {
      const existingCode = await DiscountCode.findOne({ code: codeData.code });
      
      if (!existingCode) {
        const newCode = new DiscountCode({
          ...codeData,
          usageLimit: null,
          validFrom: new Date(),
          validUntil: null,
          isActive: true,
          createdBy: null
        });
        
        await newCode.save();
        console.log(`✅ ${codeData.code} discount code created successfully`);
      } else {
        console.log(`🔄 ${codeData.code} discount code already exists`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error creating additional discount codes:', error);
  }
};

// Main execution
const seedDiscountCodes = async () => {
  try {
    console.log('🌱 Starting discount code seeding...\n');
    
    await createWelcomeDiscountCode();
    console.log('\n' + '='.repeat(50) + '\n');
    await createAdditionalDiscountCodes();
    
    console.log('\n🎉 Discount code seeding completed successfully!');
    
    // Display all active discount codes
    const allCodes = await DiscountCode.find({ isActive: true });
    console.log(`\n📊 Total active discount codes: ${allCodes.length}`);
    
    allCodes.forEach(code => {
      console.log(`- ${code.code}: ${code.description}`);
    });
    
  } catch (error) {
    console.error('❌ Error during discount code seeding:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
};

// Run the seeder
seedDiscountCodes();
