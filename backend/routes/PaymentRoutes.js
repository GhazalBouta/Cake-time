// backend/routes/PaymentRoutes.js
const express = require('express');
const router = express.Router();
require('dotenv').config(); // Add this line to load environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency || 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle successful payment
router.post('/payment-success', async (req, res) => {
  const { paymentIntentId, orderData } = req.body;

  try {
    // Verify payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Create order in database
      const order = new Order({
        customerName: orderData.customerName,
        email: orderData.email,
        totalAmount: paymentIntent.amount / 100, // Convert back to dollars
        paymentMethod: 'Credit Card',
        items: orderData.items,
        status: 'Completed'
      });

      await order.save();
      res.json({ success: true, orderId: order._id });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;