const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    id: String,
    quantity: Number
  }],
  amount: Number,
  paymentId: String,
  paymentMethod: { type: String, default: 'card' },
  shippingInfo: {
    name: String,
    address: String,
    email: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);