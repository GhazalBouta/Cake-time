import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShopContextProvider } from './Context/ShopContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import Feedback from './components/Feedback';
import Wishlist from './components/Wishlist';
import Order from './components/Order';
import ProductList from './components/ProductList';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
    <ShopContextProvider>
    <BrowserRouter>
     
    
     
        <Header />
        <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/product-list" element={<ProductList />} />
        </Routes>
        <Footer />
     
    
    </BrowserRouter>
    </ShopContextProvider>
    </WishlistProvider>
    </CartProvider>
  );
}

export default App;