import React, { useContext } from "react";
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // Convert cartItems object to array for backend
  const cartItemsArray = Object.entries(cartItems).map(([id, quantity]) => ({
    id,
    quantity: Number(quantity),
    // Optionally add title/price if available in your context or product list
  }));

  const handleCheckout = async () => {
    // Here you would trigger your payment component/modal (e.g., StripeCheckout)
    // For demonstration, let's assume payment is successful and you have a token:
    const fakeToken = { id: "tok_test" }; // Replace with real token from Stripe

    try {
      const response = await axios.post("http://localhost:4000/api/payment/stripe", {
        amount: totalAmount,
        token: fakeToken,
        cartItems: cartItemsArray
      });
      if (response.data.success) {
        clearCart(); // Clear the cart immediately after payment success
        navigate("/payment-success");
      } else {
        navigate("/payment-cancel");
      }
    } catch (err) {
      navigate("/payment-cancel");
    }
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul>
        {Object.entries(cartItems).map(([itemId, quantity]) => (
          <li key={itemId}>
            {itemId} - Quantity: {quantity}
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Order;