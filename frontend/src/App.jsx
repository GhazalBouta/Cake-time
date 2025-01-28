// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ShopContextProvider} from './Context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Shop from './components/Shop';
import CartItems from './components/CartItems';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import Wishlist from './components/Wishlist';
import Order from './components/Order';
import ProductList from './components/ProductList';
const App = () => {
    return (
        <ShopContextProvider>
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
                    <Route path="/cart" element={<CartItems />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/product-list" element={<ProductList />} />
                </Routes>
                <Footer />
            </Router>
        </ShopContextProvider>
    );
};

export default App;