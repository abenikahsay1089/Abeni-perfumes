import React from 'react';
import '../App.css';

export default function CookiePolicy() {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Cookie Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="page-content">
          <section>
            <h2>What Are Cookies</h2>
            <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and allow certain features to work properly.</p>
          </section>

          <section>
            <h2>How We Use Cookies</h2>
            <p>We use cookies for several purposes:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2>Types of Cookies We Use</h2>
            <h3>Session Cookies</h3>
            <p>These cookies are temporary and are deleted when you close your browser. They help maintain your session while browsing our website.</p>
            
            <h3>Persistent Cookies</h3>
            <p>These cookies remain on your device for a set period and help us remember your preferences for future visits.</p>
          </section>

          <section>
            <h2>Managing Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul>
              <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
              <li>Third-party tools: Use browser extensions to manage cookies</li>
              <li>Contact us: Reach out if you have specific cookie preferences</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>If you have questions about our Cookie Policy, please contact us at cookies@abeniperfumes.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
