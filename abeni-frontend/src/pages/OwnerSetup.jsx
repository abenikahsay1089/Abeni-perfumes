import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function OwnerSetup() {
  const navigate = useNavigate();
  const { register, checkOwnerExists } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ownerExists, setOwnerExists] = useState(false);

  useEffect(() => {
    checkOwnerStatus();
  }, []);

  const checkOwnerStatus = async () => {
    const exists = await checkOwnerExists();
    setOwnerExists(exists);
    
    if (exists) {
      navigate('/login');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const result = await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      if (result.success) {
        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (ownerExists) {
    return null; // Will redirect to login
  }

  return (
    <div className="owner-setup-page">
      <div className="setup-container">
        <div className="setup-header">
          <h1>🏢 Abeni Perfumes - Owner Setup</h1>
          <p>Welcome! Let's set up your owner account to get started.</p>
        </div>

        <div className="setup-form-container">
          <form onSubmit={handleSubmit} className="setup-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
                className="setup-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
                className="setup-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                className="setup-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                required
                minLength="8"
                className="setup-input"
              />
              <small className="password-hint">
                Password must be at least 8 characters long
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                className="setup-input"
              />
            </div>

            {error && (
              <div className="setup-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="setup-submit-btn"
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Setting up account...
                </>
              ) : (
                'Create Owner Account'
              )}
            </button>
          </form>
        </div>

        <div className="setup-info">
          <h3>🎯 What happens next?</h3>
          <ul>
            <li>✅ Your owner account will be created with full system access</li>
            <li>🔐 You'll be automatically logged in and redirected to the admin dashboard</li>
            <li>👥 You can then create admin users to help manage your perfume business</li>
            <li>🛍️ Admins can add, edit, and manage perfume products</li>
            <li>⚙️ Only you (the owner) can create or remove admin accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
