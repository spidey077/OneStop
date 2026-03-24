export default function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="hero-inner">
        <h1 className="hero-title">OneStop Wholesale</h1>
        <p className="hero-sub">Durable fabrics &bull; Fast delivery &bull; Cash on Delivery</p>
        <a href="#products" className="cta-btn">Shop Now</a>
      </div>

      <img className="product p1" src="/shirt.jpg" alt="Checkered Shirt" fetchPriority="high" />
      <img className="product p2" src="/poloshirt.jpg" alt="Polo Shirt" fetchPriority="high" />
      <img className="product p3" src="/Bag.jpg" alt="Handbag" fetchPriority="high" />
    </section>
  );
}
