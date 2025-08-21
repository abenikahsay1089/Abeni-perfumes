// src/components/PerfumeFinder.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import './PerfumeFinder.css';

const questions = [
  {
    id: 1,
    question: "What's your favorite time of day?",
    options: [
      { text: "Morning", value: "fresh" },
      { text: "Afternoon", value: "floral" },
      { text: "Evening", value: "woody" }
    ]
  },
  {
    id: 2,
    question: "What best describes your personality?",
    options: [
      { text: "Energetic", value: "fruity" },
      { text: "Romantic", value: "floral" },
      { text: "Mysterious", value: "woody" },
      { text: "Bold", value: "spicy" }
    ]
  },
  {
    id: 3,
    question: "What climate do you prefer?",
    options: [
      { text: "Warm", value: "spicy" },
      { text: "Temperate", value: "floral" },
      { text: "Cool", value: "woody" }
    ]
  }
];

export default function PerfumeFinder() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  
  // Fetch products from API with proper states
  const { 
    data: allProducts = [], 
    isLoading: productsLoading, 
    error: productsError 
  } = useProducts();

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  const getRecommendedPerfumes = () => {
    if (!allProducts || allProducts.length === 0) return [];
    
    // Count tag matches from answers
    const tagCounts = {};
    Object.values(answers).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    // Score products based on matching tags
    const scoredProducts = allProducts.map(product => {
      let score = 0;
      product.tags?.forEach(tag => {
        if (tagCounts[tag]) {
          score += tagCounts[tag];
        }
      });
      return { ...product, score };
    });

    // Filter and sort by score
    return scoredProducts
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendedProducts = getRecommendedPerfumes();

  // Handle error state
  if (productsError) {
    return (
      <div className="perfume-finder">
        <h2 className="finder-title">Find Your Perfect Scent</h2>
        <div className="error-message">
          <p>Failed to load fragrance data. Please try again later.</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfume-finder">
      <h2 className="finder-title">Find Your Perfect Scent</h2>
      
      {productsLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading fragrances...</p>
        </div>
      ) : !showResults ? (
        <div className="quiz-question">
          <h3>{questions[currentQuestion].question}</h3>
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(option.value)}
                disabled={isLoading || productsLoading}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`
              }}
            ></div>
          </div>
          {(isLoading || productsLoading) && <p className="loading-text">Finding your perfect match...</p>}
        </div>
      ) : (
        <div className="results">
          <h3>We Think You'll Love</h3>
          {recommendedProducts.length > 0 ? (
            <>
              <div className="recommended-products">
                {recommendedProducts.map(product => (
                  <ProductCard 
                    key={product._id}
                    product={product}
                    compact={true}
                  />
                ))}
              </div>
              <button 
                className="retake-btn"
                onClick={restartQuiz}
              >
                Take Quiz Again
              </button>
            </>
          ) : (
            <>
              <p>We couldn't find a perfect match based on your answers.</p>
              <button 
                className="retake-btn"
                onClick={restartQuiz}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}