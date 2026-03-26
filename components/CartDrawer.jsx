"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, fetchCartItems, notifyCartUpdated } = useCart();
  const [removingId, setRemovingId] = useState(null);

  // Close when pressing escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const removeItem = async (id) => {
    setRemovingId(id);
    const { error } = await supabase.from("carts").delete().eq("id", id);
    if (!error) {
      notifyCartUpdated();
      toast.success("Item removed from cart");
    } else {
        toast.error("Failed to remove item.");
    }
    setRemovingId(null);
  };

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
  }, [isCartOpen]);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (Number(item.product_price) * Number(item.quantity || 1));
  }, 0);

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`} 
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginBottom: '15px' }}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <p>Your cart is empty.</p>
              <button className="continue-shopping-btn" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={`cart-item ${removingId === item.id ? 'removing' : ''}`}>
                <img src={item.product_image} alt={item.product_name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.product_name}</h4>
                  <p className="cart-item-price">{item.product_price} RS</p>
                  <p className="cart-item-qty">Qty: {item.quantity}</p>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  disabled={removingId === item.id}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>{totalPrice} RS</span>
            </div>
            <a 
              href={`https://wa.me/3151073322?text=Hi%21+I+would+like+to+checkout+my+cart+items.+Total:+${totalPrice}RS`} 
              target="_blank" 
              rel="noreferrer" 
              className="checkout-btn"
            >
              Checkout via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
