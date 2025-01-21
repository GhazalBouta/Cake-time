import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const response = await axios.get('http://localhost:4000/api/wishlist');
            setWishlistItems(response.data);
        };
        fetchWishlistItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        await axios.delete(`http://localhost:4000/api/wishlist/remove/${itemId}`);
        setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
    };

    return (
        <div>
            <h2>Your Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <ul>
                    {wishlistItems.map(item => (
                        <li key={item._id}>
                            Product ID: {item.productId}
                            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wishlist;