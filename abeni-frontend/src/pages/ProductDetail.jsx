import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import '../App.css';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Construct the full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path, construct the full URL
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    // Remove '/api' from the backend URL since images are served from the root
    const baseUrl = backendUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  // Get product data from the products hook
  const { data: allProducts = [], isLoading: productsLoading } = useProducts();

  useEffect(() => {
    console.log('ProductDetail useEffect triggered:', {
      productId,
      allProducts: allProducts.length,
      productsLoading,
      foundProduct: allProducts.find(p => p._id === productId)
    });
    
    if (productsLoading) return;
    
    // Find the actual product from the shop data
    const actualProduct = allProducts.find(p => p._id === productId);
    
    if (actualProduct) {
      console.log('Product found:', actualProduct);
      // Enhance the product with additional details for the detail page
      const enhancedProduct = {
        ...actualProduct,
        // Add default values for missing fields
        originalPrice: actualProduct.originalPrice || actualProduct.price,
        longDescription: actualProduct.longDescription || actualProduct.description,
        scentFamily: actualProduct.scentFamily || "Ethiopian Heritage",
        topNotes: actualProduct.topNotes || ["Ethiopian Spices", "Natural Essences"],
        middleNotes: actualProduct.middleNotes || ["Traditional Notes", "Cultural Elements"],
        baseNotes: actualProduct.baseNotes || ["Long-lasting Base", "Ethical Ingredients"],
        concentration: actualProduct.concentration || "Eau de Parfum",
        longevity: actualProduct.longevity || "6-8 hours",
        sillage: actualProduct.sillage || "Moderate",
        volume: actualProduct.volume || "50ml",
        ingredients: actualProduct.ingredients || "Natural Essential Oils, Ethically Sourced Ingredients",
        allergens: actualProduct.allergens || "Contains natural ingredients",
        countryOfOrigin: actualProduct.countryOfOrigin || "Ethiopia",
        sustainability: actualProduct.sustainability || "Cruelty-free, Ethically sourced",
        inStock: actualProduct.inStock !== undefined ? actualProduct.inStock : true,
        stockCount: actualProduct.stockCount || 10,
        ratings: actualProduct.ratings || {
          average: 4.5,
          count: 25,
          reviews: [
            {
              id: 1,
              user: "Customer",
              rating: 5,
              comment: "Beautiful fragrance that captures the essence of Ethiopia!",
              date: "2024-01-15"
            }
          ]
        },
        // Generate related products from the same category
        relatedProducts: allProducts
          .filter(p => p._id !== productId && p.category === actualProduct.category)
          .slice(0, 2)
          .map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            image: p.images?.[0] || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center'
          }))
      };
      
      setProduct(enhancedProduct);
      setSelectedSize(enhancedProduct.volume);
      setLoading(false);
    } else {
      console.log('Product not found. Available products:', allProducts.map(p => ({ id: p._id, name: p.name })));
      setError(new Error('Product not found'));
      setLoading(false);
    }
  }, [productId, allProducts, productsLoading]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, quantity);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (loading || productsLoading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading perfume details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the perfume you're looking for.</p>
        <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/shop')} className="breadcrumb-link">
            Shop
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images-section">
            <div className="main-image">
              <img 
                src={getImageUrl(product.images[0])} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center';
                }}
              />
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <div key={index} className="thumbnail">
                  <img 
                    src={getImageUrl(image)} 
                    alt={`${product.name} view ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop&crop=center';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-brand">{product.brand}</p>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(product.ratings.average) ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.ratings.average} ({product.ratings.count} reviews)
                </span>
              </div>
            </div>

            <div className="product-pricing">
                           <span className="current-price">${product.price.toFixed(2)}</span>
               {product.originalPrice > product.price && (
                 <span className="original-price">${product.originalPrice.toFixed(2)}</span>
               )}
               <span className="discount-badge">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-options">
                <button
                  className={`size-option ${selectedSize === product.volume ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(product.volume)}
                >
                  {product.volume}
                </button>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  −
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="add-to-cart-section">
              <button 
                onClick={handleAddToCart}
                className="add-to-cart-btn"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <p className="stock-info">
                {product.inStock ? `${product.stockCount} in stock` : 'Currently unavailable'}
              </p>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🌿</span>
                <span>Natural Ingredients</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🕯️</span>
                <span>Long-lasting (8-10 hours)</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <span>Ethically Sourced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="product-details-tabs">
          <div className="tab-content">
            <div className="tab-section">
              <h3>Fragrance Notes</h3>
              <div className="notes-breakdown">
                <div className="note-category">
                  <h4>Top Notes</h4>
                  <p>{product.topNotes.join(', ')}</p>
                </div>
                <div className="note-category">
                  <h4>Middle Notes</h4>
                  <p>{product.middleNotes.join(', ')}</p>
                </div>
                <div className="note-category">
                  <h4>Base Notes</h4>
                  <p>{product.baseNotes.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="tab-section">
              <h3>Product Details</h3>
              <div className="product-specs">
                <div className="spec-row">
                  <span className="spec-label">Concentration:</span>
                  <span className="spec-value">{product.concentration}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Longevity:</span>
                  <span className="spec-value">{product.longevity}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Sillage:</span>
                  <span className="spec-value">{product.sillage}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Scent Family:</span>
                  <span className="spec-value">{product.scentFamily}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Country of Origin:</span>
                  <span className="spec-value">{product.countryOfOrigin}</span>
                </div>
              </div>
            </div>

            <div className="tab-section">
              <h3>Ingredients & Safety</h3>
              <div className="ingredients-info">
                <p><strong>Ingredients:</strong> {product.ingredients}</p>
                <p><strong>Allergens:</strong> {product.allergens}</p>
                <p><strong>Sustainability:</strong> {product.sustainability}</p>
              </div>
            </div>

            <div className="tab-section">
              <h3>Customer Reviews</h3>
              <div className="reviews-section">
                {product.ratings.reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.user}</span>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h3>You Might Also Like</h3>
          <div className="related-products-grid">
            {product.relatedProducts.map(related => (
              <div key={related._id} className="related-product-card" onClick={() => navigate(`/product/${related._id}`)}>
                                 <img 
                   src={related.image} 
                   alt={related.name}
                   onError={(e) => {
                     e.target.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center';
                   }}
                 />
                <h4>{related.name}</h4>
                                 <p className="related-price">${related.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
