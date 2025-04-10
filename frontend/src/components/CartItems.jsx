// CartItems.jsx
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const CartItems = () => {
  const { cartItems, addToCart, removeFromCart, calculateTotal } = useContext(ShopContext);

  const handleIncrease = (itemId) => {
    addToCart({ id: itemId });
  };

  const handleDecrease = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {Object.keys(cartItems).map((itemId) => (
            <li key={itemId}>
              {itemId}: {cartItems[itemId]} 
              <button onClick={() => handleIncrease(itemId)}>+</button>
              <button onClick={() => handleDecrease(itemId)}>-</button>
            </li>
          ))}
        </ul>
      )}
      <h2>Total: ${calculateTotal()}</h2> {/* عرض إجمالي السعر */}
    </div>
  );
};

export default CartItems;