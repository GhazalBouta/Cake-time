const express = require('express');
const Product = require('../models/Product'); // Assuming you have a Product model

const router = express.Router();

// Get all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

module.exports = router;