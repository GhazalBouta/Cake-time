import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Header.css';

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);


  const handleCartClick = () => {
    navigate('/shopping-cart'); // Navigate to the Shopping Cart page
  };

  const handleWishlistClick = () => {
    navigate('/wishlist'); // Navigate to the Wishlist page
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
        <Link to="/contact">Contact</Link>
         {/* Add other links as needed */}
        
         <button onClick={handleCartClick} >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> {/* Shopping cart icon */}
                </button>
      </nav>

      
      <div className="icons">
        <FontAwesomeIcon icon={faHeart} onClick={handleWishlistClick} />
        <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick}  />
        <FontAwesomeIcon icon={faUser} onClick={toggleModal} /> {/* Add click handler */}
      </div>
      <div id="menu-btn" className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Modal for Sign In and Sign Up */}
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
