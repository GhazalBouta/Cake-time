import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../CSS/Header.css';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    toggleModal();
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    toggleModal();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
   <a href="/about" className="logo">
  Cake Time
</a>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
       
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/contact">Contact</Link>
       
      </nav>
      <div className="icons">
        <div id="menu-btn" className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div id="cart-btn" className="fas fa-shopping-cart"></div>
        <div id="login-btn" className="fas fa-user" onClick={handleSignInClick}></div>
      </div>

      {/* Modal for Sign In and Sign Up */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={toggleModal}>&times;</button>
            {isSignUp ? (
              <SignUp onClose={toggleModal} />
            ) : (
              <SignIn onClose={toggleModal} />
            )}
            <button onClick={handleSignUpClick}>Sign Up</button>
            <button onClick={handleSignInClick}> Sign In</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;