import React from 'react';
import '../App.css';

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="page-content">
          <section>
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
            <ul>
              <li><strong>Account Information:</strong> Username, email address, and password</li>
              <li><strong>Order Information:</strong> Billing and shipping addresses, payment information</li>
              <li><strong>Communication:</strong> Messages you send to us</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our services and website</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except as described in this policy or with your consent.</p>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@abeniperfumes.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
