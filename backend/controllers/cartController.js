// backend/controllers/CartController.js
const Cart = require('../models/Cart');
const Product = require('../models/productsModel');

module.exports.get_cart_items = async (req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart && cart.items.length > 0) {
            // Populate the product details
            const populatedCart = await Cart.findOne({ userId })
                .populate('items.productId', 'title price');
            res.send(populatedCart);
        } else {
            res.send(null);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

module.exports.add_cart_item = async (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try {
        // Find or create cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId });
        }

        // Find product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Check if item already exists in cart
        const existingItem = cart.items.find(item => item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                title: product.title,
                price: product.price,
                quantity
            });
        }

        // Update subtotal
        cart.subTotal = cart.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );

        await cart.save();
        res.send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

module.exports.delete_item = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        // Remove item from cart
        cart.items = cart.items.filter(item => !item._id.equals(itemId));

        // Update subtotal
        cart.subTotal = cart.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );

        await cart.save();
        res.send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};