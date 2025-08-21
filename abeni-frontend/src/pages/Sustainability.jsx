// src/pages/Sustainability.jsx
import React from 'react';
import '../App.css';

export default function Sustainability() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Sustainability at Abeni</h1>
        <p>Our commitment to ethical practices and environmental stewardship</p>
      </div>
      
      <div className="sustainability-content">
        <div className="sustainability-card">
          <div className="card-icon">🌱</div>
          <h2>Ethical Sourcing</h2>
          <p>We partner directly with Ethiopian farmers using fair-trade practices, ensuring they receive fair compensation for their botanicals.</p>
        </div>
        
        <div className="sustainability-card">
          <div className="card-icon">♻️</div>
          <h2>Eco-Friendly Packaging</h2>
          <p>Our bottles and packaging are made from 100% recycled materials and are fully recyclable. We use traditional Ethiopian basket-weaving techniques for gift packaging.</p>
        </div>
        
        <div className="sustainability-card">
          <div className="card-icon">💧</div>
          <h2>Water Conservation</h2>
          <p>Our production process uses a closed-loop water system that recycles 90% of water used in fragrance creation.</p>
        </div>
        
        <div className="sustainability-card">
          <div className="card-icon">🌍</div>
          <h2>Carbon Neutral</h2>
          <p>We offset 100% of our carbon emissions through reforestation projects in Ethiopia's highlands.</p>
        </div>
      </div>
      
      <div className="impact-stats">
        <div className="impact-stat">
          <h3>85%</h3>
          <p>Ethiopian-sourced ingredients</p>
        </div>
        <div className="impact-stat">
          <h3>120+</h3>
          <p>Local farmers supported</p>
        </div>
        <div className="impact-stat">
          <h3>100%</h3>
          <p>Biodegradable packaging</p>
        </div>
      </div>
    </div>
  );
}