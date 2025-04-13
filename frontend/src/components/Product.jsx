// src/components/Product.jsx
import React from 'react';
import '../CSS/Product.css';

const Product = ({ item, addToCart }) => {
  return (
    <div className="product">
      <img src={item.imgSrc} alt={item.title} className="product-image" />
      <h2>{item.title}</h2>
      <p>Price: ${item.price}</p>
      <button onClick={() => addToCart(item)}>Add to cart</button>
    </div>
  );
};

export default Product;