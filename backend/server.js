// server.js
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/mongoose');
const paymentRoutes = require('./routes/PaymentRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import routes
const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);


// Cart Schema
const cartSchema = new mongoose.Schema({
    items: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

// Cart routes
app.post('/api/cart', async (req, res) => {
    const { id, title, price } = req.body;
    let cart = await Cart.findOne();

    if (!cart) {
        cart = new Cart({
            items: [{ id, title, price, quantity: 1 }]
        });
    } else {
        const existingItem = cart.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ id, title, price, quantity: 1 });
        }
    }

    await cart.save();
    res.json(cart);
});

app.get('/api/cart', async (req, res) => {
    const cart = await Cart.findOne();
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ message: "Cart not found" });
    }
});

app.put('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne();

    if (cart) {
        const item = cart.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            await cart.save();
        }
    }

    res.json(cart);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});