const mongoose = require("mongoose");

const ColorVariantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, default: "#ef4444" },
  image: { type: String, default: "" }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  code: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  categoryId: { type: String, required: true, index: true },
  mainCategoryId: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  pdfPage: { type: Number, default: 1 },
  colors: [ColorVariantSchema],
  features: [{ type: String }],
  applications: [{ type: String }],
  specifications: { type: Map, of: String, default: {} },
  industries: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = {
  Product
};
