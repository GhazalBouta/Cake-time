import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Load cart from localStorage for guests or from API for logged-in users
  const loadCart = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        // For logged-in users, load from API
        const response = await axios.get(`/api/cart/${userId}`);
        if (response.data && response.data.items) {
          setCart(response.data.items);
        }
      } else {
        // For guests, load from localStorage
        const savedCart = localStorage.getItem('guestCart');
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setCart(Array.isArray(parsedCart) ? parsedCart : []);
          } catch (e) {
            console.error('Error parsing cart from localStorage:', e);
            setCart([]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setError('Failed to load cart. Please try again.');
      toast.error('Failed to load your cart');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial cart load
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save cart to localStorage when it changes (for guests)
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('guestCart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      const userId = localStorage.getItem('userId');
      const itemExists = cart.find(item => item.id === product.id);
      
      let updatedCart;
      if (itemExists) {
        updatedCart = cart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity }];
      }

      if (userId) {
        await axios.post(`/api/cart/${userId}`, { items: updatedCart });
      }
      
      setCart(updatedCart);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      const updatedCart = cart.filter(item => item.id !== productId);
      
      if (userId) {
        await axios.post(`/api/cart/${userId}`, { items: updatedCart });
      }
      
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      
      if (userId) {
        await axios.post(`/api/cart/${userId}`, { items: updatedCart });
      }
      
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        await axios.post(`/api/cart/${userId}`, { items: [] });
      } else {
        localStorage.removeItem('guestCart');
      }
      
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  // Process payment
  const processPayment = async (paymentMethod, orderDetails) => {
    setProcessingPayment(true);
    try {
      const response = await axios.post('/api/payments/process', {
        paymentMethod,
        orderDetails,
        amount: cartTotal,
        items: cart,
        userId: localStorage.getItem('userId') || 'guest'
      });
      
      if (response.data.success) {
        await clearCart();
        toast.success('Payment successful! Your order has been placed.');
        return { success: true, orderId: response.data.orderId };
      } else {
        throw new Error(response.data.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment processing failed');
      return { success: false, error: error.message };
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <CartContext.Provider 
      value={{
        cart,
        loading,
        error,
        cartTotal,
        processingPayment,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        processPayment,
        itemCount: cart.reduce((count, item) => count + (item.quantity || 1), 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;