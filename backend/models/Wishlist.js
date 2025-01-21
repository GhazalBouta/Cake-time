const express = require('express');
const Wishlist = require('../models/Wishlist');
const auth = require('../middleware/auth'); // Middleware for authentication

const router = express.Router();

// Add item to wishlist
router.post('/add', auth, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId; // Get user ID from token

    try {
        const existingItem = await Wishlist.findOne({ userId, productId });
        if (existingItem) {
            return res.status(400).json({ message: 'Item already in wishlist' });
        }
        const newItem = new Wishlist({ userId, productId });
        await newItem.save();
        res.status(201).json({ message: 'Item added to wishlist' });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Error adding to wishlist' });
    }
});

module.exports = router;