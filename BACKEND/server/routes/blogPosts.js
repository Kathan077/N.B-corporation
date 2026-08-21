const express = require("express");
const router = express.Router();
const { BlogPost } = require("../models/BlogPost");

// 🟢 GET /api/blog-posts - Get all blog articles
router.get("/", async (req, res) => {
  try {
    const { category, search, activeOnly } = req.query;
    const query = {};

    if (activeOnly === "true") {
      query.isActive = true;
    }

    if (category && category !== "ALL" && category !== "all") {
      query.category = new RegExp(category, "i");
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { category: searchRegex },
        { excerpt: searchRegex },
        { author: searchRegex }
      ];
    }

    const posts = await BlogPost.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error("Fetch Blog Posts Error:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch blog posts: " + error.message });
  }
});

// 🟢 GET /api/blog-posts/:id - Get single blog article
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findOne({ id: id });

    if (!post) {
      return res.status(404).json({ success: false, msg: "Blog post not found" });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error("Fetch Single Blog Post Error:", error);
    res.status(500).json({ success: false, msg: "Failed to fetch blog post: " + error.message });
  }
});

// ➕ POST /api/blog-posts - Create a new blog article
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.title) {
      return res.status(400).json({ success: false, msg: "Article title is required" });
    }

    if (!data.id) {
      data.id = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    const existing = await BlogPost.findOne({ id: data.id });
    if (existing) {
      data.id = `${data.id}-${Date.now().toString().slice(-4)}`;
    }

    const count = await BlogPost.countDocuments();
    data.order = count + 1;

    const newPost = await BlogPost.create(data);

    res.status(201).json({
      success: true,
      msg: "Blog post created successfully",
      data: newPost
    });
  } catch (error) {
    console.error("Create Blog Post Error:", error);
    res.status(500).json({ success: false, msg: "Failed to create blog post: " + error.message });
  }
});

// ✏️ PUT /api/blog-posts/:id - Update blog article
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const post = await BlogPost.findOneAndUpdate(
      { id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, msg: "Blog post not found" });
    }

    res.json({
      success: true,
      msg: "Blog post updated successfully",
      data: post
    });
  } catch (error) {
    console.error("Update Blog Post Error:", error);
    res.status(500).json({ success: false, msg: "Failed to update blog post: " + error.message });
  }
});

// ❌ DELETE /api/blog-posts/:id - Delete blog article
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BlogPost.findOneAndDelete({ id: id });

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Blog post not found" });
    }

    res.json({
      success: true,
      msg: `Blog post '${deleted.title}' deleted successfully`,
      data: deleted
    });
  } catch (error) {
    console.error("Delete Blog Post Error:", error);
    res.status(500).json({ success: false, msg: "Failed to delete blog post: " + error.message });
  }
});

// 🔄 POST /api/blog-posts/seed - Bulk seed blog posts
router.post("/seed", async (req, res) => {
  try {
    const { posts, overwrite = false } = req.body;

    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ success: false, msg: "Please provide an array of posts to seed" });
    }

    if (overwrite) {
      await BlogPost.deleteMany({});
    }

    let insertedCount = 0;
    let updatedCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      if (!p.id) {
        p.id = (p.title || `post-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }
      p.order = i + 1;

      const existing = await BlogPost.findOne({ id: p.id });
      if (existing) {
        Object.assign(existing, p);
        await existing.save();
        updatedCount++;
      } else {
        await BlogPost.create(p);
        insertedCount++;
      }
    }

    const total = await BlogPost.countDocuments();

    res.json({
      success: true,
      msg: `Seeding completed: ${insertedCount} added, ${updatedCount} updated. Total articles in DB: ${total}`,
      count: total
    });
  } catch (error) {
    console.error("Bulk Seed Blog Posts Error:", error);
    res.status(500).json({ success: false, msg: "Failed to seed blog posts: " + error.message });
  }
});

module.exports = router;
