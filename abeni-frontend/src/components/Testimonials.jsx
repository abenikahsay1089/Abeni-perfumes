import '../App.css';

const testimonials = [
  {
    id: 1,
    name: "Alem K.",
    role: "Loyal Customer",
    content: "Abeni's floral scents transport me back to my grandmother's garden in Addis. The quality is unmatched!",
    rating: 5
  },
  {
    id: 2,
    name: "David M.",
    role: "Fragrance Enthusiast",
    content: "The coffee-inspired perfume is revolutionary. It's warm, rich, and uniquely Ethiopian.",
    rating: 5
  },
  {
    id: 3,
    name: "Selam W.",
    role: "First-time Buyer",
    content: "I've never received so many compliments on a scent before. The longevity is impressive!",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2 className="section-title">Fragrance Stories</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < testimonial.rating ? "star-filled" : "star-empty"}>
                  ★
                </span>
              ))}
            </div>
            <p className="testimonial-content">"{testimonial.content}"</p>
            <div className="testimonial-author">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}