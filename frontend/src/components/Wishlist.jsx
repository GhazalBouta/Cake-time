// src/components/Wishlist.js
import React from 'react';
import '../CSS/Wishlist.css'; // Ensure this path is correct

const Wishlist = ({ wishlistItems }) => {
    // Check if wishlistItems is defined and is an object
    const itemKeys = wishlistItems ? Object.keys(wishlistItems) : [];

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            {itemKeys.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                itemKeys.map(key => (
                    <div key={key}>{wishlistItems[key].title}</div>
                ))
            )}
        </div>
    );
};

export default Wishlist;