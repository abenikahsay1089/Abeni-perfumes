import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import '../App.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // Store Settings
    storeName: 'Abeni Perfumes',
    storeDescription: 'Handcrafted Ethiopian fragrances with sustainability at heart',
    storeEmail: 'info@abeniperfumes.com',
    storePhone: '+251 911 123 456',
    storeAddress: 'Addis Ababa, Ethiopia',
    
    // Business Settings
    currency: 'USD',
    taxRate: 15,
    shippingCost: 5.99,
    freeShippingThreshold: 50,
    
    // Email Settings
    emailService: 'gmail',
    emailUsername: '',
    emailPassword: '',
    emailFrom: '',
    
    // Social Media
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
    
    // Analytics
    googleAnalyticsId: '',
    facebookPixelId: '',
    
    // Security
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireEmailVerification: true,
    requireTwoFactor: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, you would save these to the database
      // For now, we'll simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      setSettings({
        storeName: 'Abeni Perfumes',
        storeDescription: 'Handcrafted Ethiopian fragrances with sustainability at heart',
        storeEmail: 'info@abeniperfumes.com',
        storePhone: '+251 911 123 456',
        storeAddress: 'Addis Ababa, Ethiopia',
        currency: 'USD',
        taxRate: 15,
        shippingCost: 5.99,
        freeShippingThreshold: 50,
        emailService: 'gmail',
        emailUsername: '',
        emailPassword: '',
        emailFrom: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        maintenanceMode: false,
        maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
        googleAnalyticsId: '',
        facebookPixelId: '',
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        requireEmailVerification: true,
        requireTwoFactor: false
      });
      setSuccess('Settings reset to defaults!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="system-settings">
      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="settings-header">
        <h2>System Settings</h2>
        <p>Configure system-wide settings and preferences</p>
      </div>

      <div className="settings-container">
        {/* Settings Navigation */}
        <div className="settings-nav">
          <button
            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            🏪 General
          </button>
          <button
            className={`nav-item ${activeTab === 'business' ? 'active' : ''}`}
            onClick={() => setActiveTab('business')}
          >
            💼 Business
          </button>
          <button
            className={`nav-item ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            📧 Email
          </button>
          <button
            className={`nav-item ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            🌐 Social Media
          </button>
          <button
            className={`nav-item ${activeTab === 'maintenance' ? 'active' : ''}`}
            onClick={() => setActiveTab('maintenance')}
          >
            🔧 Maintenance
          </button>
          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
          <button
            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="settings-section">
                <h3>General Store Settings</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="storeName">Store Name *</label>
                    <input
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={settings.storeName}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="storeEmail">Store Email *</label>
                    <input
                      type="email"
                      id="storeEmail"
                      name="storeEmail"
                      value={settings.storeEmail}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="storeDescription">Store Description</label>
                  <textarea
                    id="storeDescription"
                    name="storeDescription"
                    value={settings.storeDescription}
                    onChange={handleChange}
                    rows="3"
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="storePhone">Store Phone</label>
                    <input
                      type="tel"
                      id="storePhone"
                      name="storePhone"
                      value={settings.storePhone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="storeAddress">Store Address</label>
                    <input
                      type="text"
                      id="storeAddress"
                      name="storeAddress"
                      value={settings.storeAddress}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div className="settings-section">
                <h3>Business & Financial Settings</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="currency">Currency</label>
                    <select
                      id="currency"
                      name="currency"
                      value={settings.currency}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="ETB">ETB (ብር)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="taxRate">Tax Rate (%)</label>
                    <input
                      type="number"
                      id="taxRate"
                      name="taxRate"
                      value={settings.taxRate}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.1"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shippingCost">Standard Shipping Cost</label>
                    <input
                      type="number"
                      id="shippingCost"
                      name="shippingCost"
                      value={settings.shippingCost}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="freeShippingThreshold">Free Shipping Threshold</label>
                    <input
                      type="number"
                      id="freeShippingThreshold"
                      name="freeShippingThreshold"
                      value={settings.freeShippingThreshold}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="settings-section">
                <h3>Email Configuration</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="emailService">Email Service</label>
                    <select
                      id="emailService"
                      name="emailService"
                      value={settings.emailService}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="gmail">Gmail</option>
                      <option value="outlook">Outlook</option>
                      <option value="yahoo">Yahoo</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="mailgun">Mailgun</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailUsername">Email Username</label>
                    <input
                      type="text"
                      id="emailUsername"
                      name="emailUsername"
                      value={settings.emailUsername}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="emailPassword">Email Password/API Key</label>
                    <input
                      type="password"
                      id="emailPassword"
                      name="emailPassword"
                      value={settings.emailPassword}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailFrom">From Email Address</label>
                    <input
                      type="email"
                      id="emailFrom"
                      name="emailFrom"
                      value={settings.emailFrom}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Settings */}
            {activeTab === 'social' && (
              <div className="settings-section">
                <h3>Social Media Links</h3>
                <div className="form-group">
                  <label htmlFor="facebookUrl">Facebook URL</label>
                  <input
                    type="url"
                    id="facebookUrl"
                    name="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={handleChange}
                    placeholder="https://facebook.com/abeniperfumes"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instagramUrl">Instagram URL</label>
                  <input
                    type="url"
                    id="instagramUrl"
                    name="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={handleChange}
                    placeholder="https://instagram.com/abeniperfumes"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="twitterUrl">Twitter URL</label>
                  <input
                    type="url"
                    id="twitterUrl"
                    name="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={handleChange}
                    placeholder="https://twitter.com/abeniperfumes"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Maintenance Settings */}
            {activeTab === 'maintenance' && (
              <div className="settings-section">
                <h3>Maintenance Mode</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    Enable Maintenance Mode
                  </label>
                  <p className="help-text">When enabled, only admins can access the site</p>
                </div>

                <div className="form-group">
                  <label htmlFor="maintenanceMessage">Maintenance Message</label>
                  <textarea
                    id="maintenanceMessage"
                    name="maintenanceMessage"
                    value={settings.maintenanceMessage}
                    onChange={handleChange}
                    rows="3"
                    className="form-input"
                    placeholder="Message to display to users during maintenance"
                  />
                </div>
              </div>
            )}

            {/* Analytics Settings */}
            {activeTab === 'analytics' && (
              <div className="settings-section">
                <h3>Analytics & Tracking</h3>
                <div className="form-group">
                  <label htmlFor="googleAnalyticsId">Google Analytics ID</label>
                  <input
                    type="text"
                    id="googleAnalyticsId"
                    name="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={handleChange}
                    placeholder="G-XXXXXXXXXX"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="facebookPixelId">Facebook Pixel ID</label>
                  <input
                    type="text"
                    id="facebookPixelId"
                    name="facebookPixelId"
                    value={settings.facebookPixelId}
                    onChange={handleChange}
                    placeholder="XXXXXXXXXX"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <h3>Security Settings</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      id="sessionTimeout"
                      name="sessionTimeout"
                      value={settings.sessionTimeout}
                      onChange={handleChange}
                      min="15"
                      max="480"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxLoginAttempts">Max Login Attempts</label>
                    <input
                      type="number"
                      id="maxLoginAttempts"
                      name="maxLoginAttempts"
                      value={settings.maxLoginAttempts}
                      onChange={handleChange}
                      min="3"
                      max="10"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onChange={handleChange}
                    />
                    Require Email Verification
                  </label>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="requireTwoFactor"
                      checked={settings.requireTwoFactor}
                      onChange={handleChange}
                    />
                    Require Two-Factor Authentication
                  </label>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
              
              <button
                type="button"
                onClick={resetToDefaults}
                className="btn btn-secondary"
              >
                Reset to Defaults
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
