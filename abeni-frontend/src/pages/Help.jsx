import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Help() {
  const [activeSection, setActiveSection] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFAQIndex, setActiveFAQIndex] = useState(null);

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
    setActiveFAQIndex(activeFAQIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // In a real app, you would send this data to your backend
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="help-page">
      {/* Hero Section */}
      <section className="help-hero">
        <div className="hero-content">
          <h1>How Can We Help You?</h1>
          <p>Find answers to common questions or contact our support team</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="help-container">
        {/* Side Navigation */}
        <div className="help-sidebar">
          <div className="help-categories">
            <h3>Help Topics</h3>
            <button 
              className={`help-category ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveSection('contact')}
            >
              Contact Us
            </button>
            <button 
              className={`help-category ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveSection('faq')}
            >
              FAQ
            </button>
            <button 
              className={`help-category ${activeSection === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveSection('shipping')}
            >
              Shipping & Returns
            </button>
            <button 
              className={`help-category ${activeSection === 'account' ? 'active' : ''}`}
              onClick={() => setActiveSection('account')}
            >
              Account Help
            </button>
            <button 
              className={`help-category ${activeSection === 'products' ? 'active' : ''}`}
              onClick={() => setActiveSection('products')}
            >
              Product Questions
            </button>
            <button 
              className={`help-category ${activeSection === 'search' ? 'active' : ''}`}
              onClick={() => setActiveSection('search')}
            >
              Search & Discovery
            </button>
          </div>

          <div className="support-info">
            <h3>Customer Support</h3>
            <p><strong>Email:</strong> support@abeniperfumes.com</p>
            <p><strong>Phone:</strong> +251 911 234 567</p>
            <p><strong>Hours:</strong> Mon-Fri: 9AM-5PM EAT</p>
            <div className="social-links">
              <a href="#" className="social-link">FB</a>
              <a href="#" className="social-link">IG</a>
              <a href="#" className="social-link">TW</a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="help-content">
          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="help-section">
              <h2>Contact Our Team</h2>
              <p>Have a question not answered in our FAQ? Send us a message and our support team will respond within 24 hours.</p>
              
              {isSubmitted ? (
                <div className="form-success">
                  <h3>Thank You for Contacting Us!</h3>
                  <p>We've received your message and will respond within 24 hours. In the meantime, you might find answers in our <Link to="/help/faq">FAQ section</Link>.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="shipping">Shipping & Returns</option>
                      <option value="account">Account Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div className="help-section">
              <h2>Frequently Asked Questions</h2>
              <p>Find answers to common questions about our products and services</p>
              
              <div className="faq-content">
                <div className="faq-intro">
                  <h3>How Can We Help You?</h3>
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
                        {category.questions.map((faq, questionIndex) => {
                          const globalIndex = categoryIndex * 100 + questionIndex;
                          return (
                            <div 
                              key={questionIndex} 
                              className={`faq-item ${activeFAQIndex === globalIndex ? 'active' : ''}`}
                              onClick={() => toggleFAQ(globalIndex)}
                            >
                              <div className="faq-question">
                                <h4>{faq.question}</h4>
                                <div className="faq-toggle">
                                  {activeFAQIndex === globalIndex ? '−' : '+'}
                                </div>
                              </div>
                              {activeFAQIndex === globalIndex && (
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
                  <h3>Still Need Help?</h3>
                  <p>Our customer support team is ready to assist you with any questions or concerns</p>
                  <div className="contact-options">
                    <div className="contact-option">
                      <div className="contact-icon">✉️</div>
                      <h4>Email Us</h4>
                      <p className="contact-detail">support@abeniperfumes.com</p>
                      <p className="contact-info">Response within 24 hours</p>
                    </div>
                    <div className="contact-option">
                      <div className="contact-icon">📞</div>
                      <h4>Call Us</h4>
                      <p className="contact-detail">+251 911 234 567</p>
                      <p className="contact-info">Mon-Fri, 9AM-5PM EAT</p>
                    </div>
                    <div className="contact-option">
                      <div className="contact-icon">💬</div>
                      <h4>Live Chat</h4>
                      <p className="contact-detail">Available on our website</p>
                      <p className="contact-info">Mon-Fri, 8AM-6PM EAT</p>
                    </div>
                    <div className="contact-option">
                      <div className="contact-icon">🏪</div>
                      <h4>Visit Our Stores</h4>
                      <p className="contact-detail">In-person assistance</p>
                      <p className="contact-info">Expert guidance available</p>
                    </div>
                  </div>
                </div>
                
                <div className="help-tips">
                  <h3>Helpful Tips</h3>
                  <div className="tips-grid">
                    <div className="tip-card">
                      <div className="tip-icon">🔍</div>
                      <h4>Search First</h4>
                      <p>Use the search function to quickly find answers to your questions.</p>
                    </div>
                    <div className="tip-card">
                      <div className="tip-icon">📱</div>
                      <h4>Mobile Friendly</h4>
                      <p>Access our FAQ and support from any device, anywhere, anytime.</p>
                    </div>
                    <div className="tip-card">
                      <div className="tip-icon">💡</div>
                      <h4>Detailed Answers</h4>
                      <p>Each answer provides comprehensive information to solve your issue.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Section */}
          {activeSection === 'shipping' && (
            <div className="help-section">
              <h2>Shipping & Returns</h2>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="card-icon">🚚</div>
                  <h3>Shipping Information</h3>
                  <ul>
                    <li>Processing time: 1-2 business days</li>
                    <li>Domestic shipping: 3-5 business days</li>
                    <li>International shipping: 7-14 business days</li>
                    <li>Tracking provided for all orders</li>
                  </ul>
                </div>
                
                <div className="info-card">
                  <div className="card-icon">🔄</div>
                  <h3>Return Policy</h3>
                  <ul>
                    <li>30-day satisfaction guarantee</li>
                    <li>Items must be in original condition</li>
                    <li>At least 50% of product remaining</li>
                    <li>Free returns for defective items</li>
                  </ul>
                </div>
              </div>
              
              <div className="shipping-info">
                <h3>How to Return an Item</h3>
                <ol>
                  <li>Contact our support team to initiate a return</li>
                  <li>Package the item securely in its original packaging</li>
                  <li>Include the return authorization form</li>
                  <li>Ship to our return center: Abeni Returns, Addis Ababa, Ethiopia</li>
                </ol>
              </div>
            </div>
          )}

          {/* Search Help Section */}
          {activeSection === 'search' && (
            <div className="help-section">
              <h2>Search & Discovery</h2>
              <p>Learn how to find your perfect fragrance using our advanced search features.</p>
              
              <div className="search-help">
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">🔍</div>
                    <h3>Using the Search Bar</h3>
                  </div>
                  <p>Our enhanced search bar provides intelligent suggestions and quick access to popular searches. Simply type what you're looking for and explore the suggestions that appear.</p>
                  <div className="help-tips">
                    <h4>Search Features:</h4>
                    <ul>
                      <li><strong>Smart Suggestions:</strong> Get relevant search suggestions as you type</li>
                      <li><strong>Search History:</strong> Access your recent searches for quick re-discovery</li>
                      <li><strong>Popular Searches:</strong> Explore trending fragrance searches</li>
                      <li><strong>Quick Filters:</strong> Jump directly to specific categories or price ranges</li>
                    </ul>
                  </div>
                </div>
                
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">🎯</div>
                    <h3>Advanced Filtering</h3>
                  </div>
                  <p>Use our comprehensive filters to narrow down your search results by category, price range, scent family, and availability.</p>
                  <div className="help-tips">
                    <h4>Filter Options:</h4>
                    <ul>
                      <li><strong>Category:</strong> Men's, Women's, or Unisex fragrances</li>
                      <li><strong>Price Range:</strong> From under $500 to over $2000</li>
                      <li><strong>Scent Family:</strong> Floral, Oriental, Fresh, Woody, Citrus, or Spicy</li>
                      <li><strong>Availability:</strong> In stock, out of stock, or all products</li>
                    </ul>
                  </div>
                </div>
                
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">📱</div>
                    <h3>Search Results & Sorting</h3>
                  </div>
                  <p>View your search results in grid or list format, and sort them by relevance, price, name, release date, or popularity.</p>
                  <div className="help-tips">
                    <h4>Sorting Options:</h4>
                    <ul>
                      <li><strong>Relevance:</strong> Most relevant results first</li>
                      <li><strong>Price:</strong> Low to high or high to low</li>
                      <li><strong>Name:</strong> Alphabetical order</li>
                      <li><strong>Newest:</strong> Recently released fragrances first</li>
                      <li><strong>Popularity:</strong> Most popular fragrances first</li>
                    </ul>
                  </div>
                </div>

                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">💡</div>
                    <h3>Search Tips</h3>
                  </div>
                  <p>Get the most out of your search experience with these helpful tips.</p>
                  <div className="help-tips">
                    <h4>Pro Tips:</h4>
                    <ul>
                      <li>Use specific scent notes like "coffee" or "rose" for targeted results</li>
                      <li>Try searching by collection names like "Ethiopian Coffee" or "Floral Collection"</li>
                      <li>Use the quick filter tags for instant category navigation</li>
                      <li>Clear your search history if you want to start fresh</li>
                      <li>Switch between grid and list views for different browsing experiences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would follow the same pattern */}
          {activeSection === 'account' && (
            <div className="help-section">
              <h2>Account Help</h2>
              <p>Manage your Abeni Perfumes account settings and preferences with our comprehensive guide.</p>
              
              <div className="account-help">
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">🔐</div>
                    <h3>Resetting Your Password</h3>
                  </div>
                  <p>If you've forgotten your password, visit the <Link to="/forgot-password">password reset page</Link> and enter your email address. You'll receive instructions to create a new password within minutes.</p>
                  <div className="help-tips">
                    <h4>Quick Tips:</h4>
                    <ul>
                      <li>Use a strong password with at least 8 characters</li>
                      <li>Include a mix of letters, numbers, and symbols</li>
                      <li>Never share your password with anyone</li>
                    </ul>
                  </div>
                </div>
                
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">👤</div>
                    <h3>Updating Account Information</h3>
                  </div>
                  <p>You can update your email, password, and shipping addresses in the <Link to="/profile">My Account</Link> section once logged in. All changes are saved automatically.</p>
                  <div className="help-tips">
                    <h4>What You Can Update:</h4>
                    <ul>
                      <li>Personal information (name, email, phone)</li>
                      <li>Shipping and billing addresses</li>
                      <li>Password and security settings</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                </div>
                
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">📦</div>
                    <h3>Order History & Tracking</h3>
                  </div>
                  <p>View your complete order history, track current shipments, and manage returns in the <Link to="/profile">My Orders</Link> section of your account.</p>
                  <div className="help-tips">
                    <h4>Order Management Features:</h4>
                    <ul>
                      <li>Complete order history with status updates</li>
                      <li>Real-time tracking information</li>
                      <li>Easy return and exchange requests</li>
                      <li>Download invoices and receipts</li>
                    </ul>
                  </div>
                </div>

                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">🎁</div>
                    <h3>Loyalty Program & Rewards</h3>
                  </div>
                  <p>Join our Abeni Rewards program to earn points on every purchase, receive exclusive offers, and get early access to new fragrances.</p>
                  <div className="help-tips">
                    <h4>Rewards Benefits:</h4>
                    <ul>
                      <li>Earn 1 point for every $1 spent</li>
                      <li>Redeem points for discounts and free shipping</li>
                      <li>Birthday month special offers</li>
                      <li>VIP access to limited edition fragrances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'products' && (
            <div className="help-section">
              <h2>Product Questions</h2>
              <p>Learn more about our fragrances, ingredients, and usage to find your perfect scent.</p>
              
              <div className="product-help">
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">⏰</div>
                    <h3>Fragrance Longevity & Performance</h3>
                  </div>
                  <p>Our perfumes typically last 6-8 hours on skin and 8-12 hours on clothing. For best results, apply to pulse points after moisturizing and store in a cool, dark place away from direct sunlight.</p>
                  <div className="help-tips">
                    <h4>Application Tips:</h4>
                    <ul>
                      <li>Apply to pulse points: wrists, neck, behind ears</li>
                      <li>Spray from 6-8 inches away for even distribution</li>
                      <li>Layer with matching body lotion for enhanced longevity</li>
                      <li>Reapply throughout the day as needed</li>
                    </ul>
                  </div>
                </div>
                
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">🌱</div>
                    <h3>Ingredients & Sustainability</h3>
                  </div>
                  <p>We use 85% Ethiopian-sourced ingredients in all our fragrances. Our packaging is 100% recyclable and biodegradable. Learn more on our <Link to="/sustainability">Sustainability page</Link>.</p>
                  <div className="help-tips">
                    <h4>Our Signature Ingredients:</h4>
                    <ul>
                      <li><strong>Gesho:</strong> Unique hop-like plant with citrusy notes</li>
                      <li><strong>Koseret:</strong> Minty herb from the Ethiopian highlands</li>
                      <li><strong>Ethiopian Rose:</strong> Grown in the Harar region</li>
                      <li><strong>Sacred Incense:</strong> Traditional ceremonial ingredient</li>
                      <li><strong>Wild Coffee Blossom:</strong> From the birthplace of coffee</li>
                    </ul>
                  </div>
                </div>
                
                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">🔍</div>
                    <h3>Finding Your Perfect Scent</h3>
                  </div>
                  <p>Not sure which fragrance is right for you? Take our <Link to="/perfume-finder">Perfume Finder quiz</Link> to get personalized recommendations based on your preferences and lifestyle.</p>
                  <div className="help-tips">
                    <h4>Fragrance Families:</h4>
                    <ul>
                      <li><strong>Floral:</strong> Rose, jasmine, lily - romantic and feminine</li>
                      <li><strong>Oriental:</strong> Vanilla, amber, spices - warm and sensual</li>
                      <li><strong>Fresh:</strong> Citrus, aquatic, green - light and energizing</li>
                      <li><strong>Woody:</strong> Sandalwood, cedar, patchouli - earthy and sophisticated</li>
                    </ul>
                  </div>
                </div>

                <div className="help-item">
                  <div className="help-item-header">
                    <div className="help-icon">💝</div>
                    <h3>Gift Recommendations</h3>
                  </div>
                  <p>Looking for the perfect gift? Our fragrances make excellent presents for any occasion, from birthdays to anniversaries.</p>
                  <div className="help-tips">
                    <h4>Gift Ideas by Occasion:</h4>
                    <ul>
                      <li><strong>Birthday:</strong> Personal favorite or new discovery</li>
                      <li><strong>Anniversary:</strong> Romantic and sensual fragrances</li>
                      <li><strong>Holiday:</strong> Warm and cozy winter scents</li>
                      <li><strong>Graduation:</strong> Fresh and optimistic fragrances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}