import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await axios.get('http://localhost:4000/api/cart');
            setCartItems(response.data);
        };
        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId) => {
        await axios.delete(`http://localhost:4000/api/cart/remove/${itemId}`);
        setCartItems(cartItems.filter(item => item._id !== itemId));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item._id}>
                            Product ID: {item.productId} - Quantity: {item.quantity}
                            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;