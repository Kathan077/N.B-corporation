const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    location: { type: String, default: "" },
    selectedProduct: { type: String, default: "ALL" },
    quantity: { type: Number, default: 1 },
    message: { type: String, required: true },
    items: [
      {
        productId: String,
        code: String,
        name: String,
        quantity: Number,
        selectedColor: String,
        selectedWidth: String,
        selectedLength: String,
        selectedVolume: String
      }
    ],
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUOTED", "CLOSED"],
      default: "NEW"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
