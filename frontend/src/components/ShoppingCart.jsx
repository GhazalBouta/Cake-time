import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'; // Ensure the correct import path

const ShoppingCart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(ShopContext);

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total: ${getCartTotal()}</h3>
                    <button onClick={clearCart}>Clear Cart</button>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default ShoppingCart;