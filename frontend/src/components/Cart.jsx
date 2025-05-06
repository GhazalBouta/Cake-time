import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import '../CSS/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, loading, error } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, delta) => {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="error">Error: {error}</div>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/shop')} className="shop-now-btn">
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imgSrc} alt={item.title} className="cart-item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <p className="item-price">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>€{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>€{calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart} 
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;