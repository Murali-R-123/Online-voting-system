// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Default route
app.get("/", (req, res) => res.send("Server is running..."));

// Register routes (ALL before app.listen)
app.use("/api/users", userRoutes);
app.use("/api/elections", electionRoutes);

//feedback route
app.use("/api/feedback", feedbackRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


