const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  heading: { type: String, default: "" },
  body: { type: String, default: "" }
}, { _id: false });

const BlogPostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  category: { type: String, required: true, default: "INDUSTRIAL TAPES" },
  excerpt: { type: String, default: "" },
  author: { type: String, default: "Kathan Patel" },
  role: { type: String, default: "Technical Solutions Lead, N.B. Corp" },
  date: { type: String, default: "MAR 22, 2026" },
  readTime: { type: String, default: "8 MIN" },
  views: { type: String, default: "1.2K" },
  image: { type: String, default: "" },
  summary: { type: String, default: "" },
  sections: [SectionSchema],
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = {
  BlogPost
};
