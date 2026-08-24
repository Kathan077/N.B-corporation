const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/Product");

// Flexible query builder to match custom id, MongoDB ObjectId _id, or product code
const buildProductQuery = (id) => {
  if (!id) return { _id: null };
  const strId = String(id).trim();
  const conditions = [{ id: strId }, { code: strId }];
  if (mongoose.Types.ObjectId.isValid(strId) && strId.length === 24) {
    try {
      conditions.unshift({ _id: new mongoose.Types.ObjectId(strId) });
    } catch (e) {
      // ignore
    }
  }
  return { $or: conditions };
};

// 🟢 GET /api/products - Get all products with optional filters
router.get("/", async (req, res) => {
  try {
    const { categoryId, mainCategoryId, search, activeOnly } = req.query;
    const query = {};

    if (activeOnly === "true") {
      query.isActive = true;
    }

    if (categoryId && categoryId !== "all") {
      query.categoryId = categoryId;
    }

    if (mainCategoryId && mainCategoryId !== "all") {
      query.mainCategoryId = mainCategoryId;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { code: searchRegex },
        { category: searchRegex },
        { description: searchRegex }
      ];
    }

    const products = await Product.find(query).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch products: " + error.message });
  }
});

// 🟢 GET /api/products/:id - Get single product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = buildProductQuery(id);
    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Fetch Single Product Error:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch product: " + error.message });
  }
});

// ➕ POST /api/products - Create a new product
router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.name || !data.category) {
      return res.status(400).json({ success: false, msg: "Product Name and Category are required" });
    }

    delete data._id;
    delete data.__v;

    if (!data.id) {
      const codePart = (data.code || "item").toLowerCase().replace(/[^a-z0-9]/g, "-");
      data.id = `prod-${codePart}-${Date.now().toString().slice(-4)}`;
    }

    if (!data.categoryId) {
      data.categoryId = data.category.toLowerCase().replace(/[^a-z0-9]/g, "-");
    }

    // Check if duplicate ID exists
    const existing = await Product.findOne({ id: data.id });
    if (existing) {
      data.id = `${data.id}-${Date.now().toString().slice(-4)}`;
    }

    const count = await Product.countDocuments();
    data.order = count + 1;

    const newProduct = await Product.create(data);

    res.status(201).json({
      success: true,
      msg: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, msg: "Failed to create product: " + error.message });
  }
});

// ✏️ PUT /api/products/:id - Update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    if (updateData.category && !updateData.categoryId) {
      updateData.categoryId = updateData.category.toLowerCase().replace(/[^a-z0-9]/g, "-");
    }

    const query = buildProductQuery(id);

    const product = await Product.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({
      success: true,
      msg: "Product updated successfully",
      data: product
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ success: false, msg: "Failed to update product: " + error.message });
  }
});

// ❌ DELETE /api/products/:id - Delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = buildProductQuery(id);
    const deleted = await Product.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({
      success: true,
      msg: `Product '${deleted.name}' deleted successfully`,
      data: deleted
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ success: false, msg: "Failed to delete product: " + error.message });
  }
});

// 🔄 POST /api/products/seed - Bulk seed / sync products from array
router.post("/seed", async (req, res) => {
  try {
    const { products, overwrite = false } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, msg: "Please provide an array of products to seed" });
    }

    if (overwrite) {
      await Product.deleteMany({});
    }

    let insertedCount = 0;
    let updatedCount = 0;

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      if (!p.id) {
        p.id = `prod-${(p.code || i).toString().toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      }
      p.order = i + 1;

      const existing = await Product.findOne({ id: p.id });
      if (existing) {
        Object.assign(existing, p);
        await existing.save();
        updatedCount++;
      } else {
        await Product.create(p);
        insertedCount++;
      }
    }

    const total = await Product.countDocuments();

    res.json({
      success: true,
      msg: `Seeding completed: ${insertedCount} added, ${updatedCount} updated. Total products in DB: ${total}`,
      count: total
    });
  } catch (error) {
    console.error("Bulk Seed Products Error:", error);
    res.status(500).json({ success: false, msg: "Failed to seed products: " + error.message });
  }
});

module.exports = router;
