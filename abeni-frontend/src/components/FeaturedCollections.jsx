import { Link } from 'react-router-dom';
import '../App.css';

const collections = [
  {
    id: 1,
    title: "Coffee Inspired",
    description: "Scents celebrating Ethiopia's coffee heritage",
    image: "/images/coffee-collection.jpg", // Updated to your actual filename
    link: "/shop?tags=coffee"
  },
  {
    id: 2,
    title: "Sacred Incense",
    description: "Traditional Ethiopian church incense notes",
    image: "/images/woody-collection.jpg", // Updated to your actual filename
    link: "/shop?tags=traditional"
  },
  {
    id: 3,
    title: "Seasonal Blends",
    description: "Limited edition seasonal creations",
    image: "/images/floral-collection.jpg", // Updated to your actual filename
    link: "/shop?tags=limited"
  }
];

export default function FeaturedCollections() {
  return (
    <section className="featured-collections">
      <h2 className="section-title">Curated Collections</h2>
      <div className="collections-grid">
        {collections.map(collection => (
          <Link to={collection.link} key={collection.id} className="collection-tile">
            <div className="collection-image">
              <img 
                src={collection.image} 
                alt={collection.title} 
                loading="lazy"
              />
            </div>
            <div className="collection-overlay">
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <span className="explore-link">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}