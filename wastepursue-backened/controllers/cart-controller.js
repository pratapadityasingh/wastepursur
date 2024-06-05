const { ObjectId } = require("mongodb");
const Cart = require("../models/cart-model");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    // console.log(userId, productId, "ids{{{{==");
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist for the user, create a new cart with the product
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find((item) => item.product == productId);

      // console.log(existingItem, "existingItem");

      if (existingItem) {
        // If the product exists, increment its quantity by 1
        existingItem.quantity++;
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        cart.items.push({ product: productId, quantity: 1 });
      }

      // Save the updated cart
      await cart.save();
    }

    // Respond with the updated cart
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId, "dfugfdgdfygvyefgyf");

    const cartAggregation = await Cart.aggregate([
      {
        $match: { user: new ObjectId(userId) },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.product",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          _id: 0,
          product: { $arrayElemAt: ["$product", 0] },
          totalQuantity: 1,
        },
      },
    ]);
    // console.log(cartAggregation, "cart+++l..");
    res.status(200).json(cartAggregation);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find((item) => item.product == productId);
    if (!item) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    item.quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.product != productId);

    await cart.save();
    res
      .status(200)
      .json({ message: "Product removed from cart successfully", cart });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
};
