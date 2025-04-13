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

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

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
          <FontAwesomeIcon icon={faHeart} onClick={handleWishlistClick} />
          {wishlistCount > 0 && <span className="wishlist-counter">{wishlistCount}</span>}
        </div>
        <div className="cart-icon-container">
          <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick} />
          {cartItemCount > 0 && <span className="cart-counter">{cartItemCount}</span>}
        </div>
        <FontAwesomeIcon icon={faUser} onClick={toggleModal} />
      </div>

      <div id="menu-btn" className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {showModal && (
        <Modal
          isSignUp={isSignUp}
          onClose={toggleModal}
          onToggle={handleToggle}
        />
      )}
    </header>
  );
};

export default Header;