import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import '../App.css';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  // Fetch products from API
  const { data: allProducts = [], isLoading: productsLoading, error } = useProducts();

  // Get category from URL
  const category = searchParams.get('category');

  useEffect(() => {
    if (productsLoading) return;
    
    setLoading(true);
    
    const filtered = allProducts.filter(product => {
      // Handle gender-specific categories
      let categoryMatch = true;
      if (category === 'women') {
        categoryMatch = product.category === 'women' || product.tags.includes('women') || product.tags.includes('feminine');
      } else if (category === 'men') {
        categoryMatch = product.category === 'men' || product.tags.includes('men') || product.tags.includes('masculine');
      } else if (category) {
        categoryMatch = product.category === category;
      }
      
      const filterMatch = filter === 'all' || product.tags.includes(filter);
      return categoryMatch && filterMatch;
    });
    
    setFilteredProducts(filtered);
    setLoading(false);
  }, [category, filter, allProducts.length, productsLoading]);



  // Get page title based on category
  const getPageTitle = () => {
    if (category === 'women') return "Women's Collection";
    if (category === 'men') return "Men's Collection";
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`;
    return 'All Perfumes';
  };

  // Get page description based on category
  const getPageDescription = () => {
    if (category === 'women') {
      return "Discover our elegant collection of feminine fragrances, featuring floral, oriental, and fresh scents perfect for the modern woman.";
    }
    if (category === 'men') {
      return "Explore our sophisticated range of masculine fragrances, from woody and spicy to fresh and aquatic scents for the confident man.";
    }
    if (category) {
      return `Explore our curated ${category} collection of exceptional fragrances.`;
    }
    return "Discover our complete collection of handcrafted Ethiopian perfumes, each telling a unique story of heritage and craftsmanship.";
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1 className="section-title">{getPageTitle()}</h1>
        <p className="shop-description">{getPageDescription()}</p>
        

        
        <div className="shop-filters">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Scents</option>
            <option value="floral">Floral</option>
            <option value="fruity">Fruity</option>
            <option value="woody">Woody</option>
            <option value="spicy">Spicy</option>
            <option value="fresh">Fresh</option>
            <option value="oriental">Oriental</option>
            <option value="aquatic">Aquatic</option>
          </select>
        </div>
      </div>

      {loading || productsLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading fragrances...</p>
        </div>
      ) : error ? (
        <div className="no-products">
          <p>Error loading products: {error.message}</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="collection-info">
            <p className="product-count">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'perfume' : 'perfumes'}
              {category && ` in ${getPageTitle()}`}
              {filter !== 'all' && ` with ${filter} scent`}
            </p>
          </div>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
              />
            ))}
          </div>
        </>
      ) : (
        <div className="no-products">
          <p>No perfumes match your selected filters.</p>
          <button 
            className="reset-filters"
            onClick={() => {
              setFilter('all');
              window.history.replaceState(null, '', '/shop');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}