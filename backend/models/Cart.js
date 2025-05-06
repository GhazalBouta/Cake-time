// backend/models/Cart.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [ItemSchema],
    subTotal: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);