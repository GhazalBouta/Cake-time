// backend/models/productsModel.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);