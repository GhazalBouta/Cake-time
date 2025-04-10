import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import '../CSS/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to your cart!</p>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
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
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
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
        <div className="total">
          <h2>Total: €{calculateTotal().toFixed(2)}</h2>
        </div>
        <button className="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;