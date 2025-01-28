// In your cart routes file (routes.js)
const router = require("express").Router();
const cartController = require("./controller");

router.get("/", cartController.getCartItems); // Route to get cart items
module.exports = router;