require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');

// PayPal configuration
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Payment routes working' });
});

// Stripe payment endpoint
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'eur'
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// PayPal payment endpoint
router.post('/create-paypal-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: amount.toString()
                }
            }]
        });
        const order = await paypalClient.execute(request);
        res.json({ orderId: order.result.id });
    } catch (error) {
        console.error('PayPal Error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;