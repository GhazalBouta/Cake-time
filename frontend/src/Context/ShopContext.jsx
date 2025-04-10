// ShopContext.jsx
import React, { createContext, useState } from 'react';

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); // إذا كنت تستخدم setCartItems، احتفظ به
  const [wishlistItems, setWishlistItems] = useState([]); // تعريف wishlistItems كمصفوفة

  const addToCart = (item) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [item.id]: (prevCartItems[item.id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      delete newCartItems[id];
      return newCartItems;
    });
  };

  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  };

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, wishlistItems, addToWishlist }}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopContextProvider };