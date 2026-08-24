const express = require("express");
const router = express.Router();
const { ContactContent, DEFAULT_CONTACT_CONTENT } = require("../models/ContactContent");

// 🟢 GET /api/contact-content - Get full contact page configuration
router.get("/", async (req, res) => {
  try {
    let content = await ContactContent.findOne();
    if (!content) {
      content = await ContactContent.create(DEFAULT_CONTACT_CONTENT);
    }
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Fetch Contact Content Error:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch contact content: " + error.message });
  }
});

// 💾 POST /api/contact-content - Save / Update full contact page configuration
router.post("/", async (req, res) => {
  try {
    const updateData = req.body;
    let content = await ContactContent.findOne();
    if (!content) {
      content = await ContactContent.create(updateData);
    } else {
      content = await ContactContent.findByIdAndUpdate(
        content._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      msg: "Contact page settings updated successfully",
      data: content
    });
  } catch (error) {
    console.error("Save Contact Content Error:", error);
    res.status(500).json({ success: false, msg: "Failed to save contact content: " + error.message });
  }
});

// 🔄 POST /api/contact-content/reset - Reset contact page configuration to defaults
router.post("/reset", async (req, res) => {
  try {
    let content = await ContactContent.findOne();
    if (content) {
      await ContactContent.findByIdAndUpdate(content._id, { $set: DEFAULT_CONTACT_CONTENT });
    } else {
      await ContactContent.create(DEFAULT_CONTACT_CONTENT);
    }

    res.json({
      success: true,
      msg: "Contact page settings reset to factory defaults",
      data: DEFAULT_CONTACT_CONTENT
    });
  } catch (error) {
    console.error("Reset Contact Content Error:", error);
    res.status(500).json({ success: false, msg: "Failed to reset contact content: " + error.message });
  }
});

module.exports = router;
