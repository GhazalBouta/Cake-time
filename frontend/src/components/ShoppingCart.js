// src/components/ShoppingCart.js
import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import Wishlist from './Wishlist';

const ShoppingCart = () => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
    
    const addToCart = (cake) => {
        if (!cart.some(item => item.name === cake.name)) {
            const updatedCart = [...cart, cake];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
            alert(`${cake.name} has been added to your cart!`);
        } else {
            alert(`${cake.name} is already in your cart!`);
        }
    };
    
    const addToFavorites = (cakeName) => {
        if (!favorites.includes(cakeName)) {
            const updatedFavorites = [...favorites, cakeName];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to local storage
            alert(`${cakeName} has been added to your favorites!`);
        } else {
            alert(`${cakeName} is already in your favorites!`);
        }
    };

    const handleBoxClick = (event) => {
        const target = event.target;
        const cakeBox = target.closest('.box');
        if (!cakeBox) return;

        const cakeName = cakeBox.querySelector('.content h3').innerText;
        const cakePrice = cakeBox.querySelector('.price').innerText;

        if (target.classList.contains('fa-shopping-cart')) {
            addToCart({ name: cakeName, price: cakePrice });
        } else if (target.classList.contains('fa-heart')) {
            addToFavorites(cakeName);
        }
    };


    // Inside your ShoppingCart component
useEffect(() => {
    return () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('favorites');
    };
}, []);

    return (
        <div className="box-container" onClick={handleBoxClick}>
            {/* Render cake boxes here */}
            <Cart cartItems={cart} />
            <Wishlist wishlistItems={favorites} />
        </div>
    );
};

export default ShoppingCart;