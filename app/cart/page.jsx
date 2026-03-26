"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '../../lib/supabaseClient';

export default function CartPage() {
  const { userId, isLoaded } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && userId) {
      fetchCart();
    } else if (isLoaded && !userId) {
      setLoading(false);
    }
  }, [isLoaded, userId]);

  const fetchCart = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId);
    
    if (!error && data) {
      setCartItems(data);
    }
    setLoading(false);
  };

  const removeItem = async (id) => {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('id', id);
      
    if (!error) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  if (!isLoaded || loading) {
    return <div className="container" style={{ padding: '150px 20px', minHeight: '60vh' }}>Loading...</div>;
  }

  if (!userId) {
    return <div className="container" style={{ padding: '150px 20px', minHeight: '60vh' }}>Please sign in to view your cart.</div>;
  }

  const total = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

  return (
    <div className="container" style={{ padding: '150px 20px', minHeight: '60vh' }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={{ marginTop: '20px', color: 'var(--text-color)', opacity: 0.8 }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '30px', maxWidth: '800px' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <img src={item.product_image} alt={item.product_name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{item.product_name}</h3>
                <p style={{ margin: '0', opacity: 0.8 }}>Price: {item.product_price} RS</p>
                <p style={{ margin: '5px 0 0', opacity: 0.8 }}>Quantity: {item.quantity}</p>
              </div>
              <div>
                <button onClick={() => removeItem(item.id)} style={{ padding: '10px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = 0.8} onMouseLeave={(e) => e.target.style.opacity = 1}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Total: {total} RS
          </div>
          <button style={{ padding: '15px 30px', backgroundColor: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem', marginTop: '20px', alignSelf: 'flex-end', transition: 'background-color 0.2s' }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
