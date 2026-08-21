require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect securely via environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("CRITICAL SECURITY WARNING: MONGODB_URI is not set in environment variables!");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
}

app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/inquiry", require("./routes/inquiry"));
app.use("/api/home-content", require("./routes/homeContent"));
app.use("/api/about-content", require("./routes/aboutContent"));
app.use("/api/products", require("./routes/products"));
app.use("/api/blog-posts", require("./routes/blogPosts"));
app.use("/api/blog-content", require("./routes/blogContent"));

// Only listen to port if run directly (local development)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;