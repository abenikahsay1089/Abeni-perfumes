import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, compact = false, showAdminControls = false, onDelete, onEdit }) {
  const { addToCart } = useCart();
  
  // Construct the full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center';
    
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
  
  // Handle missing images
  const imageUrl = getImageUrl(product.images?.[0]);
  
  // Debug logging
  console.log(`ProductCard for "${product.name}":`, {
    productId: product._id,
    images: product.images,
    imageUrl: imageUrl,
    backendUrl: import.meta.env.VITE_API_BASE_URL,
    baseUrl: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace('/api', ''),
    product: product
  });
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      try {
        await onDelete(product._id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(product);
    }
  };
  
  return (
    <div className={`product-card ${compact ? 'compact' : ''}`}>
      <div className="product-image-container">
        <Link to={`/product/${product._id}`}>
          <img 
            src={imageUrl} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center';
            }}
          />
        </Link>
        
        {/* Admin/Owner Controls - Only shown when explicitly enabled */}
        {showAdminControls && (
          <div className="admin-controls">
            <button 
              className="edit-btn"
              onClick={handleEdit}
              title="Edit Product"
            >
              ✏️
            </button>
            <button 
              className="delete-btn"
              onClick={handleDelete}
              title="Delete Product"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      
      <div className="product-details">
        <Link to={`/product/${product._id}`} className="product-title">
          <h3>{product.name}</h3>
        </Link>
        
        {!compact && (
          <p className="product-description">{product.description}</p>
        )}
        
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}