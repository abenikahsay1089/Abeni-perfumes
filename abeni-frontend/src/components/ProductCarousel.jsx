import { useState } from 'react';
import ProductCard from './ProductCard';
import '../App.css';

export default function ProductCarousel({ title, products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <h3>{title}</h3>
        <div className="carousel-controls">
          <button onClick={prevSlide} className="carousel-arrow">
            &lt;
          </button>
          <button onClick={nextSlide} className="carousel-arrow">
            &gt;
          </button>
        </div>
      </div>
      
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-slide">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}