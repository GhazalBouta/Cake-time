import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from './axiosInstance'; // Ensure this path is correct

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const getDefaultCart = () => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    };

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Axios error:', error);
                setError('Error fetching products: ' + (error.response?.data?.message || error.message));
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            newCart[itemId] = (newCart[itemId] || 0) + 1; // Increment the quantity
            return newCart; // Return the updated cart
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1; // Decrement the quantity
                if (newCart[itemId] <= 0) {
                    delete newCart[itemId]; // Remove item if quantity is 0
                }
            }
            return newCart; // Return the updated cart
        });
    };

    const updateCartItemCount = (quantity, itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (quantity > 0) {
                newCart[itemId] = quantity; // Update quantity
            } else {
                delete newCart[itemId]; // Remove item if quantity is 0
            }
            return newCart; // Return the updated cart
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find((prod) => prod._id === itemId);
            if (product) {
                totalAmount += product.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    return (
        <ShopContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItemCount,
            getTotalCartAmount,
            loading,
            error,
            products
        }}>
            {children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ShopContext, ShopContextProvider };