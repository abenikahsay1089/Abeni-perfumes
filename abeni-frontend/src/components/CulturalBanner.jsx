import React from 'react';
import { Link } from 'react-router-dom';
import './CulturalBanner.css';

export default function CulturalBanner() {
  return (
    <div className="cultural-banner">
      <div className="cultural-image">
        <img 
          src="/images/ethiopian-coffee-ceremony.jpg" 
          alt="Traditional Ethiopian coffee ceremony"
          loading="lazy"
        />
      </div>
      <div className="cultural-text">
        <h3>Rooted in Ethiopian Heritage</h3>
        <ul className="cultural-features">
          <li>☕ Buna coffee ceremony inspired scents</li>
          <li>🕯️ Sacred incense (Tsenat) accords</li>
          <li>🌿 Traditional herbal blends</li>
        </ul>
        <Link to="/about" className="learn-more-btn">
          Discover Our Story →
        </Link>
      </div>
    </div>
  );
}