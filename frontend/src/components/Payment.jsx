import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, IbanElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../CSS/Payment.css';

// Replace with your real Stripe publishable key!
const stripePromise = loadStripe('pk_test_51RDtoIQcIUXGwTKYMS1B1ecqb7XGHgDliRiBRUXLtKGYnVHQ0S3ihl1E6huxS1MzXimUjPMsf3MQXx6rBSaE3GpW00CxHTL1gb');

// Custom style for Stripe Elements
const stripeInputStyle = {
  style: {
    base: {
      fontSize: '1.1rem',
      color: '#222',
      fontFamily: 'inherit',
      '::placeholder': { color: '#888' },
      backgroundColor: '#f4f6fa',
      padding: '12px 16px',
      borderRadius: '6px',
      border: '1px solid #ddd',
    },
    invalid: {
      color: '#d32f2f',
    },
  },
};

// Credit Card Payment (Stripe)
const StripeCheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
      setMessage(error.message);
      return;
    }
    try {
      const res = await axios.post('/api/payment/stripe', { amount, token });
      if (res.data.success) setMessage('Payment successful!');
      else setMessage('Payment failed.');
    } catch (err) {
      setMessage('Payment error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3 className="payment-title">Credit Card</h3>
      <CardElement options={stripeInputStyle} className="stripe-element" />
      <button type="submit" className="payment-btn credit-btn" disabled={!stripe}>
        Pay with Credit Card
      </button>
      <div className="payment-message">{message}</div>
    </form>
  );
};

// PayPal Payment
const PayPalButton = ({ amount }) => {
  const [message, setMessage] = useState('');
  const handlePayPal = async () => {
    try {
      const res = await axios.post('/api/payment/paypal', { amount });
      if (res.data.approval_url) {
        window.location.href = res.data.approval_url;
      } else {
        setMessage('PayPal error: No approval URL returned.');
      }
    } catch (err) {
      setMessage('PayPal error: ' + (err.response?.data?.error || err.message));
    }
  };
  return (
    <div className="payment-form">
      <h3 className="payment-title">PayPal</h3>
      <button className="payment-btn paypal-btn" onClick={handlePayPal}>
        Pay with PayPal
      </button>
      <div className="payment-message">{message}</div>
    </div>
  );
};

// SEPA Direct Debit (Stripe)
const SepaCheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ibanElement = elements.getElement(IbanElement);
    const { token, error } = await stripe.createToken(ibanElement, { name });
    if (error) {
      setMessage(error.message);
      return;
    }
    try {
      // You would need to implement a SEPA endpoint in your backend!
      const res = await axios.post('/api/payment/sepa', { amount, token });
      if (res.data.success) setMessage('SEPA payment successful!');
      else setMessage('SEPA payment failed.');
    } catch (err) {
      setMessage('SEPA payment error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3 className="payment-title">SEPA Direct Debit</h3>
      <input
        type="text"
        placeholder="Account holder name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="stripe-element"
      />
      <IbanElement
        options={{
          ...stripeInputStyle,
          supportedCountries: ['SEPA'],
          placeholderCountry: 'DE',
        }}
        className="stripe-element"
      />
      <button type="submit" className="payment-btn sepa-btn" disabled={!stripe}>
        Pay with SEPA
      </button>
      <div className="payment-message">{message}</div>
    </form>
  );
};

// Main Payment component
const Payment = ({ amount, method }) => (
  <div className="payment-container">
    <h2 className="payment-header">Checkout</h2>
    <hr className="payment-divider" />
    {method === 'credit' && (
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm amount={amount} />
      </Elements>
    )}
    {method === 'paypal' && <PayPalButton amount={amount} />}
    {method === 'sepa' && (
      <Elements stripe={stripePromise}>
        <SepaCheckoutForm amount={amount} />
      </Elements>
    )}
  </div>
);

export default Payment;