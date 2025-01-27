// src/Context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems, item];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const removeFromCart = (itemToRemove) => {
        const updatedItems = cartItems.filter(item => item.name !== itemToRemove.name);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};