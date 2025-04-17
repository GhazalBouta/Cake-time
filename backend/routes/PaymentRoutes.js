const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const paypal = require('paypal-rest-sdk');

// Debug: Check if Stripe key is loaded
console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY);

// Initialize Stripe with your secret key from .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Configure PayPal SDK
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// Stripe Payment Route
router.post('/stripe', async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100), // amount in cents
      currency: 'usd',
      source: token.id,
      description: 'Cake Shop Payment'
    });
    res.json({ success: true, charge });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PayPal Payment Route
router.post('/paypal', (req, res) => {
  const { amount } = req.body;
  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel"
    },
    transactions: [{
      amount: { currency: "USD", total: amount },
      description: "Cake Shop Payment"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(500).json({ success: false, error: error.response });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.json({ approval_url: payment.links[i].href });
        }
      }
    }
  });
});

module.exports = router;