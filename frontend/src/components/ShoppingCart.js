// src/components/ShoppingCart.js
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'; // Ensure this path is correct

const ShoppingCart = () => {
    const { cartItems, removeFromCart } = useContext(ShopContext) || {}; // Provide a default value

    return (
        <div className="box-container">
            <h2>Your Shopping Cart</h2>
            {cartItems && Object.keys(cartItems).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {Object.keys(cartItems).map((itemId) => (
                        <li key={itemId}>
                            Item ID: {itemId}, Quantity: {cartItems[itemId]}
                            <button onClick={() => removeFromCart(itemId)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShoppingCart;