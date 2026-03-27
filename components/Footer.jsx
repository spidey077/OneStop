export default function Footer() {
  return (
    <>
      {/* Floating Action Buttons */}
      <a href="https://wa.me/3151073322" className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" style={{ filter: "invert(1)" }} />
      </a>
      <a href="https://www.instagram.com/onestopshoopp" className="instagram-float" target="_blank" rel="noreferrer" aria-label="Visit Instagram">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{ filter: "invert(1)" }} />
      </a>
      <a href="https://www.facebook.com/profile.php?id=100067395392274" className="facebook-float" target="_blank" rel="noreferrer" aria-label="Visit Facebook">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{ filter: "invert(1)" }} />
      </a>

      {/* Footer Section */}
      <section className="footer section" style={{ padding: 0 }}>
        <footer id="footer" style={{ 
          backgroundColor: "#050505", 
          color: "#e2e8f0", 
          padding: "80px 5% 40px", 
          fontSize: "1rem",
          fontWeight: "300",
          borderTop: "1px solid #1a1a1a"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px", maxWidth: "1200px", margin: "0 auto" }}>
            
            {/* Brand Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.5px", margin: 0 }}>
                OneStop <span style={{ color: "yellow" }}>Wholesale</span>
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.8", margin: 0 }}>
                Your ultimate destination for premium quality wholesale apparel and fashion accessories. We merge the latest trends, unmatched affordability, and reliable shipping – all under one seamless platform.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#ffffff", marginBottom: "25px", textTransform: "uppercase", letterSpacing: "1px" }}>Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                <li><a href="#hero" className="footer-link">Home Background</a></li>
                <li><a href="#why-us" className="footer-link">Why Choose Us</a></li>
                <li><a href="#products" className="footer-link">Latest Products</a></li>
                <li><a href="#order" className="footer-link">Order Information</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#ffffff", marginBottom: "25px", textTransform: "uppercase", letterSpacing: "1px" }}>Customer Care</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                <li><a href="#" className="footer-link">Shipping & Delivery</a></li>
                <li><a href="#" className="footer-link">Return Policy</a></li>
                <li><a href="#" className="footer-link">Terms & Conditions</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div style={{ 
            width: "100%", 
            maxWidth: "1200px", 
            margin: "0 auto", 
            marginTop: "60px", 
            borderTop: "1px solid #1e293b", 
            paddingTop: "35px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px"
          }}>
            
            <div style={{ display: "flex", gap: "15px", alignItems: "center", justifyContent: "center" }}>
              <a href="https://www.facebook.com/profile.php?id=100067395392274" target="_blank" rel="noreferrer" className="footer-social-icon">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{ width: "22px", filter: "invert(1)" }} />
              </a>
              <a href="https://www.instagram.com/onestopshoopp" target="_blank" rel="noreferrer" className="footer-social-icon">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{ width: "22px", filter: "invert(1)" }} />
              </a>
              <a href="https://www.tiktok.com/@onestopshoopp" target="_blank" rel="noreferrer" className="footer-social-icon">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" style={{ width: "22px", filter: "invert(1)" }} />
              </a>
              <a href="https://wa.me/3151073322" target="_blank" rel="noreferrer" className="footer-social-icon">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" style={{ width: "22px", filter: "invert(1)" }} />
              </a>
            </div>

            <div style={{ textAlign: "center", color: "#64748b" }}>
              <p style={{ margin: "0 0 5px" }}>
                &copy; {new Date().getFullYear()} OneStop Wholesale. All rights reserved.
              </p>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                Fashion that shapes your choice.
              </p>
            </div>

          </div>
        </footer>
      </section>
      
      <button id="back-to-top" className="back-to-top" aria-label="Back to Top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      {/* Internal CSS for scoped footer hover effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }
        .footer-link:hover {
          color: #ffffff;
          transform: translateX(5px);
        }
        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background: #1e293b;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .footer-social-icon:hover {
          background: yellow;
          transform: translateY(-5px);
        }
        .footer-social-icon:hover img {
          filter: invert(0) !important;
        }
      `}} />
    </>
  );
}
