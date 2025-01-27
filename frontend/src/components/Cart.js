// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext'; // Adjust the path if necessary

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

    return (
        <div>
            <h2>Your Cart Items</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={item.name || index}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div>
                    <h3>Total: ${getCartTotal()}</h3>
                    <button onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
};

export default Cart;