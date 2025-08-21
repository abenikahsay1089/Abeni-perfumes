// src/pages/OurStory.jsx
import React from 'react';
import '../App.css';

export default function OurStory() {
  const milestones = [
    {
      year: "2010",
      title: "The Dream Begins",
      description: "Alem Tesfaye opens a small perfume boutique in Addis Ababa, combining her grandmother's traditional recipes with modern perfumery techniques."
    },
    {
      year: "2012",
      title: "First International Recognition",
      description: "Our signature fragrance 'Ethiopian Rose' wins the African Perfume Excellence Award, putting Ethiopian perfumery on the global map."
    },
    {
      year: "2015",
      title: "Expansion to Hawassa",
      description: "Opening our second store in the beautiful lakeside city, marking the beginning of our regional expansion across Ethiopia."
    },
    {
      year: "2018",
      title: "Global Launch",
      description: "Abeni Perfumes debuts in New York City, becoming the first Ethiopian luxury fragrance brand to enter the international market."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launch of our e-commerce platform and virtual perfume consultation services, making our fragrances accessible worldwide."
    },
    {
      year: "2023",
      title: "Sustainability Leadership",
      description: "Achieving carbon-neutral certification and becoming a model for sustainable luxury in the fragrance industry."
    }
  ];

  const familyLegacy = [
    {
      generation: "First Generation",
      name: "Grandmother Alemayehu",
      story: "Born in 1930, she learned the art of fragrance from her mother, using wild herbs and flowers from the Ethiopian highlands. Her knowledge of traditional extraction methods became the foundation of our techniques."
    },
    {
      generation: "Second Generation",
      name: "Mother Bethlehem",
      story: "Expanded the family's botanical knowledge, introducing modern distillation methods while preserving traditional recipes. She taught Alem the importance of cultural authenticity."
    },
    {
      generation: "Third Generation",
      name: "Alem Tesfaye (Founder)",
      story: "Combined family wisdom with international perfumery education, creating a bridge between Ethiopian tradition and global luxury standards."
    }
  ];

  const coreValues = [
    {
      value: "Cultural Heritage",
      description: "We preserve and celebrate Ethiopia's rich aromatic traditions, ensuring that each fragrance tells a story of our land and people.",
      icon: "🏛️"
    },
    {
      value: "Artisan Excellence",
      description: "Every perfume is handcrafted using techniques passed down through generations, ensuring the highest quality and authenticity.",
      icon: "👐"
    },
    {
      value: "Sustainable Luxury",
      description: "We believe luxury should not come at the expense of our planet or communities. Every ingredient is ethically sourced and sustainably harvested.",
      icon: "🌱"
    },
    {
      value: "Innovation",
      description: "While honoring tradition, we embrace modern technology and creative approaches to create fragrances that appeal to contemporary sensibilities.",
      icon: "💡"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Full Story</h1>
        <p>A journey from humble beginnings to global recognition, preserving Ethiopia's aromatic heritage</p>
      </div>
      
      <div className="story-content">
        {/* The Beginning */}
        <section className="story-section">
          <h2>The Beginning of a Fragrant Dream</h2>
          <div className="story-text">
            <p>
              In the heart of Addis Ababa, Ethiopia, in the year 2010, a dream was born. 
              Alem Tesfaye, a third-generation perfumer, opened the doors to a small boutique 
              that would change the world's perception of African perfumery forever.
            </p>
            <p>
              The name "Abeni" holds deep meaning in Amharic - "we asked for her, and behold, she came." 
              This name was chosen to symbolize the belief that each fragrance finds its perfect wearer 
              through a special connection, much like how the right person finds their way into our lives.
            </p>
            <p>
              What started as a single store with just three fragrances has grown into an international 
              luxury brand, but our commitment to authenticity and cultural preservation has never wavered.
            </p>
          </div>
        </section>

        {/* Family Legacy */}
        <section className="story-section">
          <h2>Three Generations of Perfumery Wisdom</h2>
          <div className="family-legacy-grid">
            {familyLegacy.map((member, index) => (
              <div key={index} className="legacy-card">
                <h3>{member.generation}</h3>
                <h4>{member.name}</h4>
                <p>{member.story}</p>
              </div>
            ))}
          </div>
          <p className="legacy-conclusion">
            This intergenerational knowledge transfer ensures that every Abeni fragrance carries 
            the wisdom of centuries, combined with the innovation of today.
          </p>
        </section>

        {/* The Journey */}
        <section className="story-section">
          <h2>Our Journey Through Time</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="story-section">
          <h2>The Values That Guide Us</h2>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="value-card-detailed">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.value}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Process */}
        <section className="story-section">
          <h2>How We Create Magic</h2>
          <div className="process-detailed">
            <div className="process-step-detailed">
              <h3>1. Ingredient Discovery</h3>
              <p>
                Our journey begins in the diverse ecosystems of Ethiopia - from the misty highlands 
                where wild roses bloom, to the Rift Valley where sacred incense trees grow. We work 
                directly with local farmers and foragers who have been harvesting these botanicals 
                for generations.
              </p>
            </div>
            <div className="process-step-detailed">
              <h3>2. Traditional Extraction</h3>
              <p>
                Using methods passed down through our family, we extract the purest essences from 
                our ingredients. This includes steam distillation, cold pressing, and traditional 
                enfleurage techniques that preserve the authentic character of Ethiopian botanicals.
              </p>
            </div>
            <div className="process-step-detailed">
              <h3>3. Creative Blending</h3>
              <p>
                Our master perfumers, led by Alem herself, carefully blend these essences to create 
                harmonious fragrances. Each blend tells a story - whether it's the morning mist over 
                Lake Tana, the spice markets of Harar, or the coffee ceremonies of the highlands.
              </p>
            </div>
            <div className="process-step-detailed">
              <h3>4. Quality Assurance</h3>
              <p>
                Every fragrance undergoes rigorous testing to ensure longevity, stability, and 
                skin compatibility. We maintain the highest standards while staying true to our 
                traditional methods and natural ingredients.
              </p>
            </div>
          </div>
        </section>

        {/* The Future */}
        <section className="story-section">
          <h2>Looking Forward</h2>
          <div className="future-vision">
            <p>
              As we look to the future, our mission remains clear: to bring the world's most 
              beautiful and authentic fragrances while preserving Ethiopia's aromatic heritage 
              for generations to come.
            </p>
            <p>
              We're expanding our global presence, opening new stores in major cities around 
              the world, and introducing innovative fragrance experiences that combine tradition 
              with cutting-edge technology.
            </p>
            <p>
              But most importantly, we're committed to training the next generation of Ethiopian 
              perfumers, ensuring that our cultural legacy continues to flourish and inspire.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="story-cta">
          <h2>Join Our Story</h2>
          <p>
            Every Abeni fragrance is more than just a scent - it's a piece of Ethiopian history, 
            culture, and tradition. When you choose Abeni, you become part of our story, 
            helping us preserve and share the beauty of Ethiopia with the world.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Explore Our Fragrances</button>
            <button className="btn btn-ghost">Learn About Our Ingredients</button>
            <button className="btn btn-ghost">Visit Our Stores</button>
          </div>
        </section>
      </div>
    </div>
  );
}