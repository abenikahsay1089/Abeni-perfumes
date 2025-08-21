import { useState } from 'react';
import '../App.css';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter a valid email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.data && result.data.alreadySubscribed) {
          // User is already subscribed
          setError('This email is already subscribed to our newsletter!');
        } else {
          // New subscription or welcome email sent
          setIsSubscribed(true);
          setShowSuccess(true);
          setEmail('');
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccess(false);
            setIsSubscribed(false);
          }, 5000);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="newsletter-container">
      <h3>Join Our Fragrance Journey</h3>
      <p>Get 15% off your first order and exclusive access to new scents</p>
      
      {showSuccess ? (
        <div className="newsletter-success">
          <div className="success-icon">✅</div>
          <h4>Welcome to Abeni Perfumes!</h4>
          <p>Thank you for subscribing! We've sent a confirmation email to <strong>{email}</strong>.</p>
          <p className="success-details">
            Check your inbox for your exclusive personal discount code and updates about our latest Ethiopian-inspired fragrances.
          </p>
          <p className="success-note">💡 Each subscriber gets a unique code that can only be used once.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              required
              className={`newsletter-input ${error ? 'error' : ''}`}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className={`newsletter-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          {error && (
            <div className="newsletter-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          <div className="newsletter-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🎁</span>
              <span>15% off first order</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🌺</span>
              <span>Early access to new scents</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📧</span>
              <span>Exclusive offers & updates</span>
            </div>
          </div>
          
          <p className="newsletter-privacy">
            By subscribing, you agree to receive marketing emails from Abeni Perfumes. 
            You can unsubscribe at any time. View our{' '}
            <a href="/privacy-policy" className="privacy-link">Privacy Policy</a>.
          </p>
        </form>
      )}
    </div>
  );
}