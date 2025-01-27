// src/Context/ShopContext.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstanse.js"; // Ensure this path is correct
import PropTypes from 'prop-types'; // Import PropTypes

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const getDefaultCart = () => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    };

    const [cartItems, setCartItems] = useState(getDefaultCart);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true); // Set loading to true before fetching
        axiosInstance.get('/api/products')
            .then(response => {
                // Handle response if needed
                setLoading(false); // Set loading to false after fetching
            })
            .catch(error => {
                setError('Error fetching products: ' + (error.response?.data?.message || error.message));
                setLoading(false); // Set loading to false on error
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            newCart[item._id] = (newCart[item._id] || 0) + 1; // Increment quantity
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1;
                if (newCart[itemId] <= 0) {
                    delete newCart[itemId]; // Remove item if quantity is 0
                }
            }
            return newCart;
        });
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        loading,
        error,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                props.children
            )}
            {error && <div className="error-message">{error}</div>}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;