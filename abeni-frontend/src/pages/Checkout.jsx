import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DiscountCodeInput from '../components/DiscountCodeInput';
import '../App.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Ethiopia'
  });
  
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [finalTotal, setFinalTotal] = useState(cartTotal);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Update final total when discount changes
  useEffect(() => {
    if (appliedDiscount) {
      setFinalTotal(cartTotal - appliedDiscount.discountAmount);
    } else {
      setFinalTotal(cartTotal);
    }
  }, [appliedDiscount, cartTotal]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDiscountApplied = (discount) => {
    setAppliedDiscount(discount);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If discount code was used, mark it as applied
      if (appliedDiscount) {
        try {
          await fetch('/api/newsletter/apply-discount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: appliedDiscount.code,
              orderId: `ORDER-${Date.now()}`,
              customerEmail: formData.email
            }),
          });
        } catch (error) {
          console.error('Failed to mark discount code as used:', error);
        }
      }

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderNumber: `ORDER-${Date.now()}`,
          total: finalTotal,
          discount: appliedDiscount
        }
      });
      
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ submit: 'Failed to process order. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="checkout-content">
          {/* Checkout Form */}
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                    required
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                    required
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  required
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    required
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={errors.postalCode ? 'error' : ''}
                    required
                  />
                  {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {errors.submit && (
                <div className="form-error">
                  <span className="error-icon">⚠️</span>
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="loading-spinner"></span>
                    Processing Order...
                  </>
                ) : (
                  `Place Order - $${finalTotal.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {cart.map(item => (
                <div key={item.productId} className="order-item">
                  <div className="item-image">
                    <img 
                      src={item.image || '/images/perfume-placeholder.jpg'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/images/perfume-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Code Input */}
            <DiscountCodeInput
              onDiscountApplied={handleDiscountApplied}
              orderTotal={cartTotal}
              customerEmail={formData.email}
            />

            {/* Order Totals */}
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                                 <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              {appliedDiscount && (
                <div className="total-row discount">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span>-${appliedDiscount.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="total-row final-total">
                <span>Total</span>
                                 <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="order-notes">
              <p>💡 <strong>Newsletter subscribers</strong> get a unique personal code in their welcome email</p>
              <p>📦 Free shipping on all orders within Ethiopia</p>
              <p>🔄 30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
