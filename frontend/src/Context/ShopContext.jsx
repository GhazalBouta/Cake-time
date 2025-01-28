import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems[item.id];
            if (existingItem) {
                return {
                    ...prevItems,
                    [item.id]: { ...existingItem, quantity: existingItem.quantity + 1 },
                };
            }
            return {
                ...prevItems,
                [item.id]: { ...item, quantity: 1 },
            };
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            const newItems = { ...prevItems };
            delete newItems[id];
            return newItems;
        });
    };

    const updateCartItem = (id, quantity) => {
        setCartItems((prevItems) => ({
            ...prevItems,
            [id]: { ...prevItems[id], quantity },
        }));
    };

    return (
        <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;