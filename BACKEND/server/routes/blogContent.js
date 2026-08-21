const express = require("express");
const router = express.Router();
const { BlogContent, DEFAULT_BLOG_CONTENT } = require("../models/BlogContent");

// 🟢 GET /api/blog-content - Get full blog page configuration
router.get("/", async (req, res) => {
  try {
    let content = await BlogContent.findOne();
    if (!content) {
      content = await BlogContent.create(DEFAULT_BLOG_CONTENT);
    }
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error("Fetch Blog Content Error:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch blog content: " + error.message });
  }
});

// 💾 POST /api/blog-content - Save / Update full blog page configuration
router.post("/", async (req, res) => {
  try {
    const updateData = req.body;
    let content = await BlogContent.findOne();
    if (!content) {
      content = await BlogContent.create(updateData);
    } else {
      content = await BlogContent.findByIdAndUpdate(
        content._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      msg: "Blog page settings updated successfully",
      data: content
    });
  } catch (error) {
    console.error("Save Blog Content Error:", error);
    res.status(500).json({ success: false, msg: "Failed to save blog content: " + error.message });
  }
});

// 🔄 POST /api/blog-content/reset - Reset blog page configuration to defaults
router.post("/reset", async (req, res) => {
  try {
    let content = await BlogContent.findOne();
    if (content) {
      await BlogContent.findByIdAndUpdate(content._id, { $set: DEFAULT_BLOG_CONTENT });
    } else {
      await BlogContent.create(DEFAULT_BLOG_CONTENT);
    }

    res.json({
      success: true,
      msg: "Blog page settings reset to factory defaults",
      data: DEFAULT_BLOG_CONTENT
    });
  } catch (error) {
    console.error("Reset Blog Content Error:", error);
    res.status(500).json({ success: false, msg: "Failed to reset blog content: " + error.message });
  }
});

module.exports = router;
