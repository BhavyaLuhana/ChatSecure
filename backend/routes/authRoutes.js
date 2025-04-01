require("dotenv").config(); // Ensure environment variables are loaded
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Check if JWT_SECRET is loaded correctly
if (!SECRET_KEY) {
  console.error("ERROR: JWT_SECRET is missing from .env");
  process.exit(1); // Exit if secret key is missing
}

const generateToken = (id) => {
  try {
    console.log("Generating token with SECRET_KEY:", SECRET_KEY); // Debugging log

    return jwt.sign({ id }, SECRET_KEY, { expiresIn: "30d" });
  } catch (error) {
    console.error("JWT Signing Error:", error);
    throw new Error("Failed to generate authentication token.");
  }
};

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Verify user credentials
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

module.exports = router;
