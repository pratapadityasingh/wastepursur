

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");

router.post("/addtocart/:userId/:productId", cartController.addToCart);
router.get("/getcart/:userId", cartController.getCart);
router.put("/cart/:userId/:productId", cartController.updateCartItem);
router.delete("/cart/:userId/:productId", cartController.deleteCartItem);


module.exports = router;
