"use client";
import React, { useState, useEffect, useRef } from "react";
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { useCart } from './CartContext';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isSignedIn } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) setScrolled(true);
      else setScrolled(false);
      
      if (scrollTop > lastScrollTop && scrollTop > 100) setHidden(true);
      else setHidden(false);
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuActive ? "hidden" : "";
  }, [menuActive]);

  const toggleMenu = () => setMenuActive(!menuActive);
  
  const handleSearchAction = () => {
      if (searchQuery) {
          const productsSection = document.querySelector("#products");
          if (productsSection) productsSection.scrollIntoView({ behavior: "smooth" });
      }
  };

  const handleKeyDown = (e) => {
      if (e.key === "Enter") handleSearchAction();
  };

  return (
    <nav id="navbar" className={`${scrolled ? "nav-scrolled" : ""} ${hidden ? "nav-hidden" : ""}`}>
      <div className="logo">OneStop Wholesale</div>

      <div className={`nav-links ${menuActive ? "active" : ""}`} id="nav-links">
        <ul>
          <li><a href="#hero" onClick={toggleMenu}>Home</a></li>
          <li><a href="#why-us" onClick={toggleMenu}>Why Us</a></li>
          <li><a href="#products" onClick={toggleMenu}>Products</a></li>
          <li><a href="#faq" onClick={toggleMenu}>FAQ</a></li>
          <li><a href="#order" onClick={toggleMenu}>Order</a></li>
          <li><a href="#footer" onClick={toggleMenu}>Links</a></li>
        </ul>
      </div>

      <div className={`nav-overlay ${menuActive ? "active" : ""}`} id="nav-overlay" onClick={toggleMenu}></div>

      <div className="nav-actions">
        <div className={`nav-search ${searchActive ? "active" : ""}`} ref={searchRef}>
          <button className="search-icon" aria-label="Search" onClick={() => {
              if (!searchActive) setSearchActive(true);
              else handleSearchAction();
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.53 20.47l-4.687-4.687a8.5 8.5 0 10-1.06 1.06l4.687 4.687a.75.75 0 101.06-1.06zM10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z" />
            </svg>
          </button>
          <input 
            type="text" 
            id="product-search" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
                if (!searchQuery) setSearchActive(false);
            }}
          />
          <button id="clear-search" className="clear-search" aria-label="Clear search" onClick={() => {
              setSearchQuery("");
              document.getElementById("product-search")?.focus();
          }}>&times;</button>
        </div>

        {isSignedIn && (
          <button 
            className="cart-nav-btn" 
            onClick={() => setIsCartOpen(true)} 
            style={{ 
              background: "transparent", 
              border: "none", 
              color: "var(--text-color)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.2s ease"
            }}
            aria-label="Open Cart"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge" style={{ top: "-2px", right: "-4px" }}>{cartCount}</span>}
          </button>
        )}

        <div className="auth-buttons" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {isSignedIn ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="cta-btn1" style={{ padding: "8px 16px", background: "var(--light-bg)", color: "var(--text-color)", border: "1px solid var(--border-color)", cursor: "pointer", borderRadius: "20px" }}>Login</button>
            </SignInButton>
          )}
        </div>

        <div className={`hamburger ${menuActive ? "active" : ""}`} id="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
}
