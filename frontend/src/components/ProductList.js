// src/components/ProductList.js
import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext'; // Ensure this path is correct
import axiosInstance from '../axiosInstanse'; // Adjust the path if necessary

const ProductList = () => {
    const { addToCart, loading, error } = useContext(ShopContext);
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="loading-spinner">Loading products...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-list">
            <h2>Available Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;