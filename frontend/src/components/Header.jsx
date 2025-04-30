import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  // Calculate cart item count with error handling
  const cartItemCount = cart ? cart.reduce((total, item) => {
    if (typeof item.quantity === 'number') {
      return total + item.quantity;
    }
    return total;
  }, 0) : 0;

  const wishlistCount = wishlist ? wishlist.length : 0;

  const handleCartClick = () => {
    navigate('/Cart');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <a href="/about" className="logo">Cake Time</a>
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/feedback">Feedback</Link>
      </nav>

      <div className="icons">
        <div className="wishlist-icon-container">
          <FontAwesomeIcon 
            icon={faHeart} 
            className="icon"
            onClick={handleWishlistClick}
          />
          {wishlistCount > 0 && (
            <span className="icon-badge">{wishlistCount}</span>
          )}
        </div>

        <div className="cart-icon-container">
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            className="icon"
            onClick={handleCartClick}
          />
          {cartItemCount > 0 && (
            <span className="icon-badge">{cartItemCount}</span>
          )}
        </div>

        <div className="user-icon-container">
          <FontAwesomeIcon 
            icon={faUser} 
            className="icon"
            onClick={toggleModal}
          />
        </div>
      </div>

      {showModal && (
        <Modal 
          isSignUp={isSignUp} 
          onToggle={handleToggle}
          onClose={toggleModal}
        />
      )}
    </header>
  );
};

export default Header;