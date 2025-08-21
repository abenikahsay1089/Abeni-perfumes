import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SearchBar({ isHomePage = false }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('abeni-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Popular search terms
  const popularSearches = [
    'Ethiopian Coffee', 'Floral Collection', 'Woody Scents', 
    'Men Fragrances', 'Women Perfumes', 'Gift Sets',
    'Limited Edition', 'Organic Ingredients', 'Cruelty Free'
  ];

  // Search suggestions based on query
  const getSearchSuggestions = (searchQuery) => {
    if (!searchQuery.trim()) return [];
    
    const allTerms = [...popularSearches, ...searchHistory];
    return allTerms
      .filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase()) &&
        term.toLowerCase() !== searchQuery.toLowerCase()
      )
      .slice(0, 5);
  };

  const handleSearch = (e, searchTerm = null) => {
    e.preventDefault();
    const termToSearch = searchTerm || query.trim();
    
    if (termToSearch) {
      // Add to search history
      const newHistory = [termToSearch, ...searchHistory.filter(item => item !== termToSearch)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('abeni-search-history', JSON.stringify(newHistory));
      
      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(termToSearch)}`);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(new Event('submit'), suggestion);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('abeni-search-history');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = getSearchSuggestions(query);

  return (
    <div className="search-container-wrapper" ref={searchRef}>
      <form 
        onSubmit={handleSearch} 
        className={`search-container ${isFocused ? 'focused' : ''} ${isHomePage ? 'home-page-search' : ''}`}
      >
        <div className="search-input-wrapper">
          <button type="submit" className="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Search scents, notes, collections..."
            className="search-input"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setQuery('');
                setShowSuggestions(false);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="search-suggestions">
          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div className="suggestion-section">
              <div className="suggestion-header">
                <h4>Recent Searches</h4>
                <button 
                  type="button" 
                  className="clear-history-btn"
                  onClick={handleClearHistory}
                >
                  Clear
                </button>
              </div>
              <div className="suggestion-items">
                {searchHistory.slice(0, 3).map((term, index) => (
                  <button
                    key={`recent-${index}`}
                    type="button"
                    className="suggestion-item recent"
                    onClick={() => handleSuggestionClick(term)}
                  >
                    <span className="suggestion-icon">🕒</span>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestion-section">
              <h4>Suggestions</h4>
              <div className="suggestion-items">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`suggestion-${index}`}
                    type="button"
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="suggestion-icon">🔍</span>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query && (
            <div className="suggestion-section">
              <h4>Popular Searches</h4>
              <div className="suggestion-items">
                {popularSearches.slice(0, 6).map((term, index) => (
                  <button
                    key={`popular-${index}`}
                    type="button"
                    className="suggestion-item popular"
                    onClick={() => handleSuggestionClick(term)}
                  >
                    <span className="suggestion-icon">🔥</span>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="quick-filters">
            <h4>Quick Filters</h4>
            <div className="filter-tags">
              <button 
                type="button" 
                className="filter-tag"
                onClick={() => navigate('/search?category=men')}
              >
                Men's Fragrances
              </button>
              <button 
                type="button" 
                className="filter-tag"
                onClick={() => navigate('/search?category=women')}
              >
                Women's Fragrances
              </button>
              <button 
                type="button" 
                className="filter-tag"
                onClick={() => navigate('/search?category=unisex')}
              >
                Unisex
              </button>
              <button 
                type="button" 
                className="filter-tag"
                onClick={() => navigate('/search?price=under-1000')}
              >
                                 Under $1000
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}