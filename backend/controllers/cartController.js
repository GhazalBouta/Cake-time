// In your cart controller file (controller.js)
const cartRepository = require('./repository');

exports.getCartItems = async (req, res) => {
    try {
        const cart = await cartRepository.cart(); // Fetch cart items
        res.status(200).json({
            status: true,
            data: cart.items, // Return the items in the cart
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message,
        });
    }
};