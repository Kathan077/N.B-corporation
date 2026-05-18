const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const exist = await User.findOne({ mobile });
    if (exist) return res.status(400).json({ msg: "User exists" });

    await User.create({ name, email, mobile });

    res.json({ msg: "Registered Successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});


// 📲 SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ msg: "User not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("OTP:", otp);

    res.json({ msg: "OTP sent", otp });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});


// ✅ VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "Wrong or missing OTP" });
    }

    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
});

// 🔒 AUTH MIDDLEWARE
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// 👤 GET USER INFO
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-otp -otpExpiry");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;