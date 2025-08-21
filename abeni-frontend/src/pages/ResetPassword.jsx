import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import '../App.css';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErr('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setErr('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setMsg('');
    setErr('');
    
    try {
      const { data } = await apiClient.post('/auth/reset-password', { token, newPassword: password });
      setMsg(data.message || 'Password updated successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErr(err.response?.data?.error || 'Could not reset password. Link may be expired.');
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
            <p>Set your new password.</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-subtitle">Enter your new password below.</p>
          </div>

          {msg && <div className="auth-alert" style={{ background: '#ecfdf5', color: '#047857' }}>{msg}</div>}
          {err && <div className="auth-alert auth-alert-error">{err}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="label">New Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter new password"
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="Confirm new password"
                minLength="6"
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Updating...' : 'Update Password'}
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
