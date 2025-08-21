// abeni-frontend/src/pages/ResendVerification.jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../api/client';
import '../App.css';

export default function ResendVerification() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErr('');
    try {
      const { data } = await apiClient.post('/auth/resend-verification', { email });
      setMsg(data.message || 'If an account exists, a verification email has been sent.');
    } catch (e) {
      setErr(e.response?.data?.error || 'Could not resend verification email.');
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
            <p>We’ll send you a new verification link.</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Resend Verification Email</h2>
            <p className="auth-subtitle">Enter your email address below.</p>
          </div>

          {msg && <div className="auth-alert" style={{ background: '#ecfdf5', color: '#047857' }}>{msg}</div>}
          {err && <div className="auth-alert auth-alert-error">{err}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="label">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Sending…' : 'Send Verification Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}