import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section 
      className="hero-section"
      style={{ 
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), 
                    url('/images/perfume-hero.jpg') center/cover no-repeat,
                    #f5e9dc`
      }}
    >
      <div className="hero-content">
        <h1>Discover Ethiopian Luxury Scents</h1>
        <p className="hero-subtitle">
          Handcrafted perfumes inspired by ancient Ethiopian traditions
        </p>
        <Link to="/shop" className="shop-now-btn">
          Explore Collection
        </Link>
      </div>
    </section>
  );
}