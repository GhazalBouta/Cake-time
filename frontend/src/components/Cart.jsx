import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Payment from './Payment';
import '../CSS/Cart.css';

const Cart = () => {
  const { cart, getCartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.imgSrc} alt={item.title} />
            </div>
            <div className="item-details">
              <h3>{item.title}</h3>
              <p className="item-price">€{item.price}</p>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <p className="item-subtotal">
                Subtotal: €{(item.price * item.quantity).toFixed(2)}
              </p>
              <button 
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: €{getCartTotal().toFixed(2)}</h2>
        <div className="payment-methods">
          <button className="payment-btn credit-btn" onClick={() => setShowPayment('credit')}>
            Pay with Credit Card
          </button>
          <button className="payment-btn paypal-btn" onClick={() => setShowPayment('paypal')}>
            Pay with PayPal
          </button>
          <button className="payment-btn sepa-btn" onClick={() => setShowPayment('sepa')}>
            Pay with SEPA
          </button>
        </div>
        {showPayment && (
          <div className="payment-section">
            <Payment
              amount={getCartTotal()}
              method={showPayment}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;