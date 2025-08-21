// src/pages/StoreLocations.jsx
import React from 'react';
import '../App.css';

export default function StoreLocations() {
  const locations = [
    {
      city: "Addis Ababa",
      country: "Ethiopia",
      address: "Bole Road, Millennium Hall Complex",
      hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-6PM",
      phone: "+251 11 123 4567",
      email: "addis@abeniperfumes.com",
      features: ["Flagship Store", "Perfume Bar", "Custom Blending", "Cultural Experience"],
      description: "Our flagship store in the heart of Ethiopia's capital offers the complete Abeni experience, including our signature perfume bar where you can create custom fragrances.",
      specialEvents: ["Monthly perfume-making workshops", "Cultural storytelling sessions", "Traditional coffee ceremonies"]
    },
    {
      city: "Hawassa",
      country: "Ethiopia",
      address: "Lake View Plaza, Shoreline Drive",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-5PM",
      phone: "+251 46 123 4567",
      email: "hawassa@abeniperfumes.com",
      features: ["Lake View", "Coffee Tasting", "Gift Wrapping", "Local Artisans"],
      description: "Located by the beautiful Lake Hawassa, this store celebrates the region's coffee heritage and offers unique lake-inspired fragrances.",
      specialEvents: ["Coffee and perfume pairing events", "Local artisan showcases", "Lake sunset fragrance experiences"]
    },
    {
      city: "Bahir Dar",
      country: "Ethiopia",
      address: "Papyrus Mall, Lakeside District",
      hours: "Mon-Sat: 10AM-8PM, Sun: Closed",
      phone: "+251 58 123 4567",
      email: "bahirdar@abeniperfumes.com",
      features: ["Nile Inspiration", "Handcrafted Section", "AR Experience", "Traditional Music"],
      description: "Inspired by the Blue Nile, this store features fragrances that capture the essence of Ethiopia's most sacred river and surrounding landscapes.",
      specialEvents: ["Nile-inspired fragrance launches", "Traditional music performances", "Handcrafted gift workshops"]
    },
    {
      city: "New York",
      country: "United States",
      address: "Soho District, 123 Prince Street",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
      phone: "+1 212 123 4567",
      email: "nyc@abeniperfumes.com",
      features: ["International Flagship", "Exclusive Collections", "Events Space", "VIP Services"],
      description: "Our first international location brings Ethiopian luxury to the heart of New York's fashion district, offering exclusive collections and VIP experiences.",
      specialEvents: ["Fashion week collaborations", "Celebrity fragrance launches", "International cultural festivals"]
    }
  ];

  const upcomingLocations = [
    {
      city: "London",
      country: "United Kingdom",
      expectedOpening: "Q2 2024",
      description: "Bringing Ethiopian luxury to Mayfair, London's most prestigious shopping district."
    },
    {
      city: "Dubai",
      country: "UAE",
      expectedOpening: "Q3 2024",
      description: "Our first Middle Eastern location, celebrating the region's love for luxury fragrances."
    },
    {
      city: "Mumbai",
      country: "India",
      expectedOpening: "Q4 2024",
      description: "Connecting with India's rich aromatic traditions and growing luxury market."
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Store Locations</h1>
        <p>Visit us around the world and experience Abeni fragrances in person</p>
      </div>
      
      <div className="locations-content">
        <div className="locations-intro">
          <h2>Global Presence</h2>
          <p>
            From our roots in Ethiopia to our expanding international presence, each Abeni store is designed 
            to provide an immersive experience that celebrates local culture while showcasing our signature fragrances.
          </p>
          <p>
            Every location features unique elements that reflect the local community, from traditional coffee ceremonies 
            in Ethiopia to exclusive collections in international markets.
          </p>
        </div>
        
        <div className="locations-grid">
          {locations.map((location, index) => (
            <div key={index} className="location-card-detailed">
              <div className="location-header">
                <h3>{location.city}</h3>
                <span className="location-country">{location.country}</span>
              </div>
              
              <div className="location-details">
                <div className="location-info">
                  <p className="location-address">{location.address}</p>
                  <p className="location-hours">{location.hours}</p>
                  <p className="location-phone">{location.phone}</p>
                  <p className="location-email">{location.email}</p>
                </div>
                
                <div className="location-description">
                  <p>{location.description}</p>
                </div>
                
                <div className="location-features">
                  <h4>Store Features</h4>
                  <div className="features-tags">
                    {location.features.map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                
                <div className="location-events">
                  <h4>Special Events</h4>
                  <ul>
                    {location.specialEvents.map((event, i) => (
                      <li key={i}>{event}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="location-actions">
                <button className="btn btn-primary">Get Directions</button>
                <button className="btn btn-ghost">Book Appointment</button>
                <button className="btn btn-ghost">Contact Store</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="upcoming-locations">
          <h2>Coming Soon</h2>
          <p>We're expanding our global presence to bring Abeni fragrances to more communities around the world.</p>
          <div className="upcoming-grid">
            {upcomingLocations.map((location, index) => (
              <div key={index} className="upcoming-card">
                <h3>{location.city}, {location.country}</h3>
                <p className="opening-date">Opening: {location.expectedOpening}</p>
                <p className="location-description">{location.description}</p>
                <button className="btn btn-ghost">Get Notified</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="store-experience">
          <h2>What to Expect</h2>
          <div className="experience-features">
            <div className="experience-feature">
              <div className="feature-icon">👃</div>
              <h3>Fragrance Discovery</h3>
              <p>Explore our complete collection with expert guidance from our trained staff.</p>
            </div>
            <div className="experience-feature">
              <div className="feature-icon">🎨</div>
              <h3>Custom Blending</h3>
              <p>Create your own signature fragrance using our traditional Ethiopian techniques.</p>
            </div>
            <div className="experience-feature">
              <div className="feature-icon">🌿</div>
              <h3>Ingredient Education</h3>
              <p>Learn about the rare Ethiopian botanicals that make our fragrances unique.</p>
            </div>
            <div className="experience-feature">
              <div className="feature-icon">🎁</div>
              <h3>Gift Services</h3>
              <p>Beautiful gift wrapping and personalized messages for special occasions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}