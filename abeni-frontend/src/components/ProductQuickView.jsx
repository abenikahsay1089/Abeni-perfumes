import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ARTryOn from './ARTryOn';

export default function ProductQuickView({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'auto';
  }, []);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose();
  };

  return (
    <div className="quick-view-overlay">
      <div className="quick-view-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <div className="quick-view-content">
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="product-image"
              />
            </div>
            <div className="thumbnail-grid">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-details">
            <h2>{product.name}</h2>
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < product.rating ? 'star-filled' : 'star-empty'}>★</span>
              ))}
              <span className="review-count">({product.reviews} reviews)</span>
            </div>
            <p className="description">{product.description}</p>
            
            <div className="scent-notes">
              <h4>Key Notes:</h4>
              <div className="notes-grid">
                {product.notes.map((note, i) => (
                  <span key={i} className="note-badge">{note}</span>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              <ARTryOn productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}