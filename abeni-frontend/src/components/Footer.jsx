import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Abeni Perfumes</h3>
          <p className="brand-description">
            Bringing Ethiopia's aromatic heritage to the world through 
            exquisite, handcrafted fragrances.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="social-icon" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-links-container">
          <div className="footer-links-column">
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><Link to="/shop">All Fragrances</Link></li>
              <li><Link to="/shop?category=women">Women's Collection</Link></li>
              <li><Link to="/shop?category=men">Men's Collection</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>Help</h4>
            <ul className="footer-links">
              <li><Link to="/shipping-returns">Shipping & Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>About</h4>
            <ul className="footer-links">
              <li><Link to="/about/our-story">Our Story</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/stores">Store Locations</Link></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} Abeni Perfumes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}