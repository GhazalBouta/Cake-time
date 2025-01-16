import React from 'react';
import '../CSS/Footer.css'; // Create this CSS file for styles

const Footer = () => {
  return (
    <footer>
      <h2>
        Feel free to follow us
        <i className="fa-brands fa-instagram fa-beat" style={{ color: '#750a53' }}>  </i>  
        <a href="https://www.instagram.com/cake_time_by_ghazal/" target="_blank" rel="noopener noreferrer">
          Cake time by Ghazal
        </a>
      </h2>
    </footer>
  );
};

export default Footer;