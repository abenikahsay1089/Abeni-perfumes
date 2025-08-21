// src/pages/MasterPerfumers.jsx
import React from 'react';
import '../App.css';

export default function MasterPerfumers() {
  const perfumers = [
    {
      name: "Alem Tesfaye",
      title: "Founder & Master Perfumer",
      image: "/images/perfume-artisan.jpg",
      story: "A third-generation perfumer, Alem learned the ancient art of fragrance creation from her grandmother. She combines traditional Ethiopian extraction techniques with modern perfumery to create scents that tell stories of Ethiopia's rich heritage.",
      specialties: ["Traditional Ethiopian botanicals", "Modern perfumery techniques", "Cultural storytelling through scent"],
      achievements: ["Certified Master Perfumer", "Ethiopian Heritage Award 2018", "International Fragrance Association Member"]
    },
    {
      name: "Yohannes Bekele",
      title: "Senior Perfumer",
      image: "/images/perfume-hero.jpg",
      story: "With over 15 years of experience, Yohannes specializes in creating complex, layered fragrances that capture the essence of Ethiopia's diverse landscapes, from the highlands to the Rift Valley.",
      specialties: ["Complex layering", "Landscape-inspired scents", "Seasonal fragrances"],
      achievements: ["Advanced Perfumery Certification", "Ethiopian Innovation Award 2020", "Published author on traditional scents"]
    },
    {
      name: "Sara Haile",
      title: "Creative Perfumer",
      image: "/images/perfume-hero.jpg",
      story: "Sara brings a fresh, contemporary perspective to traditional Ethiopian perfumery. Her innovative approach has resulted in some of our most popular modern fragrances while maintaining cultural authenticity.",
      specialties: ["Contemporary interpretations", "Youth-oriented scents", "Experimental techniques"],
      achievements: ["Young Perfumer of the Year 2021", "Innovation in Traditional Arts Award", "International Collaboration Projects"]
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Master Perfumers</h1>
        <p>Meet the talented artisans behind our signature fragrances</p>
      </div>
      
      <div className="perfumers-content">
        <div className="perfumers-intro">
          <h2>The Art of Perfumery</h2>
          <p>
            Our master perfumers are the heart and soul of Abeni Perfumes. Each brings unique expertise, 
            cultural knowledge, and artistic vision to create fragrances that are both authentic to Ethiopia's 
            heritage and appealing to modern sensibilities.
          </p>
          <p>
            They work in our state-of-the-art laboratory in Addis Ababa, where traditional methods meet 
            contemporary technology to produce perfumes of exceptional quality and character.
          </p>
        </div>
        
        <div className="perfumers-grid">
          {perfumers.map((perfumer, index) => (
            <div key={index} className="perfumer-card">
              <div className="perfumer-image">
                <img src={perfumer.image} alt={perfumer.name} />
              </div>
              <div className="perfumer-info">
                <h3>{perfumer.name}</h3>
                <p className="perfumer-title">{perfumer.title}</p>
                <p className="perfumer-story">{perfumer.story}</p>
                
                <div className="perfumer-specialties">
                  <h4>Specialties</h4>
                  <ul>
                    {perfumer.specialties.map((specialty, i) => (
                      <li key={i}>{specialty}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="perfumer-achievements">
                  <h4>Achievements</h4>
                  <ul>
                    {perfumer.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="perfumery-process">
          <h2>Our Perfumery Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Ingredient Selection</h3>
              <p>Carefully selecting the finest Ethiopian botanicals, ensuring quality and sustainability.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Traditional Extraction</h3>
              <p>Using time-honored methods to extract the purest essences from our ingredients.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Creative Blending</h3>
              <p>Our perfumers carefully blend ingredients to create harmonious, balanced fragrances.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Quality Testing</h3>
              <p>Rigorous testing ensures each fragrance meets our high standards for quality and longevity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
