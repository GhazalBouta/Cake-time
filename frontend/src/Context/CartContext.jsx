import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      
      // Validate cart items
      if (Array.isArray(parsedCart)) {
        return parsedCart;
      }
      return [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      if (Array.isArray(cart)) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    if (!item || !item.id) {
      console.error('Invalid item:', item);
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    if (!itemId) return;

    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== itemId);
      return updatedCart;
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (!itemId || typeof quantity !== 'number' || quantity < 0) return;

    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};