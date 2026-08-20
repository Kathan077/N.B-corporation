const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  code: { type: String },
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  image: { type: String },
  selectedColor: { type: String, default: "" },
  selectedWidth: { type: String, default: "" },
  selectedLength: { type: String, default: "" },
  selectedVolume: { type: String, default: "" },
  quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
