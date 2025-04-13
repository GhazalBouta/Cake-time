// src/components/ProductList.jsx
import React from 'react';
import Product from './Product';

/*

const products = [
    {
        id: 1,
        imgSrc: "../images/IMG_2657.jpg",
        title: "Cake with Roses",
        price: "180 €"
    },
    {
        id: 2,
        imgSrc: "../images/IMG_2089.jpg",
        title: "Heart Cake",
        price: "150 €"
    },
    {
        id: 3,
        imgSrc: "../images/IMG_0340.jpg",
        title: "Mickey Mouse Cake",
        price: "200 €"
    },
    {
        id: 4,
        imgSrc: "../images/IMG_2004.jpg",
        title: "BMW Cake",
        price: "120 €"
    },
    {
        id: 5,
        imgSrc: "../images/IMG_5117.jpg",
        title: "Choco Cake",
        price: "110 €"
    },
    {
        id: 6,
        imgSrc: "../images/IMG_5525.jpg",
        title: "Gift Cake",
        price: "95 €"
    },
    {
        id: 7,
        imgSrc: "../images/IMG_8129.jpg",
        title: "Owl Cake",
        price: "100 €"
    },
    {
        id: 8,
        imgSrc: "../images/IMG_8490.jpg",
        title: "Shisha Cake",
        price: "125 €"
    },
    {
        id: 9,
        imgSrc: "../images/IMG_9046.jpg",
        title: "Gift Box Cake",
        price: "90 €"
    },
    {
        id: 10,
        imgSrc: "../images/IMG_8242.jpg",
        title: "Hello Kitty Cake",
        price: "130 €"
    },
    {
        id: 11,
        imgSrc: "../images/IMG_9481.jpg",
        title: "Farm Cake",
        price: "195 €"
    },
    {
        id: 12,
        imgSrc: "../images/IMG_9624.jpg",
        title: "Money Cake",
        price: "170 €"
    },
    {
        id: 13,
        imgSrc: "../images/IMG_9791.jpg",
        title: "Sun Cake",
        price: "130 €"
    },
    {
        id: 14,
        imgSrc: "../images/IMG_9830.jpg",
        title: "Planes Cake",
        price: "200 €"
    },
    {
        id: 15,
        imgSrc: "../images/IMG_9823.jpg",
        title: "Cup Cake",
        price: "15 € per piece"
    },
    {
        id: 16,
        imgSrc: "../images/IMG_4918.jpg",
        title: "Flowers Cake",
        price: "150 €"
    },
    {
        id: 17,
        imgSrc: "../images/IMG_4554.jpg",
        title: "School Cake",
        price: "75 €"
    },
    {
        id: 18,
        imgSrc: "../images/IMG_2751.jpg",
        title: "PUBG Cake",
        price: "100 €"
    },
    {
        id: 19,
        imgSrc: "../images/IMG_0697.jpg",
        title: "Dentist Cake",
        price: "150 €"
    },
    {
        id: 20,
        imgSrc: "../images/IMG_0001.jpg",
        title: "Makeup Cake",
        price: "180 €"
    },
    {
        id: 21,
        imgSrc: "../images/IMG_0247.jpg",
        title: "Cake Nr 1",
        price: "130 €"
    },
    {
        id: 22,
        imgSrc: "../images/IMG_3119.jpg",
        title: "Player Cake",
        price: "150 €"
    },
    {
        id: 23,
        imgSrc: "../images/IMG_9355.jpg",
        title: "Princess Cake",
        price: "250 €"
    },
    {
        id: 24,
        imgSrc: "../images/IMG_0227.jpg",
        title: "Cake Pops",
        price: "13 € per piece"
    },
    {
        id: 25,
        imgSrc: "../images/IMG_0902.jpg",
        title: "Simple Cake",
        price: "90 €"
    }
];

*/




// src/components/ProductList.jsx

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} item={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;