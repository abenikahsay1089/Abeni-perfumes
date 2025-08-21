import React from 'react';
import './ScentNotesLegend.css';

export default function ScentNotesLegend() {
  const scentFamilies = [
    { name: 'Floral', color: '#FFC0CB', notes: ['Rose', 'Jasmine', 'Lily'] },
    { name: 'Citrus', color: '#FFD700', notes: ['Lemon', 'Orange', 'Bergamot'] },
    { name: 'Woody', color: '#A0522D', notes: ['Sandalwood', 'Cedar', 'Pine'] },
    { name: 'Spicy', color: '#FF4500', notes: ['Cinnamon', 'Clove', 'Pepper'] },
    { name: 'Fresh', color: '#87CEEB', notes: ['Mint', 'Ocean', 'Green Tea'] },
  ];

  return (
    <div className="scent-notes-legend">
      <h3>Perfume Scent Families</h3>
      <div className="legend-grid">
        {scentFamilies.map(family => (
          <div key={family.name} className="legend-item">
            <div className="color-dot" style={{ '--family-color': family.color }}></div>
            <span>{family.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}