import React, { useContext } from 'react';
import { WishlistContext } from '../Context/WishlistContext';
import { CartContext } from '../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const priceString = product.price.replace('€', '').replace('per piece', '').trim();
    const priceNumber = parseFloat(priceString);
    
    const productWithNumericPrice = {
      ...product,
      price: priceNumber
    };
    
    addToCart(productWithNumericPrice);
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <h2>Your wishlist is empty</h2>
        <p>Add some items to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      <div className="wishlist-items">
        {wishlist.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="item-image">
              <img src={item.imgSrc} alt={item.title} />
            </div>
            <div className="item-details">
              <h3>{item.title}</h3>
              <div className="item-price">{item.price}</div>
              <div className="item-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
                <button 
                  className="remove-button"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;