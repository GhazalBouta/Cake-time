import React, { useState, useEffect, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CartContext } from '../Context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import '../CSS/Payment.css';

const Payment = () => {
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const stripe = useStripe();
    const elements = useElements();
    const { cart, clearCart } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { shippingInfo } = location.state || {};
  
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
  
    useEffect(() => {
      const checkDisabled = () => {
        if (!stripe) {
          return;
        }
        setDisabled(false);
      };
      checkDisabled();
    }, [stripe]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (!stripe || !elements) return;
  
      setProcessing(true);
  
      try {
        let result;
        
        if (paymentMethod === 'card') {
          result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
              name: shippingInfo.name,
              email: shippingInfo.email
            }
          });
        } else if (paymentMethod === 'paypal') {
          result = {
            error: null,
            paymentMethod: {
              id: 'simulated-paypal-payment'
            }
          };
        }
  
        if (result.error) {
          setError(result.error.message);
          setProcessing(false);
        } else {
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          clearCart();
          
          // Simulate payment processing
          setTimeout(() => {
            navigate('/order-confirmation', {
              state: {
                total: calculateTotal(),
                paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'PayPal',
                shippingInfo
              }
            });
          }, 2000);
        }
      } catch (err) {
        setError(err.message);
        setProcessing(false);
      }
    };
  
    return (
      <div className="payment-container">
        <h2>Payment Details</h2>
        
        <div className="payment-info">
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <p><strong>Name:</strong> {shippingInfo.name}</p>
            <p><strong>Email:</strong> {shippingInfo.email}</p>
            <p><strong>Address:</strong> {shippingInfo.address}</p>
            <p><strong>City:</strong> {shippingInfo.city}</p>
            <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>
            <p><strong>Country:</strong> {shippingInfo.country}</p>
          </div>
  
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.title} x {item.quantity}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>€{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="payment-methods">
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="card" 
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit/Debit Card
            </label>
            
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="paypal" 
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
          </div>
  
          {paymentMethod === 'card' && (
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4'
                    }
                  },
                  invalid: {
                    color: '#9e2146'
                  }
                }
              }}
            />
          )}
  
          {paymentMethod === 'paypal' && (
            <div className="paypal-payment">
              <PayPalScriptProvider 
                options={{ 
                  "client-id": "AaVOphjXurm1V3-ZHVujwC8wRtkhXyKFS1uuwCQUpvinZgcrj8aUUdZ4w3AFxPOfpyMd6LLGSA08Q0Iz",
                  "currency": "EUR",
                  "intent": "capture",
                  "disable-funding": "card",
                  "components": "buttons"
                }}
                onError={(err) => {
                  console.error('PayPal script error:', err);
                  setError('Failed to load PayPal script. Please try again later.');
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: calculateTotal().toFixed(2),
                          currency: "EUR"
                        }
                      }],
                      application_context: {
                        shipping_preference: "NO_SHIPPING",
                        user_action: "PAY_NOW",
                        payment_method: {
                          payer_selected: "PAYPAL"
                        }
                      }
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      if (details.status === 'COMPLETED') {
                        clearCart();
                        navigate('/order-confirmation', {
                          state: {
                            total: calculateTotal(),
                            paymentMethod: 'PayPal',
                            shippingInfo
                          }
                        });
                      } else {
                        setError('Payment was not completed successfully. Please try again.');
                      }
                    });
                  }}
                  style={{ 
                    layout: 'vertical',
                    color: 'blue',
          shape: 'rect',
          label: 'paypal'
        }}
        onError={(err) => {
          console.error('PayPal button error:', err);
          setError('Failed to initialize PayPal payment. Please try again later.');
        }}
      />
    </PayPalScriptProvider>
  </div>
)}

        {error && <div className="error-message">{error}</div>}
        <button 
          className="submit-button"
          disabled={processing || disabled || succeeded}
        >
          {processing ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
};

export default Payment;