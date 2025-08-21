require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/abeni';

const products = [
  {
    name: 'Ethiopian Floral Essence',
    description: 'A bouquet of Ethiopian roses with bright citrus top notes.',
    price: 79,
    category: 'women',
    scentNotes: ['rose', 'citrus', 'musk'],
    images: ['/images/women-floral.jpg'],
    stock: 50,
    sustainabilityScore: 8,
    tags: ['floral', 'fresh']
  },
  {
    name: 'Coffee Ceremony Noir',
    description: 'Dark roasted coffee, cardamom and vanilla base.',
    price: 92,
    category: 'men',
    scentNotes: ['coffee', 'cardamom', 'vanilla'],
    images: ['/images/coffee-perfume.jpg'],
    stock: 40,
    sustainabilityScore: 7,
    tags: ['spicy', 'woody']
  },
  {
    name: 'Highlands Woody Trail',
    description: 'Cedarwood, vetiver and frankincense.',
    price: 88,
    category: 'men',
    scentNotes: ['cedar', 'vetiver', 'frankincense'],
    images: ['/images/men-woody.jpg'],
    stock: 35,
    sustainabilityScore: 9,
    tags: ['woody', 'fresh']
  },
  {
    name: 'Addis Fruity Bloom',
    description: 'Juicy berries with jasmine and amber.',
    price: 75,
    category: 'women',
    scentNotes: ['berry', 'jasmine', 'amber'],
    images: ['/images/women-fruity.jpg'],
    stock: 60,
    sustainabilityScore: 6,
    tags: ['fruity', 'floral']
  },
  {
    name: 'Spiced Highlands',
    description: 'Pepper, clove and warm woods.',
    price: 85,
    category: 'men',
    scentNotes: ['pepper', 'clove', 'woods'],
    images: ['/images/men-spicy.jpg'],
    stock: 45,
    sustainabilityScore: 7,
    tags: ['spicy']
  },
  {
    name: 'Woody Collection Classic',
    description: 'Rich sandalwood with smoky undertones.',
    price: 89,
    category: 'unisex',
    scentNotes: ['sandalwood', 'smoke', 'resin'],
    images: ['/images/woody-collection.jpg'],
    stock: 30,
    sustainabilityScore: 8,
    tags: ['woody']
  }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB for seeding');

    // Optional: create an admin user if none exists
    const adminEmail = 'admin@abeni.local';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        email: adminEmail,
        password: 'Admin123!',
        isAdmin: true
      });
      console.log('Admin user created:', adminEmail, '(password: Admin123!)');
    } else {
      console.log('Admin user already exists:', adminEmail);
    }

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log(`Inserted ${products.length} products`);
    } else {
      console.log(`Products already exist (${count}), skipping insert`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
