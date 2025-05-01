// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a test order
router.post('/test', async (req, res) => {
  try {
    const testOrder = new Order({
      customerName: 'Test Customer',
      email: 'test@example.com',
      totalAmount: 100.00,
      paymentMethod: 'Credit Card',
      items: [
        { 
          name: 'Test Product',
          quantity: 1,
          price: 100.00
        }
      ]
    });
    
    await testOrder.save();
    res.json(testOrder);
  } catch (error) {
    console.error('Error creating test order:', error);
    res.status(500).json({ error: 'Failed to create test order' });
  }
});

module.exports = router;