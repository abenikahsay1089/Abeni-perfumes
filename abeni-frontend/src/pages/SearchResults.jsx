import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../App.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    scentFamily: '',
    availability: 'all'
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  // Mock search results - in real app, this would come from API
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results based on query and category
      let results = [];
      
      if (category) {
        results = getMockProductsByCategory(category);
      } else if (query) {
        results = getMockProductsByQuery(query);
      } else {
        results = getAllMockProducts();
      }
      
      setSearchResults(results);
      setFilteredResults(results);
      setLoading(false);
    };

    performSearch();
  }, [query, category]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...searchResults];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under-500':
          filtered = filtered.filter(product => product.price < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(product => product.price >= 500 && product.price <= 1000);
          break;
        case '1000-2000':
          filtered = filtered.filter(product => product.price >= 1000 && product.price <= 2000);
          break;
        case 'over-2000':
          filtered = filtered.filter(product => product.price > 2000);
          break;
        default:
          break;
      }
    }

    // Apply scent family filter
    if (filters.scentFamily) {
      filtered = filtered.filter(product => 
        product.scentNotes.some(note => note.family === filters.scentFamily)
      );
    }

    // Apply availability filter
    if (filters.availability === 'inStock') {
      filtered = filtered.filter(product => product.inStock);
    } else if (filters.availability === 'outOfStock') {
      filtered = filtered.filter(product => !product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredResults(filtered);
  }, [searchResults, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      scentFamily: '',
      availability: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '' && value !== 'all').length;
  };

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-header-content">
          <h1>
            {category ? `Browsing ${category}` : query ? `Search Results for "${query}"` : 'All Products'}
          </h1>
          <p className="results-count">
            {filteredResults.length} product{filteredResults.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="search-content">
        {/* Filters Sidebar */}
        <div className="search-filters">
          <div className="filters-header">
            <h3>Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <button 
                type="button" 
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <h4>Category</h4>
            <div className="filter-options">
              {['Men', 'Women', 'Unisex'].map(cat => (
                <label key={cat} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={cat.toLowerCase()}
                    checked={filters.category === cat.toLowerCase()}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  />
                  <span className="filter-label">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="filter-options">
              {[
                        { value: 'under-500', label: 'Under $500' },
        { value: '500-1000', label: '$500 - $1000' },
        { value: '1000-2000', label: '$1000 - $2000' },
        { value: 'over-2000', label: 'Over $2000' }
              ].map(range => (
                <label key={range.value} className="filter-option">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.value}
                    checked={filters.priceRange === range.value}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  />
                  <span className="filter-label">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Scent Family Filter */}
          <div className="filter-section">
            <h4>Scent Family</h4>
            <div className="filter-options">
              {['Floral', 'Oriental', 'Fresh', 'Woody', 'Citrus', 'Spicy'].map(family => (
                <label key={family} className="filter-option">
                  <input
                    type="checkbox"
                    value={family}
                    checked={filters.scentFamily === family}
                    onChange={(e) => handleFilterChange('scentFamily', e.target.checked ? family : '')}
                  />
                  <span className="filter-label">{family}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="filter-section">
            <h4>Availability</h4>
            <div className="filter-options">
              {[
                { value: 'all', label: 'All Products' },
                { value: 'inStock', label: 'In Stock' },
                { value: 'outOfStock', label: 'Out of Stock' }
              ].map(option => (
                <label key={option.value} className="filter-option">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={filters.availability === option.value}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                  />
                  <span className="filter-label">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="search-results">
          {/* Results Header with Sort and View Options */}
          <div className="results-header">
            <div className="results-info">
              <span>Showing {filteredResults.length} results</span>
              {getActiveFiltersCount() > 0 && (
                <span className="active-filters">
                  ({getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied)
                </span>
              )}
            </div>
            
            <div className="results-controls">
              {/* Sort Options */}
              <div className="sort-controls">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="newest">Newest First</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="view-controls">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          {filteredResults.length > 0 ? (
            <div className={`results-container ${viewMode}`}>
              {filteredResults.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <div className="no-results-suggestions">
                  <h4>Suggestions:</h4>
                  <ul>
                    <li>Check your spelling</li>
                    <li>Try more general keywords</li>
                    <li>Remove some filters</li>
                    <li>Browse our <Link to="/shop">full collection</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mock data functions
function getMockProductsByQuery(query) {
  const allProducts = getAllMockProducts();
  const queryLower = query.toLowerCase();
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(queryLower) ||
    product.description.toLowerCase().includes(queryLower) ||
    product.scentNotes.some(note => 
      note.name.toLowerCase().includes(queryLower) ||
      note.family.toLowerCase().includes(queryLower)
    ) ||
    product.category.toLowerCase().includes(queryLower)
  );
}

function getMockProductsByCategory(category) {
  const allProducts = getAllMockProducts();
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

function getAllMockProducts() {
  return [
    {
      id: 1,
      name: "Ethiopian Coffee Dreams",
      description: "A rich, warm fragrance inspired by traditional Ethiopian coffee ceremonies",
      price: 1200,
      category: "unisex",
      inStock: true,
      popularity: 95,
      releaseDate: "2024-01-15",
      scentNotes: [
        { name: "Coffee Bean", family: "Spicy" },
        { name: "Cardamom", family: "Spicy" },
        { name: "Vanilla", family: "Oriental" }
      ],
      image: "/images/coffee-perfume.jpg"
    },
    {
      id: 2,
      name: "Harar Rose Elegance",
      description: "A delicate floral fragrance featuring the rare Ethiopian rose",
      price: 1500,
      category: "women",
      inStock: true,
      popularity: 88,
      releaseDate: "2024-02-01",
      scentNotes: [
        { name: "Ethiopian Rose", family: "Floral" },
        { name: "Jasmine", family: "Floral" },
        { name: "Musk", family: "Oriental" }
      ],
      image: "/images/women-floral.jpg"
    },
    {
      id: 3,
      name: "Sacred Incense Mystique",
      description: "A spiritual and grounding fragrance with traditional Ethiopian incense",
      price: 1800,
      category: "unisex",
      inStock: false,
      popularity: 92,
      releaseDate: "2023-12-10",
      scentNotes: [
        { name: "Sacred Incense", family: "Woody" },
        { name: "Sandalwood", family: "Woody" },
        { name: "Amber", family: "Oriental" }
      ],
      image: "/images/ethiopian-ingredients.jpg"
    },
    {
      id: 4,
      name: "Koseret Fresh Breeze",
      description: "A refreshing minty fragrance with Ethiopian koseret herb",
      price: 950,
      category: "men",
      inStock: true,
      popularity: 78,
      releaseDate: "2024-03-01",
      scentNotes: [
        { name: "Koseret", family: "Fresh" },
        { name: "Citrus", family: "Fresh" },
        { name: "Vetiver", family: "Woody" }
      ],
      image: "/images/men-spicy.jpg"
    },
    {
      id: 5,
      name: "Gesho Citrus Burst",
      description: "A vibrant citrus fragrance featuring the unique Ethiopian gesho plant",
      price: 1100,
      category: "unisex",
      inStock: true,
      popularity: 85,
      releaseDate: "2024-01-20",
      scentNotes: [
        { name: "Gesho", family: "Citrus" },
        { name: "Lemon", family: "Citrus" },
        { name: "Bergamot", family: "Citrus" }
      ],
      image: "/images/coffee-collection.jpg"
    }
  ];
}
