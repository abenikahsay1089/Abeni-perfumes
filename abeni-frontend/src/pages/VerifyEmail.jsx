import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../api/client';
import '../App.css';

export default function VerifyEmail() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from URL params or localStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromParams = params.get('email');
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !code) {
      setStatus('error');
      setMsg('Please enter both email and verification code');
      return;
    }

    if (code.length !== 6) {
      setStatus('error');
      setMsg('Please enter a 6-digit verification code');
      return;
    }

    setLoading(true);
    setStatus('verifying');
    setMsg('Verifying your code...');

    try {
      const { data } = await apiClient.post('/auth/verify-email', { email, code });
      
      setStatus('success');
      setMsg(data.message || 'Email verified successfully! You can now log in.');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Verification failed. Please check your code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setStatus('error');
      setMsg('Please enter your email address first');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/resend-verification', { email });
        setStatus('success');
      setMsg('New verification code sent to your email!');
      } catch (err) {
        setStatus('error');
      setMsg(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
      }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-illustration">
          <div className="auth-overlay" />
          <div className="auth-hero-text">
            <h1>Abeni Perfumes</h1>
            <p>Verify your email to get started.</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
              <h2 className="auth-title">Email Verification</h2>
            <p className="auth-subtitle">Enter the 6-digit code sent to your email</p>
          </div>
          
          {msg && (
            <div className={`auth-alert ${status === 'success' ? 'auth-alert-success' : status === 'error' ? 'auth-alert-error' : ''}`}>
              {msg}
            </div>
          )}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="code" className="label">Verification Code</label>
              <input
                id="code"
                name="code"
                type="text"
                required
                className="input"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength="6"
                pattern="[0-9]{6}"
                disabled={loading}
                style={{ 
                  textAlign: 'center', 
                  fontSize: '24px', 
                  letterSpacing: '4px',
                  fontFamily: 'monospace'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading || !email || code.length !== 6}
              style={{ width: '100%' }}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleResendCode}
              disabled={loading || !email}
              style={{ background: 'transparent', color: '#6b7280', border: '1px solid #d1d5db' }}
            >
              Resend Code
            </button>
            </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              type="button" 
              className="btn btn-link" 
              onClick={() => navigate('/login')}
              style={{ background: 'transparent', color: '#6b7280', textDecoration: 'underline' }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}