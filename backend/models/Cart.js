// src/models/Cart.js
const mongoose = require("mongoose");

// Define the schema for items in the cart
const ItemSchema = new mongoose.Schema({
    productId: { type: String, required: true }, // Product ID
    title: { type: String, required: true }, // Product title
    price: { type: Number, required: true }, // Product price
    quantity: { type: Number, required: true, min: 1 }, // Quantity of the product
});

// Define the schema for the cart
const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID to associate the cart with a user
    items: [ItemSchema], // Array of items in the cart
    subTotal: { type: Number, default: 0 }, // Total price of items in the cart
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the Cart model
module.exports = mongoose.model("Cart", CartSchema);


// Get cart by user ID
router.get('/:userId', CartController.getCart);

// Add item to cart
router.post('/:userId/items', CartController.addItemToCart);

// Update item in cart
router.put('/:userId/items/:itemId', CartController.updateCartItem);

// Remove item from cart
router.delete('/:userId/items/:itemId', CartController.removeCartItem);

// Clear cart
router.delete('/:userId', CartController.clearCart);

module.exports = router;