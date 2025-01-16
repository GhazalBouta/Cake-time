import React from 'react';
import Shop from './components/Shop'; // Use Shop component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About'; // Use About component
import Feedback from './components/Feedback'; // Use Feedback component
import Contact from './components/Contact'; // Use Contact component
import Footer from './components/Footer';
import Signup from './components/SignUp';
import Signin from './components/SignIn';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<h2>Welcome to Cake Time!</h2>} />
      <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
       
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;