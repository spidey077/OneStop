"use client";
import React, { useState, useEffect } from "react";

const productsData = [
  { id: 1, name: "Polo Shirt 1", price: 950, img: "/poloshirt.jpg", orderUrl: "Polo+Shirt+1" },
  { id: 2, name: "Polo Shirt 2", price: 950, img: "/poloshirt2.jpg", orderUrl: "Polo+Shirt+2" },
  { id: 3, name: "Polo Shirt 3", price: 950, img: "/poloshirt3.jpg", orderUrl: "Polo+Shirt+3" },
  { id: 4, name: "Checkered Shirt 1", price: 3000, img: "/shirt.jpg", orderUrl: "Checkered+Shirt+1" },
  { id: 5, name: "Checkered Shirt 2", price: 3000, img: "/shirt2.jpg", orderUrl: "Checkered+Shirt+2" },
  { id: 6, name: "Checkered Shirt 3", price: 3000, img: "/shirt3.jpg", orderUrl: "Checkered+Shirt+3" },
  { id: 7, name: "Female Handbag 1", price: 2800, img: "/Bag.jpg", orderUrl: "Female+Handbag+1" },
  { id: 8, name: "Female Handbag 2", price: 2800, img: "/Bag2.jpg", orderUrl: "Female+Handbag+2" },
];

export default function Products({ searchQuery }) {
  const [sortType, setSortType] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: "", alt: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const getSortedProducts = () => {
    let filtered = productsData;
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortType === "low-high") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortType === "high-low") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered; // featured
  };

  const displayedProducts = getSortedProducts();

  const getSortLabel = () => {
    if (sortType === "low-high") return "Price: Low to High";
    if (sortType === "high-low") return "Price: High to Low";
    return "Featured";
  };

  // Close sorting dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setSortOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openModal = (src, alt) => {
    setModalImage({ src, alt });
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
        setModalImage({ src: "", alt: "" });
    }, 400); // Wait for transition
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  if (!mounted) return null;

  return (
    <>
      <section id="products" className="section">
        <div className="section-header">
          <h2>Products</h2>
          <div className={`product-sort ${sortOpen ? "active" : ""}`}>
            <button 
                id="sort-btn" 
                className="sort-btn" 
                aria-label="Sort products" 
                onClick={(e) => {
                    e.stopPropagation();
                    setSortOpen(!sortOpen);
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="21" y1="4" x2="14" y2="4"></line>
                <line x1="21" y1="10" x2="17" y2="10"></line>
                <line x1="21" y1="16" x2="20" y2="16"></line>
                <polyline points="3 8 6 5 9 8"></polyline>
                <line x1="6" y1="5" x2="6" y2="19"></line>
              </svg>
              <span id="sort-label">Sort by: {getSortLabel()}</span>
            </button>
            <div id="sort-options" className="sort-options">
              <div className={`sort-option ${sortType === 'featured' ? 'active' : ''}`} onClick={() => setSortType("featured")}>Featured</div>
              <div className={`sort-option ${sortType === 'low-high' ? 'active' : ''}`} onClick={() => setSortType("low-high")}>Price: Low to High</div>
              <div className={`sort-option ${sortType === 'high-low' ? 'active' : ''}`} onClick={() => setSortType("high-low")}>Price: High to Low</div>
            </div>
          </div>
        </div>

        {searchQuery && displayedProducts.length === 0 && (
            <div id="search-feedback" className="search-feedback" style={{ display: "block" }}>
                <p>No products found with keyword: <strong>"{searchQuery}"</strong></p>
            </div>
        )}

        <div className="product-grid" style={{ opacity: 1, transition: "opacity 0.2s ease" }}>
          {displayedProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-thumb">
                <img 
                    src={product.img} 
                    alt={product.name} 
                    loading="lazy" 
                    style={{ cursor: "zoom-in" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        openModal(product.img, product.name);
                    }}
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">{product.price} RS</div>
              </div>
              <a href={`https://wa.me/3151073322?text=Hi%21+I+would+like+to+order+${product.orderUrl}`} target="_blank" rel="noreferrer"
                className="wa-order-btn">Order on WhatsApp</a>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <div 
        id="image-modal" 
        className={`modal ${modalOpen ? "show" : ""}`} 
        style={{ display: modalOpen ? "flex" : "none" }}
        onClick={(e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('modal-content-wrapper')) {
                closeModal();
            }
        }}
      >
        <span className="close-modal" onClick={closeModal}>&times;</span>
        <div className="modal-content-wrapper">
          <img className="modal-content" id="modal-img" src={modalImage.src || null} alt={modalImage.alt} />
        </div>
      </div>
    </>
  );
}
