const express = require("express");
const router = express.Router();
const { AboutContent, defaultAboutData } = require("../models/AboutContent");

// Helper to get or initialize about content document
async function getOrInitAboutContent() {
  let doc = await AboutContent.findOne();
  if (!doc) {
    doc = await AboutContent.create(defaultAboutData);
  }
  return doc;
}

// 🟢 GET /api/about-content - Get current about section content
router.get("/", async (req, res) => {
  try {
    const content = await getOrInitAboutContent();
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Fetch AboutContent Error (returning default fallback):", error.message);
    res.json({
      success: true,
      data: defaultAboutData,
      isFallback: true
    });
  }
});

// 🔄 POST /api/about-content/reset - Reset to factory defaults
router.post("/reset", async (req, res) => {
  try {
    let doc = await AboutContent.findOne();
    if (doc) {
      Object.assign(doc, defaultAboutData);
      await doc.save();
    } else {
      doc = await AboutContent.create(defaultAboutData);
    }
    res.json({
      success: true,
      msg: "About section content reset to default successfully",
      data: doc
    });
  } catch (error) {
    console.error("Reset AboutContent Error:", error);
    res.status(500).json({ success: false, msg: "Failed to reset content: " + error.message });
  }
});

// ✏️ PUT /api/about-content - Update full about section content
router.put("/", async (req, res) => {
  try {
    const payload = req.body;
    let doc = await AboutContent.findOne();
    if (!doc) {
      doc = new AboutContent(defaultAboutData);
    }

    const allowedSections = [
      "topBanner",
      "hero",
      "stats",
      "story",
      "industries",
      "categories",
      "pillars",
      "values",
      "contact"
    ];

    allowedSections.forEach((sec) => {
      if (payload[sec] !== undefined) {
        doc[sec] = payload[sec];
      }
    });

    await doc.save();
    res.json({
      success: true,
      msg: "About content updated successfully",
      data: doc
    });
  } catch (error) {
    console.error("Update AboutContent Error:", error);
    res.status(500).json({ success: false, msg: "Failed to update: " + error.message });
  }
});

// ✏️ PUT /api/about-content/:section - Update specific about sub-section
router.put("/:section", async (req, res) => {
  try {
    const { section } = req.params;
    const allowedSections = [
      "topBanner",
      "hero",
      "stats",
      "story",
      "industries",
      "categories",
      "pillars",
      "values",
      "contact"
    ];

    if (!allowedSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Invalid section: ${section}` });
    }

    let doc = await getOrInitAboutContent();
    doc[section] = { ...doc[section].toObject(), ...req.body };
    await doc.save();

    res.json({
      success: true,
      msg: `${section} updated successfully`,
      data: doc[section]
    });
  } catch (error) {
    console.error(`Update About Section Error [${req.params.section}]:`, error);
    res.status(500).json({ success: false, msg: "Failed to update section: " + error.message });
  }
});

// ➕ POST /api/about-content/:section/item - Add item to list section
router.post("/:section/item", async (req, res) => {
  try {
    const { section } = req.params;
    const listSections = ["stats", "industries", "categories", "pillars", "values"];

    if (!listSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Section ${section} does not support item list operations.` });
    }

    const newItem = req.body;
    if (!newItem.id) {
      newItem.id = `${section}-${Date.now()}`;
    }

    let doc = await getOrInitAboutContent();
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

// ✏️ PUT /api/about-content/:section/item/:itemId - Update an item
router.put("/:section/item/:itemId", async (req, res) => {
  try {
    const { section, itemId } = req.params;
    const listSections = ["stats", "industries", "categories", "pillars", "values"];

    if (!listSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Section ${section} does not support item list operations.` });
    }

    let doc = await getOrInitAboutContent();
    if (!doc[section] || !Array.isArray(doc[section].items)) {
      return res.status(404).json({ success: false, msg: "No items found in section" });
    }

    const itemIndex = doc[section].items.findIndex((it) => it.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, msg: `Item with id ${itemId} not found.` });
    }

    doc[section].items[itemIndex] = {
      ...doc[section].items[itemIndex].toObject(),
      ...req.body,
      id: itemId
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

// ❌ DELETE /api/about-content/:section/item/:itemId - Delete an item
router.delete("/:section/item/:itemId", async (req, res) => {
  try {
    const { section, itemId } = req.params;
    const listSections = ["stats", "industries", "categories", "pillars", "values"];

    if (!listSections.includes(section)) {
      return res.status(400).json({ success: false, msg: `Section ${section} does not support item list operations.` });
    }

    let doc = await getOrInitAboutContent();
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
