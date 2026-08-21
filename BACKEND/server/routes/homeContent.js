const express = require("express");
const router = express.Router();
const { HomeContent, defaultHomeData } = require("../models/HomeContent");

// Helper to get or initialize home content document
async function getOrInitHomeContent() {
  let doc = await HomeContent.findOne();
  if (!doc) {
    doc = await HomeContent.create(defaultHomeData);
  }
  return doc;
}

// 🟢 GET /api/home-content - Get current home section content
router.get("/", async (req, res) => {
  try {
    const content = await getOrInitHomeContent();
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Fetch HomeContent Error (returning default fallback):", error.message);
    // If DB is offline or errored, return the default data gracefully
    res.json({
      success: true,
      data: defaultHomeData,
      isFallback: true
    });
  }
});

// 🔄 POST /api/home-content/reset - Reset to factory defaults
router.post("/reset", async (req, res) => {
  try {
    let doc = await HomeContent.findOne();
    if (doc) {
      Object.assign(doc, defaultHomeData);
      await doc.save();
    } else {
      doc = await HomeContent.create(defaultHomeData);
    }
    res.json({
      success: true,
      msg: "Home section content reset to default successfully",
      data: doc
    });
  } catch (error) {
    console.error("Reset HomeContent Error:", error);
    res.status(500).json({ success: false, msg: "Failed to reset content: " + error.message });
  }
});

// ✏️ PUT /api/home-content - Update full home section content
router.put("/", async (req, res) => {
  try {
    const payload = req.body;
    let doc = await HomeContent.findOne();
    if (!doc) {
      doc = new HomeContent(defaultHomeData);
    }

    // Merge sections
    const allowedSections = [
      "hero",
      "principles",
      "whyChooseUs",
      "applications",
      "testimonials",
      "featuredProducts",
      "brands",
      "impact"
    ];

    allowedSections.forEach((sec) => {
      if (payload[sec] !== undefined) {
        doc[sec] = payload[sec];
      }
    });

    await doc.save();
    res.json({
      success: true,
      msg: "Home content updated successfully",
      data: doc
    });
  } catch (error) {
    console.error("Update HomeContent Error:", error);
    res.status(500).json({ success: false, msg: "Failed to update: " + error.message });
  }
});

// ✏️ PUT /api/home-content/:section - Update specific home section
router.put("/:section", async (req, res) => {
  try {
    const { section } = req.params;
    const allowedSections = [
      "hero",
      "principles",
      "whyChooseUs",
      "applications",
      "testimonials",
      "featuredProducts",
      "brands",
      "impact"
    ];

    if (!allowedSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Invalid section: ${section}` });
    }

    let doc = await getOrInitHomeContent();
    doc[section] = { ...doc[section].toObject(), ...req.body };
    await doc.save();

    res.json({
      success: true,
      msg: `${section} updated successfully`,
      data: doc[section]
    });
  } catch (error) {
    console.error(`Update Section Error [${req.params.section}]:`, error);
    res.status(500).json({ success: false, msg: "Failed to update section: " + error.message });
  }
});

// ➕ POST /api/home-content/:section/item - Add an item to a list section
router.post("/:section/item", async (req, res) => {
  try {
    const { section } = req.params;
    const listSections = ["principles", "applications", "testimonials", "brands"];

    if (!listSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Section ${section} does not support item list operations.` });
    }

    const newItem = req.body;
    if (!newItem.id) {
      newItem.id = `${section}-${Date.now()}`;
    }

    let doc = await getOrInitHomeContent();
    if (!doc[section]) {
      doc[section] = { items: [] };
    }
    if (!Array.isArray(doc[section].items)) {
      doc[section].items = [];
    }

    newItem.order = doc[section].items.length + 1;
    doc[section].items.push(newItem);
    await doc.save();

    res.status(201).json({
      success: true,
      msg: "Item added successfully",
      item: newItem,
      data: doc[section]
    });
  } catch (error) {
    console.error(`Add Item Error [${req.params.section}]:`, error);
    res.status(500).json({ success: false, msg: "Failed to add item: " + error.message });
  }
});

// ✏️ PUT /api/home-content/:section/item/:itemId - Update an item in a list section
router.put("/:section/item/:itemId", async (req, res) => {
  try {
    const { section, itemId } = req.params;
    const listSections = ["principles", "applications", "testimonials", "brands"];

    if (!listSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Section ${section} does not support item list operations.` });
    }

    let doc = await getOrInitHomeContent();
    if (!doc[section] || !Array.isArray(doc[section].items)) {
      return res.status(404).json({ success: false, msg: "No items found in section" });
    }

    const itemIndex = doc[section].items.findIndex((it) => it.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, msg: `Item with id ${itemId} not found.` });
    }

    // Merge item properties
    doc[section].items[itemIndex] = {
      ...doc[section].items[itemIndex].toObject(),
      ...req.body,
      id: itemId // preserve id
    };

    await doc.save();

    res.json({
      success: true,
      msg: "Item updated successfully",
      item: doc[section].items[itemIndex],
      data: doc[section]
    });
  } catch (error) {
    console.error(`Update Item Error [${req.params.section}/${req.params.itemId}]:`, error);
    res.status(500).json({ success: false, msg: "Failed to update item: " + error.message });
  }
});

// ❌ DELETE /api/home-content/:section/item/:itemId - Delete an item from a list section
router.delete("/:section/item/:itemId", async (req, res) => {
  try {
    const { section, itemId } = req.params;
    const listSections = ["principles", "applications", "testimonials", "brands"];

    if (!listSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Section ${section} does not support item list operations.` });
    }

    let doc = await getOrInitHomeContent();
    if (!doc[section] || !Array.isArray(doc[section].items)) {
      return res.status(404).json({ success: false, msg: "No items found in section" });
    }

    const initialLength = doc[section].items.length;
    doc[section].items = doc[section].items.filter((it) => it.id !== itemId);

    if (doc[section].items.length === initialLength) {
      return res.status(404).json({ success: false, msg: `Item with id ${itemId} not found.` });
    }

    await doc.save();

    res.json({
      success: true,
      msg: "Item deleted successfully",
      data: doc[section]
    });
  } catch (error) {
    console.error(`Delete Item Error [${req.params.section}/${req.params.itemId}]:`, error);
    res.status(500).json({ success: false, msg: "Failed to delete item: " + error.message });
  }
});

module.exports = router;
