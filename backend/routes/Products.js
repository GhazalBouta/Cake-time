// routes/product.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Add a new product
router.post('/add', async (req, res) => {
    const { id, imgSrc, title, price } = req.body;

    try {
        const newProduct = new Product({ id, imgSrc, title, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;