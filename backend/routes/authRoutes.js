const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const { sanitizeEmail } = require("../path-to-your-main-server-file"); // Import the sanitize function

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔹 Log original and sanitized email
    const sanitizedEmail = sanitizeEmail(email);
    console.log(`📝 **Signup Request** - Original Email: ${email}, Sanitized Email: ${sanitizedEmail}`);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in the User model
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    // 🔹 **Create a new collection dynamically**
    const dynamicCollectionName = sanitizedEmail; // Use sanitized email for collection name
    console.log(`📂 Creating collection: ${dynamicCollectionName}`);

    const dynamicSchema = new mongoose.Schema({}, { strict: false });
    const DynamicModel = mongoose.model(dynamicCollectionName, dynamicSchema, dynamicCollectionName);

    await DynamicModel.create({ message: "New Employee Data Collection Created" });

    res.status(201).json({ 
      message: "User registered successfully",
      sanitizedEmail: sanitizedEmail // Optionally return to client
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Log original and sanitized email
    const sanitizedEmail = sanitizeEmail(email);
    console.log(`🔐 **Login Attempt** - Original Email: ${email}, Sanitized Email: ${sanitizedEmail}`);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      token, 
      role: user.role,
      sanitizedEmail: sanitizedEmail // Optionally return to client
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;