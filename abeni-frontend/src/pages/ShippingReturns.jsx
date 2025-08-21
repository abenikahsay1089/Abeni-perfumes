// src/pages/ShippingReturns.jsx
import React from 'react';
import '../App.css';

export default function ShippingReturns() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Shipping & Returns</h1>
        <p>Transparent policies for a seamless shopping experience</p>
      </div>
      
      <div className="shipping-returns-grid">
        <div className="policy-card">
          <div className="card-icon">🚚</div>
          <h2>Shipping Information</h2>
          <div className="policy-details">
            <h3>Processing Time</h3>
            <p>Orders are processed within 1-2 business days</p>
            
            <h3>Domestic Shipping (Ethiopia)</h3>
            <ul>
              <li>Standard: 3-5 business days</li>
              <li>Express: 1-2 business days</li>
              <li>Free shipping on orders over $2,000</li>
            </ul>
            
            <h3>International Shipping</h3>
            <ul>
              <li>Standard: 7-14 business days</li>
              <li>Express: 3-5 business days</li>
              <li>Shipping costs calculated at checkout</li>
            </ul>
            
            <h3>Tracking</h3>
            <p>You'll receive a tracking number via email once your order ships</p>
          </div>
        </div>
        
        <div className="policy-card">
          <div className="card-icon">🔄</div>
          <h2>Return Policy</h2>
          <div className="policy-details">
            <h3>30-Day Satisfaction Guarantee</h3>
            <p>If you're not completely satisfied, return within 30 days for a full refund or exchange</p>
            
            <h3>Conditions</h3>
            <ul>
              <li>Items must be in original condition</li>
              <li>At least 50% of product remaining</li>
              <li>Original packaging included</li>
            </ul>
            
            <h3>How to Return</h3>
            <ol>
              <li>Contact us at returns@abeniperfumes.com</li>
              <li>We'll provide a return authorization number</li>
              <li>Package items securely</li>
              <li>Ship to our return center in Addis Ababa</li>
            </ol>
            
            <h3>Refund Processing</h3>
            <p>Refunds are processed within 5 business days of receiving your return</p>
          </div>
        </div>
      </div>
      
      <div className="important-notes">
        <h2>Important Notes</h2>
        <ul>
          <li>Final sale items cannot be returned</li>
          <li>Return shipping costs are the customer's responsibility</li>
          <li>Refunds exclude original shipping fees</li>
          <li>Damaged or defective items will be replaced at no cost</li>
        </ul>
      </div>
    </div>
  );
}