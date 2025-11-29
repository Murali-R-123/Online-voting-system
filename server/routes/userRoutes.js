import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

//register
router.post("/register", async (req, res) => {
  console.log("Incoming signup data:", req.body);
  try {
    const { voterId, name, address, email, password, role } = req.body;
    console.log("Parsed values:", voterId, name, address, password, role);

    const existingUser = await User.findOne({ voterId });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      voterId,
      name,
      address,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log("✅ User registered:", newUser.voterId);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});



// Login
router.post("/login", async (req, res) => {
  try {
    const { voterId, password } = req.body;

    const user = await User.findOne({ voterId });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ role: user.role, voterId: user.voterId });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;

