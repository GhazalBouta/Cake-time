const express = require('express');
const Cart = require('./Cart');
const auth = require('../middleware/auth'); // Middleware for authentication

const router = express.Router();

// Add item to cart
router.post('/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Get user ID from token

    try {
        const existingItem = await Cart.findOne({ userId, productId });
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if item exists
            await existingItem.save();
        } else {
            const newItem = new Cart({ userId, productId, quantity });
            await newItem.save();
        }
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
});

module.exports = router;