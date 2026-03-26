"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";

import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    toast.success(message);
  };

  const notifyCartUpdated = () => {
    fetchCartItems();
  };

  return (
    <CartContext.Provider value={{
      isCartOpen, setIsCartOpen,
      showToast,
      cartItems, cartCount, 
      notifyCartUpdated, fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
