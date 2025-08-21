import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import '../App.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErr('');
    
    try {
      const { data } = await apiClient.post('/auth/forgot-password', { email });
      setMsg(data.message || 'If an account exists, a password reset email has been sent.');
    } catch (err) {
      setErr(err.response?.data?.error || 'Could not send password reset email.');
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
            <p>Reset your password securely.</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Forgot Password</h2>
            <p className="auth-subtitle">Enter your email to receive a reset link.</p>
          </div>

          {msg && <div className="auth-alert" style={{ background: '#ecfdf5', color: '#047857' }}>{msg}</div>}
          {err && <div className="auth-alert auth-alert-error">{err}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="label">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="divider"><span>or</span></div>
          
          <div className="alt-actions">
            <button className="btn btn-ghost" type="button" onClick={() => navigate('/login')}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
