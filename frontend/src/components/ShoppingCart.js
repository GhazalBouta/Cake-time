// src/components/ShoppingCart.js
import React, { useState } from 'react';
import Cart from './Cart';
import Wishlist from './Wishlist';

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const addToCart = (cake) => {
        if (!cart.some(item => item.name === cake.name)) {
            setCart([...cart, cake]);
            alert(`${cake.name} has been added to your cart!`);
        } else {
            alert(`${cake.name} is already in your cart!`);
        }
    };
    const addToFavorites = (cakeName) => {
        if (!favorites.includes(cakeName)) {
            setFavorites([...favorites, cakeName]);
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

    return (
        <div className="box-container" onClick={handleBoxClick}>
            {/* Render cake boxes here */}
            <Cart cartItems={cart} />
            <Wishlist wishlistItems={favorites} />
        </div>
    );
};

export default ShoppingCart;