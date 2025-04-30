const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/OrderModel');

// Create PaymentIntent for Stripe Elements
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save order after payment
router.post('/save-order', async (req, res) => {
  const { cartItems, amount, paymentId, shippingInfo, paymentMethod } = req.body;
  try {
    const order = new Order({
      items: cartItems,
      amount,
      paymentId,
      paymentMethod: paymentMethod || 'card',
      shippingInfo
    });
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;