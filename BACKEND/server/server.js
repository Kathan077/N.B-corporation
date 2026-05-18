require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kathanpatel099_db_user:kathanapate12@cluster0.r70sqps.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/auth", require("./routes/auth"));

// Only listen to port if run directly (local development)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;