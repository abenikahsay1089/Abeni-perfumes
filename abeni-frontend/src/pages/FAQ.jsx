// src/pages/FAQ.jsx
import React, { useState } from 'react';
import '../App.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "We process orders within 1-2 business days. Standard shipping takes 3-5 business days within Ethiopia and 7-14 days internationally. Expedited shipping options are available at checkout."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we ship worldwide! International orders typically arrive within 7-14 business days. Please note that customers are responsible for any customs duties or import taxes."
        },
        {
          question: "How can I track my order?",
          answer: "You'll receive a tracking number via email once your order ships. You can also track your order through your account dashboard on our website."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange. Items must be in original condition with at least 50% of the product remaining."
        },
        {
          question: "How do I return a product?",
          answer: "Contact us at returns@abeniperfumes.com to initiate a return. We'll provide a return authorization number and shipping instructions. Return shipping costs are the customer's responsibility."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5 business days of receiving your return. The amount will be credited back to your original payment method."
        }
      ]
    },
    {
      category: "Product Information",
      questions: [
        {
          question: "Are your products cruelty-free?",
          answer: "Absolutely! Abeni Perfumes is certified cruelty-free by Leaping Bunny. We never test on animals, and all our ingredients are ethically sourced."
        },
        {
          question: "How should I store my perfume?",
          answer: "To preserve your fragrance, store it in a cool, dark place away from direct sunlight and extreme temperatures. Avoid storing in humid areas like bathrooms. Properly stored, our perfumes maintain their quality for 3-5 years."
        },
        {
          question: "What makes your fragrances unique?",
          answer: "Our fragrances feature rare Ethiopian botanicals like Gesho, Koseret, Ethiopian Rose, Sacred Incense, and Wild Coffee Blossom. We combine traditional extraction methods with modern perfumery techniques."
        }
      ]
    },
    {
      category: "Customer Service",
      questions: [
        {
          question: "Do you offer gift wrapping?",
          answer: "Yes, we offer complimentary gift wrapping with a handwritten note for all orders. You can select this option at checkout."
        },
        {
          question: "Can I create a custom fragrance?",
          answer: "Yes! Visit our flagship store in Addis Ababa for a custom fragrance consultation. Our master perfumers will work with you to create your signature scent using traditional Ethiopian techniques."
        },
        {
          question: "Do you have a loyalty program?",
          answer: "Yes! Join our Abeni Rewards program to earn points on every purchase, receive exclusive offers, and get early access to new fragrances."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services</p>
      </div>
      
      <div className="faq-content">
        <div className="faq-intro">
          <h2>How Can We Help You?</h2>
          <p>
            We've compiled answers to the most frequently asked questions about our products, 
            services, and policies. If you can't find what you're looking for, our customer 
            support team is always ready to help.
          </p>
        </div>
        
        <div className="faq-categories">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="category-questions">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index;
                  return (
                    <div 
                      key={index} 
                      className={`faq-item ${activeIndex === globalIndex ? 'active' : ''}`}
                      onClick={() => toggleFAQ(globalIndex)}
                    >
                      <div className="faq-question">
                        <h4>{faq.question}</h4>
                        <div className="faq-toggle">
                          {activeIndex === globalIndex ? '−' : '+'}
                        </div>
                      </div>
                      {activeIndex === globalIndex && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="additional-help">
          <h2>Still Need Help?</h2>
          <p>Our customer support team is ready to assist you with any questions or concerns</p>
          <div className="contact-options">
            <div className="contact-option">
              <div className="contact-icon">✉️</div>
              <h3>Email Us</h3>
              <p className="contact-detail">support@abeniperfumes.com</p>
              <p className="contact-info">Response within 24 hours</p>
            </div>
            <div className="contact-option">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p className="contact-detail">+251 911 234 567</p>
              <p className="contact-info">Mon-Fri, 9AM-5PM EAT</p>
            </div>
            <div className="contact-option">
              <div className="contact-icon">💬</div>
              <h3>Live Chat</h3>
              <p className="contact-detail">Available on our website</p>
              <p className="contact-info">Mon-Fri, 8AM-6PM EAT</p>
            </div>
            <div className="contact-option">
              <div className="contact-icon">🏪</div>
              <h3>Visit Our Stores</h3>
              <p className="contact-detail">In-person assistance</p>
              <p className="contact-info">Expert guidance available</p>
            </div>
          </div>
        </div>
        
        <div className="help-tips">
          <h2>Helpful Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🔍</div>
              <h3>Search First</h3>
              <p>Use the search function to quickly find answers to your questions.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access our FAQ and support from any device, anywhere, anytime.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💡</div>
              <h3>Detailed Answers</h3>
              <p>Each answer provides comprehensive information to solve your issue.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}