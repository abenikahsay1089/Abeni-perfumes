import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>Our Fragrant Journey</h1>
          <p>Discover the essence of Abeni Perfumes</p>
        </div>
      </section>

      {/* Our Story Section */}
      <div className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010 in the heart of Addis Ababa, Abeni Perfumes was born from a passion to share Ethiopia's 
                rich aromatic heritage with the world. Our founder, Alem Tesfaye, a third-generation perfumer, combined 
                traditional Ethiopian extraction techniques with modern perfumery to create scents that tell stories.
              </p>
              <p>
                The name "Abeni" means "we asked for her, and behold, she came" in Amharic, symbolizing our belief that 
                each fragrance finds its perfect wearer through a special connection.
              </p>
              <Link to="/about/our-story" className="learn-more-btn">
                Read Our Full Story →
              </Link>
            </div>
            <div className="about-image">
              <img 
                src="/images/perfume-artisan.jpg" 
                alt="Abeni founder crafting perfumes" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="mission-section">
        <div className="container">
          <h2>Our Mission & Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>Sustainable Sourcing</h3>
              <p>We partner directly with Ethiopian farmers using ethical, fair-trade practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👐</div>
              <h3>Artisan Craftsmanship</h3>
              <p>Each perfume is handcrafted using traditional techniques passed down for generations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Cultural Preservation</h3>
              <p>We celebrate and preserve Ethiopia's aromatic heritage in every bottle.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="ingredients-section">
        <div className="container">
          <div className="ingredients-content">
            <div className="ingredients-image">
              <img 
                src="/images/ethiopian-ingredients.jpg" 
                alt="Ethiopian botanicals" 
                loading="lazy"
              />
            </div>
            <div className="ingredients-text">
              <h2>Signature Ethiopian Ingredients</h2>
              <p>Our perfumes feature rare botanicals sourced from Ethiopia's diverse ecosystems:</p>
              <ul className="ingredients-list">
                <li>
                  <strong>Gesho</strong> - A unique hop-like plant with citrusy notes
                </li>
                <li>
                  <strong>Koseret</strong> - Minty herb from the highlands
                </li>
                <li>
                  <strong>Ethiopian Rose</strong> - Grown in the Harar region
                </li>
                <li>
                  <strong>Sacred Incense</strong> (Tsenat) - Used in Ethiopian Orthodox ceremonies
                </li>
                <li>
                  <strong>Wild Coffee Blossom</strong> - From the birthplace of coffee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="about-navigation">
        <div className="container">
          <h2>Discover More</h2>
          <div className="nav-grid">
            <Link to="/about/our-story" className="nav-card">
              <div className="nav-icon">📜</div>
              <h3>Our Full Story</h3>
              <p>Journey from our founding to today</p>
            </Link>
            <Link to="/about/master-perfumers" className="nav-card">
              <div className="nav-icon">👃</div>
              <h3>Master Perfumers</h3>
              <p>Meet our scent artisans</p>
            </Link>
            <Link to="/about/sustainability" className="nav-card">
              <div className="nav-icon">♻️</div>
              <h3>Sustainability</h3>
              <p>Our environmental commitments</p>
            </Link>
            <Link to="/about/store-locations" className="nav-card">
              <div className="nav-icon">📍</div>
              <h3>Store Locations</h3>
              <p>Visit us around the world</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}