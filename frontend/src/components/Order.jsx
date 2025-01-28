import React, { useContext } from "react";
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from "react-router-dom";

const Order = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Logic for handling checkout (e.g., API call to create an order)
        console.log("Proceeding to checkout with total amount:", totalAmount);
        // Redirect to payment or confirmation page
        navigate("/confirmation");
    };

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
                {Object.keys(cartItems).map((itemId) => (
                    <li key={itemId}>
                        {itemId} - Quantity: {cartItems[itemId]}
                    </li>
                ))}
            </ul>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Order;