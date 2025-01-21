const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;