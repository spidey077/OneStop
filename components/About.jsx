export default function About() {
  return (
    <section id="why-us" className="about-section section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src="/logo.jpg" alt="OneStop Wholesale" loading="lazy" />
          </div>
          <div className="about-content">
            <span className="about-tag">About OneStop</span>
            <h2 className="about-title">Fashion that shapes your choice</h2>
            <p className="about-text">
              At OneStop Wholesale, we believe that quality fashion should be accessible to everyone.
              We specialize in premium polo shirts, casual wear, and elegant accessories designed for durability and
              timeless style.
            </p>
            <div className="values-grid">
              <div className="value-item">
                <h4>Premium Quality</h4>
                <p>Each piece is carefully sourced and inspected to ensure it meets our rigorous standards.</p>
              </div>
              <div className="value-item">
                <h4>Ethical Sourcing</h4>
                <p>We partner with trusted suppliers who share our commitment to transparency and quality.</p>
              </div>
              <div className="value-item">
                <h4>Customer First</h4>
                <p>Fast delivery and responsive support tailored to your satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
