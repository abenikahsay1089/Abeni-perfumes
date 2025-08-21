import React from 'react';
import '../App.css';

export default function TermsOfService() {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="page-content">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using Abeni Perfumes website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2>Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Abeni Perfumes website for personal, non-commercial transitory viewing only.</p>
            <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2>Product Information</h2>
            <p>While we strive to provide accurate product information, we do not warrant that product descriptions, colors, information, or other content available on the site is accurate, complete, reliable, current, or error-free.</p>
          </section>

          <section>
            <h2>Pricing and Availability</h2>
            <p>All prices are subject to change without notice. Product availability is not guaranteed and may vary by location.</p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>In no event shall Abeni Perfumes or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at legal@abeniperfumes.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
