"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { userId, isSignedIn } = useAuth();
  
  const fetchCartItems = async () => {
    if (!isSignedIn || !userId) {
      setCartItems([]);
      setCartCount(0);
      return;
    }
    const { data, error } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      
    if (!error && data) {
      setCartItems(data);
      // sum quantities
      const total = data.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(total);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, isSignedIn]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const notifyCartUpdated = () => {
    fetchCartItems();
  };

  return (
    <CartContext.Provider value={{
      isCartOpen, setIsCartOpen,
      toastMessage, showToast,
      cartItems, cartCount, 
      notifyCartUpdated, fetchCartItems
    }}>
      {children}
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-popup">
          <svg className="toast-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          {toastMessage}
        </div>
      )}
    </CartContext.Provider>
  );
};
