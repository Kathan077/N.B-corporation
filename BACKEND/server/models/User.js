const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: {
    type: String,
    unique: true
  },
  otp: String,
  otpExpiry: Date
});

module.exports = mongoose.model("User", userSchema);