export default function Footer() {
  return (
    <>
      <a href="https://wa.me/3151073322" className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp"
          style={{ filter: "invert(1)" }} />
      </a>
      <a href="https://www.instagram.com/onestopshoopp?fbclid=IwY2xjawLgL01leHRuA2FlbQIxMABicmlkETEwVEtpUGZuNWdPaEFGUXJoAR6EZxQnFQu7r3DYRJzMtd4hvR"
        className="instagram-float" target="_blank" rel="noreferrer" aria-label="Visit Instagram">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram"
          style={{ filter: "invert(1)" }} />
      </a>
      <a href="https://www.facebook.com/profile.php?id=100067395392274" className="facebook-float" target="_blank" rel="noreferrer"
        aria-label="Visit Facebook">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook"
          style={{ filter: "invert(1)" }} />
      </a>

      <section className="footer section">
        <footer id="footer" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-color)", padding: "100px 5%", fontSize: "0.95rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>OneStop Wholesale</h3>
              <p>
                Your one-stop destination for quality wholesale apparel & fashion accessories. Trendy, affordable, and
                reliable – all in one place.
              </p>
            </div>

            <div className="footer-content" style={{ flex: 1, minWidth: "150px" }}>
              <h4 style={{ marginBottom: "10px" }}>Site Links</h4>
              <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
                <li><a href="#hero" style={{ textDecoration: "none" }}>Home</a></li>
                <li><a href="#why-us" style={{ textDecoration: "none" }}>Why us</a></li>
                <li><a href="#products" style={{ textDecoration: "none" }}>Products</a></li>
                <li><a href="#order" style={{ textDecoration: "none" }}>Order</a></li>
              </ul>
            </div>
            <div style={{ flex: 1, minWidth: "150px", textAlign: "center" }}>
              <h4 style={{ marginBottom: "10px" }}>Follow Us</h4>
              <div className="social-icons"
                style={{ display: "flex", justifyContent: "center", gap: "15px", alignItems: "center", marginTop: "10px", flexWrap: "wrap" }}>
                <a href="https://www.facebook.com/profile.php?id=100067395392274" target="_blank" rel="noreferrer">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook"
                    style={{ width: "24px", filter: "var(--icon-filter, invert(0))" }} />
                </a>
                <a href="https://www.instagram.com/onestopshoopp?fbclid=IwY2xjawLgL01leHRuA2FlbQIxMABicmlkETEwVEtpUGZuNWdPaEFGUXJoAR6EZxQnFQu7r3DYRJzMtd4hvR"
                  target="_blank" rel="noreferrer">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram"
                    style={{ width: "24px", filter: "var(--icon-filter, invert(0))" }} />
                </a>
                <a href="https://www.tiktok.com/@onestopshoopp?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok"
                    style={{ width: "24px", filter: "var(--icon-filter, invert(0))" }} />
                </a>
                <a href="https://wa.me/3151073322" target="_blank" rel="noreferrer">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp"
                    style={{ width: "24px", filter: "var(--icon-filter, invert(0))" }} />
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "30px", borderTop: "1px solid #333", paddingTop: "15px" }}>
            &copy; 2025 OneStop Wholesale – Fashion that shapes your choice.
          </div>
        </footer>
      </section>
      
      <button id="back-to-top" className="back-to-top" aria-label="Back to Top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
