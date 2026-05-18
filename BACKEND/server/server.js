const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect("mongodb+srv://kathanpatel099_db_user:kathanapate12@cluster0.r70sqps.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => console.log("Server running on 5000"));