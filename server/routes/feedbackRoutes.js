import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Save feedback
router.post("/", async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("Feedback save error:", err);
    res.status(500).json({ message: "Could not save feedback" });
  }
});

// Get all feedbacks (optional, for admin)
router.get("/", async (req, res) => {
  const feedbackList = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbackList);
});

export default router;
