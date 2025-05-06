// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Cart routes
router.get('/:userId', CartController.get_cart_items);
router.post('/:userId/items', CartController.add_cart_item);
router.delete('/:userId/items/:itemId', CartController.delete_item);


module.exports = router;