import React, { useState } from 'react';
import '../App.css';

export default function DiscountCodeInput({ 
  onDiscountApplied, 
  orderTotal, 
  customerEmail,
  disabled = false 
}) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter a discount code');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/newsletter/validate-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: code.trim(), 
          orderTotal,
          customerEmail 
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
                 setSuccess(`Discount code applied! You saved $${result.data.discountAmount}`);
        setAppliedDiscount(result.data);
        
        // Notify parent component
        if (onDiscountApplied) {
          onDiscountApplied(result.data);
        }
        
        // Clear the input
        setCode('');
        
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid discount code');
        setAppliedDiscount(null);
      }
    } catch (err) {
      console.error('Discount code validation error:', err);
      setError('Network error. Please try again.');
      setAppliedDiscount(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setSuccess('');
    setError('');
    
    // Notify parent component
    if (onDiscountApplied) {
      onDiscountApplied(null);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    if (error) setError('');
    if (success) setSuccess('');
  };

  return (
    <div className="discount-code-container">
      <h4 className="discount-code-title">Have a discount code?</h4>
      
      {appliedDiscount ? (
        <div className="discount-applied">
          <div className="discount-success">
            <span className="success-icon">✅</span>
            <div className="discount-details">
              <strong>{appliedDiscount.code}</strong> applied successfully!
              <div className="discount-amount">
                You saved: <strong>${appliedDiscount.discountAmount}</strong>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="remove-discount-btn"
            onClick={handleRemoveDiscount}
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="discount-form">
          <div className="discount-input-group">
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter discount code"
              className="discount-input"
              disabled={disabled || isLoading}
              maxLength="20"
            />
            <button
              type="submit"
              className="apply-discount-btn"
              disabled={disabled || isLoading || !code.trim()}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Applying...
                </>
              ) : (
                'Apply'
              )}
            </button>
          </div>
          
          {error && (
            <div className="discount-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          {success && (
            <div className="discount-success-message">
              <span className="success-icon">✅</span>
              {success}
            </div>
          )}
        </form>
      )}
      
      <div className="discount-info">
        <p className="discount-tip">
          💡 <strong>Newsletter subscribers</strong> get a unique personal code in their welcome email
        </p>
        <p className="discount-note">
          Each personal code can only be used once per customer. Discount codes cannot be combined.
        </p>
      </div>
    </div>
  );
}
