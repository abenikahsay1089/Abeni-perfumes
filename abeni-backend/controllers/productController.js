const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log('Creating product with body:', req.body);
    console.log('Uploaded file:', req.file);
    
    // Handle image upload
    let images = ['/images/perfume-hero.jpg']; // Default image
    
    if (req.file) {
      // If image was uploaded, use the uploaded file path
      images = [`/uploads/${req.file.filename}`];
      console.log('Using uploaded image:', images[0]);
    } else if (req.body.imageData) {
      // Fallback to imageData if provided
      images = [req.body.imageData];
      console.log('Using imageData:', images[0]);
    } else {
      console.log('Using default image:', images[0]);
    }

    // Parse scent notes - handle both string and array
    let scentNotes = [];
    if (req.body.scentNotes) {
      if (typeof req.body.scentNotes === 'string') {
        scentNotes = req.body.scentNotes.split(',').map(note => note.trim());
      } else if (Array.isArray(req.body.scentNotes)) {
        scentNotes = req.body.scentNotes;
      }
    }

    // Parse tags if they're JSON string
    let tags = [];
    if (req.body.tags) {
      try {
        if (typeof req.body.tags === 'string') {
          tags = JSON.parse(req.body.tags);
        } else if (Array.isArray(req.body.tags)) {
          tags = req.body.tags;
        }
      } catch (e) {
        tags = req.body.tags.split(',').map(tag => tag.trim());
      }
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      category: req.body.category,
      scentNotes: scentNotes,
      images: images,
      stock: parseInt(req.body.stock),
      sustainabilityScore: parseInt(req.body.sustainabilityScore),
      tags: tags
    });

    console.log('Product object to be saved:', product);
    
    const createdProduct = await product.save();
    console.log('Product saved successfully:', createdProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle image update
    if (req.file) {
      // If new image was uploaded, use the uploaded file path
      product.images = [`/uploads/${req.file.filename}`];
    }

    // Parse scent notes - handle both string and array
    let scentNotes = [];
    if (req.body.scentNotes) {
      if (typeof req.body.scentNotes === 'string') {
        scentNotes = req.body.scentNotes.split(',').map(note => note.trim());
      } else if (Array.isArray(req.body.scentNotes)) {
        scentNotes = req.body.scentNotes;
      }
    }

    // Parse tags if they're JSON string
    let tags = [];
    if (req.body.tags) {
      try {
        if (typeof req.body.tags === 'string') {
          tags = JSON.parse(req.body.tags);
        } else if (Array.isArray(req.body.tags)) {
          tags = req.body.tags;
        }
      } catch (e) {
        tags = req.body.tags.split(',').map(tag => tag.trim());
      }
    }

    // Update product fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = parseFloat(req.body.price) || product.price;
    product.category = req.body.category || product.category;
    product.scentNotes = scentNotes.length > 0 ? scentNotes : product.scentNotes;
    product.stock = parseInt(req.body.stock) || product.stock;
    product.sustainabilityScore = parseInt(req.body.sustainabilityScore) || product.sustainabilityScore;
    product.tags = tags.length > 0 ? tags : product.tags;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
    
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};