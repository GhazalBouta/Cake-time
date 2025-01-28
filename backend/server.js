// server.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/mongoose'); // Import the connectDB function
require('dotenv').config();
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function to connect to MongoDB

// Cart Schema
const cartSchema = new mongoose.Schema({
    items: [
        {
            id: { type: String, required: true }, // Ensure id is required
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

// API Endpoints

// Get cart items
app.get('/api/cart', async (req, res) => {
    const cart = await Cart.findOne();
    res.json(cart || { items: [] });
});

// Add item to cart
app.post('/api/cart', async (req, res) => {
    const { id, title, price } = req.body; // Get item details from request body
    const cart = await Cart.findOne();

    if (cart) {
        const existingItem = cart.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if item exists
        } else {
            cart.items.push({ id, title, price }); // Add new item
        }
        await cart.save();
    } else {
        const newCart = new Cart({ items: [{ id, title, price }] });
        await newCart.save();
    }

    res.status(201).json(cart); // Send 201 status
});

// Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
    const { id } = req.params; // Get item id from request parameters
    const cart = await Cart.findOne();

    if (cart) {
        cart.items = cart.items.filter(item => item.id !== id); // Remove item
        await cart.save();
        return res.json(cart);
    }

    res.status(404).json({ message: "Cart not found" }); // Handle not found
});

// Update item quantity
app.put('/api/cart/:id', async (req, res) => {
    const { id } = req.params; // Get item id from request parameters
    const { quantity } = req.body; // Get new quantity from request body
    const cart = await Cart.findOne();

    if (cart) {
        const item = cart.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity; // Update quantity
            await cart.save();
        }
    }

    res.json(cart);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});