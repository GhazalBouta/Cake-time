// src/components/Wishlist.js
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'; // Ensure this path is correct
import WishlistItems from './WishlistItems'; // Ensure the case matches the file name
import '../CSS/Wishlist.css'; // Ensure this path is correct

const Wishlist = () => {
    const { wishlistItems } = useContext(ShopContext); // Get wishlist items from context

    // Convert wishlistItems object to an array if necessary
    const wishlistArray = Object.keys(wishlistItems).map((key) => ({
        id: key,
        ...wishlistItems[key],
    }));

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            {wishlistArray.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <ul>
                    {wishlistArray.map((item) => (
                        <WishlistItems key={item.id} item={item} /> // Render WishlistItems component
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wishlist;