import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopContextProvider } from './Context/ShopContext';
import { WishlistProvider }    from './Context/WishlistContext';
import { CartProvider }        from './Context/CartContext';
import { ToastContainer }      from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header                  from './components/Header';
import Footer                  from './components/Footer';
import About                   from './components/About';
import Shop                    from './components/Shop';
import Cart                    from './components/Cart';
import CheckoutPage            from './components/CheckoutPage';
import Payment                from './components/Payment';
import OrderConfirmation        from './components/OrderConfirmation';
import OrderViewer              from './components/OrderViewer';

import SignUp                  from './components/SignUp';
import SignIn                  from './components/SignIn';
import Feedback                from './components/Feedback';
import Wishlist                from './components/Wishlist';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../src/CSS/App.css';

const stripePromise = loadStripe('pk_test_51RDtoIQcIUXGwTKYMS1B1ecqb7XGHgDliRiBRUXLtKGYnVHQ0S3ihl1E6huxS1MzXimUjPMsf3MQXx6rBSaE3GpW00CxHTL1gb');

function App() {
  return (
    <ShopContextProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/"                element={<About />} />
              <Route path="/about"           element={<About />} />
              <Route path="/signup"          element={<SignUp />} />
              <Route path="/signin"          element={<SignIn />} />
              <Route path="/shop"            element={<Shop />} />
              <Route path="/feedback"        element={<Feedback />} />
              <Route path="/wishlist"        element={<Wishlist />} />
              <Route path="/cart"            element={<Cart />} />
              <Route path="/checkout"        element={<CheckoutPage />} />
              <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/orders" element={<OrderViewer />} />
            </Routes>
            <Footer />
            <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ShopContextProvider>
  );
}

export default App;