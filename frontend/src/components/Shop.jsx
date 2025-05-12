import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Shop.css';

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlist } = useContext(WishlistContext);
  const [recentlyAdded, setRecentlyAdded] = useState({ cart: [], wishlist: [] });

  const productsData = [
    {
      id: 1,
      imgSrc: "/images/IMG_2657.jpg",
      title: "cake with roses",
      price: "180 €"
    },
    {
      id: 2,
      imgSrc: "/images/IMG_2089.jpg",
      title: "heart cake",
      price: "150 €"
    },
    {
      id: 3,
      imgSrc: "/images/IMG_0340.jpg",
      title: "mickimaus cake",
      price: "200 €"
    },
    {
      id: 4,
      imgSrc: "/images/IMG_2004.jpg",
      title: "BMW cake",
      price: "120 €"
    },
    {
      id: 5,
      imgSrc: "/images/IMG_5117.jpg",
      title: "Choco cake",
      price: "110 €"
    },
    {
      id: 6,
      imgSrc: "/images/IMG_5525.jpg",
      title: "gift cake",
      price: "95 €"
    },
    {
      id: 7,
      imgSrc: "/images/IMG_8129.jpg",
      title: "owl cake",
      price: "100 €"
    },
    {
      id: 8,
      imgSrc: "/images/IMG_8490.jpg",
      title: "shisha cake",
      price: "125 €"
    },
    {
      id: 9,
      imgSrc: "/images/IMG_9046.jpg",
      title: "gift box cake",
      price: "90 €"
    },
    {
      id: 10,
      imgSrc: "/images/IMG_8242.jpg",
      title: "hallo kitty cake",
      price: "130 €"
    },
    {
      id: 11,
      imgSrc: "/images/IMG_9481.jpg",
      title: "farm cake",
      price: "195 €"
    },
    {
      id: 12,
      imgSrc: "/images/IMG_9624.jpg",
      title: "money cake",
      price: "170 €"
    },
    {
      id: 13,
      imgSrc: "/images/IMG_9791.jpg",
      title: "sun cake",
      price: "130 €"
    },
    {
      id: 14,
      imgSrc: "/images/IMG_9830.jpg",
      title: "planes cake",
      price: "200 €"
    },
    {
      id: 15,
      imgSrc: "/images/IMG_9823.jpg",
      title: "cup cake",
      price: "15€ per piece"
    },
    {
      id: 16,
      imgSrc: "/images/IMG_4918.jpg",
      title: "flowers cake",
      price: "150 €"
    },
    {
      id: 17,
      imgSrc: "/images/IMG_4554.jpg",
      title: "school cake",
      price: "75 €"
    },
    {
      id: 18,
      imgSrc: "/images/IMG_2751.jpg",
      title: "pubg cake",
      price: "100 €"
    },
    {
      id: 19,
      imgSrc: "/images/IMG_0697.jpg",
      title: "Dentist cake",
      price: "150 €"
    },
    {
      id: 20,
      imgSrc: "/images/IMG_0001.jpg",
      title: "makeup cake",
      price: "180 €"
    },
    {
      id: 21,
      imgSrc: "/images/IMG_0247.jpg",
      title: "cake nr 1",
      price: "130 €"
    },
    {
      id: 22,
      imgSrc: "/images/IMG_3119.jpg",
      title: "player cake",
      price: "150 €"
    },
    {
      id: 23,
      imgSrc: "/images/IMG_9355.jpg",
      title: "princess cake",
      price: "250 €"
    },
    {
      id: 24,
      imgSrc: "/images/IMG_0227.jpg",
      title: "cake pops",
      price: "13€ per piece"
    },
    {
      id: 25,
      imgSrc: "/images/IMG_0902.jpg",
      title: "simple cake",
      price: "90 €"
    },
  ];

  const parsePrice = (priceString) => {
    try {
      return parseFloat(priceString.replace(/[^0-9.,]+/g, '').replace(',', '.'));
    } catch (error) {
      console.error('Error parsing price:', error);
      return 0;
    }
  };

  const handleAddToCart = (product) => {
    try {
      const priceNumber = parsePrice(product.price);
      
      const productWithNumericPrice = {
        ...product,
        price: priceNumber || 0, // Default to 0 if parsing fails
        quantity: 1
      };
      
      const success = addToCart(productWithNumericPrice);
      
      if (success) {
        setRecentlyAdded(prev => ({
          ...prev,
          cart: [...prev.cart, product.id]
        }));
        
        // Remove from recently added after 2 seconds
        setTimeout(() => {
          setRecentlyAdded(prev => ({
            ...prev,
            cart: prev.cart.filter(id => id !== product.id)
          }));
        }, 2000);
        
        toast.success(`${product.title} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleAddToWishlist = (product) => {
    try {
      const priceNumber = parsePrice(product.price);
      
      const productWithNumericPrice = {
        ...product,
        price: priceNumber || 0 // Default to 0 if parsing fails
      };
      
      addToWishlist(productWithNumericPrice);
      
      setRecentlyAdded(prev => ({
        ...prev,
        wishlist: [...prev.wishlist, product.id]
      }));
      
      // Remove from recently added after 2 seconds
      setTimeout(() => {
        setRecentlyAdded(prev => ({
          ...prev,
          wishlist: prev.wishlist.filter(id => id !== product.id)
        }));
      }, 2000);
      
      toast.success(`${product.title} added to wishlist!`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add item to wishlist');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className="shop-container">
      <h1>Our Cakes</h1>
      <div className="box-container">
        {productsData.map(product => (
          <div className="box" key={product.id}>
            <div className="img">
              <img src={product.imgSrc} alt={product.title} />
              <div className="icons">
                <button 
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                  onClick={() => handleAddToWishlist(product)}
                  aria-label={isInWishlist(product.id) ? 'In wishlist' : 'Add to wishlist'}
                >
                  <FontAwesomeIcon 
                    icon={recentlyAdded.wishlist.includes(product.id) ? faCheck : faHeart} 
                    className={recentlyAdded.wishlist.includes(product.id) ? 'added' : ''}
                  />
                </button>
                <button 
                  className="cart-btn"
                  onClick={() => handleAddToCart(product)}
                  aria-label="Add to cart"
                >
                  <FontAwesomeIcon 
                    icon={recentlyAdded.cart.includes(product.id) ? faCheck : faShoppingCart}
                    className={recentlyAdded.cart.includes(product.id) ? 'added' : ''}
                  />
                </button>
              </div>
            </div>
            <div className="content">
              <h3>{product.title}</h3>
              <div className="price">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;