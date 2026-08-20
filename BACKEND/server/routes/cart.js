const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

// 🛒 GET USER CART
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      cart = await Cart.create({ user: req.user, items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});

// ➕ ADD ITEM TO CART
router.post("/add", auth, async (req, res) => {
  try {
    const {
      productId,
      code,
      name,
      price = 0,
      image = "",
      selectedColor = "",
      selectedWidth = "",
      selectedLength = "",
      selectedVolume = "",
      quantity = 1
    } = req.body;

    if (!productId || !name) {
      return res.status(400).json({ msg: "Product ID and Name are required" });
    }

    let cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      cart = new Cart({ user: req.user, items: [] });
    }

    // Check if item with same ID and variant choices exists
    const existingIndex = cart.items.findIndex(
      (item) =>
        item.productId === productId.toString() &&
        (item.selectedColor || "") === selectedColor &&
        (item.selectedWidth || "") === selectedWidth &&
        (item.selectedLength || "") === selectedLength &&
        (item.selectedVolume || "") === selectedVolume
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        productId: productId.toString(),
        code,
        name,
        price: Number(price) || 0,
        image,
        selectedColor,
        selectedWidth,
        selectedLength,
        selectedVolume,
        quantity: Number(quantity) || 1
      });
    }

    await cart.save();
    res.json({ msg: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});

// 🔄 UPDATE ITEM QUANTITY
router.put("/update", auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || quantity === undefined) {
      return res.status(400).json({ msg: "itemId and quantity are required" });
    }

    let cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    if (Number(quantity) <= 0) {
      cart.items.pull(itemId);
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();
    res.json({ msg: "Cart updated", cart });
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});

// ❌ REMOVE SINGLE ITEM FROM CART
router.delete("/remove/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    let cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.items.pull(itemId);
    await cart.save();

    res.json({ msg: "Item removed", cart });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});

// 🧹 CLEAR ALL ITEMS IN CART
router.delete("/clear", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ msg: "Cart cleared", cart: cart || { items: [] } });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});

module.exports = router;
