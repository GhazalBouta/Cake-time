import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart from backend
  useEffect(() => {
    const loadCart = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setCart([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/cart/${userId}`);
        setCart(response.data.items || []);
      } catch (err) {
        console.error('Error loading cart:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      await axios.post(`/api/cart/${userId}/items`, item);
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.message);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      await axios.put(`/api/cart/${userId}/items/${itemId}`, { quantity });
      const updatedCart = cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err.message);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      await axios.delete(`/api/cart/${userId}/items/${itemId}`);
      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.message);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      await axios.delete(`/api/cart/${userId}`);
      setCart([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err.message);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};