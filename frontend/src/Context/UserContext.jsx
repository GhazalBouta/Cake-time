import React, { useState, useEffect, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CartContext } from '../Context/CartContext';
import '../CSS/Payment.css';

const Payment = () => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useContext(CartContext);



    // ... rest of the component code ...
};