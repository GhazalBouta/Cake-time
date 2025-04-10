import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(wishlistItem => wishlistItem.id === item.id)) {
        return [...prevWishlist, item];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== itemId));
  };

  const getWishlistItemsCount = () => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist,
        getWishlistItemsCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;