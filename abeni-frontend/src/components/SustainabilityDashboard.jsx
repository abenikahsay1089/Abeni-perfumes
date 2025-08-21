import React from 'react';
import './SustainabilityDashboard.css';

const metrics = [
  { value: '85%', label: 'Ethiopian-sourced ingredients', icon: '🌱' },
  { value: '120+', label: 'Local farmers supported', icon: '👨‍🌾' },
  { value: '100%', label: 'Biodegradable packaging', icon: '♻️' }
];

export default function SustainabilityDashboard() {
  return (
    <div className="sustainability-dashboard">
      <h3 className="dashboard-title">Our Sustainability Promise</h3>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
      <div className="sustainability-story">
        <p>
          We partner directly with Ethiopian farmers using fair-trade practices.
          Our packaging uses recycled materials and traditional Ethiopian basket
          weaving techniques.
        </p>
      </div>
    </div>
  );
}