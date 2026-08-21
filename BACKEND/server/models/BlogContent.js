const mongoose = require("mongoose");

const BlogContentSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: "Industrial Knowledge Hub" },
    title: { type: String, default: "Our Blog" },
    titleAccent: { type: String, default: "Blog" },
    subtitle: { type: String, default: "Engineering insights, technical application guides, and industrial innovation updates." }
  },
  featured: {
    eyebrow: { type: String, default: "PINNED_INTEL // EDITOR'S PICK" },
    unitTag: { type: String, default: "PRIORITY_TRANS // 0xAF92" },
    selectedPostId: { type: String, default: "3m-vhb-industrial-tapes-guide" },
    ctaText: { type: String, default: "Read Full Article" }
  },
  ticker: {
    enabled: { type: Boolean, default: true },
    label: { type: String, default: "LIVE_STREAM" },
    customMessage: { type: String, default: "" }
  }
}, {
  timestamps: true
});

const DEFAULT_BLOG_CONTENT = {
  hero: {
    badge: "Industrial Knowledge Hub",
    title: "Our Blog",
    titleAccent: "Blog",
    subtitle: "Engineering insights, technical application guides, and industrial innovation updates."
  },
  featured: {
    eyebrow: "PINNED_INTEL // EDITOR'S PICK",
    unitTag: "PRIORITY_TRANS // 0xAF92",
    selectedPostId: "3m-vhb-industrial-tapes-guide",
    ctaText: "Read Full Article"
  },
  ticker: {
    enabled: true,
    label: "LIVE_STREAM",
    customMessage: ""
  }
};

const BlogContent = mongoose.model("BlogContent", BlogContentSchema);

module.exports = {
  BlogContent,
  DEFAULT_BLOG_CONTENT
};
