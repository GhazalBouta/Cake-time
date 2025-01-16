import React, { useEffect, useState } from 'react';
import '../CSS/Shop.css'; // Create this CSS file for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use



const Products= [
  {
    id: 1,
    imgSrc: "../images/IMG_2657.jpg",
    title: "cake with roses",
    price: "180 €"
  },
  {
    id: 2,
    imgSrc: "../images/IMG_2089.jpg",
    title: "heart cake",
    price: "150 €"
  },
  {
    id: 3,
    imgSrc: "../images/IMG_0340.jpg",
    title: "mickimaus cake",
    price: "200 €"
  },
  {
    id: 4,
    imgSrc: "../images/IMG_2004.jpg",
    title: "BMW cake",
    price: "120 €"
  },
  {
    id: 5,
    imgSrc: "../images/IMG_5117.jpg",
    title: "Choco cake",
    price: "110 €"
  },
  {
    id: 6,
    imgSrc: "../images/IMG_5525.jpg",
    title: "gift cake",
    price: "95 €"
  },
  {
    id: 7,
    imgSrc: "../images/IMG_8129.jpg",
    title: "owl cake",
    price: "100 €"
  },
  {
    id: 8,
    imgSrc: "../images/IMG_8490.jpg",
    title: "shisha cake",
    price: "125 €"
  },
  {
    id: 9,
    imgSrc: "../images/IMG_9046.jpg",
    title: "gift box cake",
    price: "90 €"
  },
  {
    id: 10,
    imgSrc: "../images/IMG_8242.jpg",
    title: "hallo kitty cake",
    price: "130 €"
  },
  {
    id: 11,
    imgSrc: "../images/IMG_9481.jpg",
    title: "farm cake",
    price: "195 €"
  },
  {
    id: 12,
    imgSrc: "../images/IMG_9624.jpg",
    title: "money cake",
    price: "170 €"
  },
  {
    id: 13,
    imgSrc: "../images/IMG_9791.jpg",
    title: "sun cake",
    price: "130 €"
  },
  {
    id: 14,
    imgSrc: "../images/IMG_9830.jpg",
    title: "planes cake",
    price: "200 €"
  },
  {
    id: 15,
    imgSrc: "../images/IMG_9823.jpg",
    title: "cup cake",
    price: "15€ per piece"
  },
  {
    id: 16,
    imgSrc: "../images/IMG_4918.jpg",
    title: "flowers cake",
    price: "150 €"
  },
  {
    id: 17,
    imgSrc: "../images/IMG_4554.jpg",
    title: "school cake",
    price: "75 €"
  },
  {
    id: 18,
    imgSrc: "../images/IMG_2751.jpg",
    title: "pubg cake",
    price: "100 €"
  },
  {
    id: 19,
    imgSrc: "../images/IMG_0697.jpg",
    title: "Dentist cake",
    price: "150 €"
  },
  {
    id: 20,
    imgSrc: "../images/IMG_0001.jpg",
    title: "makeup cake",
    price: "180 €"
  },
  {
    id: 21,
    imgSrc: "../images/IMG_0247.jpg",
    title: "cake nr 1",
    price: "130 €"
  },
  {
    id: 22,
    imgSrc: "../images/IMG_3119.jpg",
    title: "player cake",
    price: "150 €"
  },
  {
    id: 23,
    imgSrc: "../images/IMG_9355.jpg",
    title: "princess cake",
    price: "250 €"
  },
  {
    id: 24,
    imgSrc: "../images/IMG_0227.jpg",
    title: "cake pops",
    price: "13€ per piece"
  },
  {
    id: 25,
    imgSrc: "../images/IMG_0902.jpg",
    title: "simple cake",
    price: "90 €"
  },
];

const Shop = () => {
  const [shopProducts, setShopProducts] = useState(Products); // Use hardcoded products as fallback

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShopProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to hardcoded products if API fails
        setShopProducts(Products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="shop">
      <div className="heading">
        <h1>Store</h1>
      </div>
      <div className="box-container">
        {shopProducts.length > 0 ? (
          shopProducts.map((product) => (
            <div className="box" key={product.id}>
              <div className="img">
                <img src={product.imgSrc} alt={product.title} />
                <div className="icons">
                  <button onClick={() => {/* Add to Wishlist Logic */}}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button onClick={() => {/* Add to Basket Logic */}}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </div>
              </div>
              <div className="content">
                <h3>{product.title}</h3>
                <div className="price">{product.price}</div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </section>
  );
};

export default Shop;