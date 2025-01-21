// src/App.js
import React from 'react';
import Shop from './components/Shop'; // Use Shop component
import ShoppingCart from './components/ShoppingCart'; // Import ShoppingCart component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About'; // Use About component
import Feedback from './components/Feedback'; // Use Feedback component
import Contact from './components/Contact'; // Use Contact component
import Footer from './components/Footer';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

const App = () => {
    return (
        <Router>
            <Header />
           
                
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shoppingcart" element={<ShoppingCart />} /> {/* Fixed typo */}
                </Routes>
           
            <Footer />
        </Router>
    );
};

export default App;