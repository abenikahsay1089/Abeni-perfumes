const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: 'items.product',
        model: 'Product'
      });
      
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        total: 0
      });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate total
    cart.total = cart.items.reduce((total, item) => {
      return total + (item.quantity * product.price);
    }, 0);

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      item.product.toString() !== req.params.id
    );

    // Recalculate total
    cart.total = cart.items.reduce((total, item) => {
      return total + (item.quantity * item.product.price);
    }, 0);

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    console.log("Updating cart item:", req.params.id); // Debug log
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate total
    const populatedCart = await cart.populate('items.product');
    cart.total = populatedCart.items.reduce(
      (total, item) => total + (item.quantity * item.product.price),
      0
    );

    const updatedCart = await cart.save();
    res.json(updatedCart);
    
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update entire cart
const updateCart = async (req, res) => {
  try {
    const { items } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        total: 0
      });
    }
    
    // Update cart items
    cart.items = items;
    
    // Recalculate total
    if (items && items.length > 0) {
      const populatedCart = await cart.populate('items.product');
      cart.total = populatedCart.items.reduce(
        (total, item) => total + (item.quantity * item.product.price),
        0
      );
    } else {
      cart.total = 0;
    }
    
    const updatedCart = await cart.save();
    res.json(updatedCart);
    
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Make sure to export all functions
module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  updateCart
};