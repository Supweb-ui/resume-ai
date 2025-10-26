// index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("✅ Resume AI Backend with MongoDB + Groq is Running!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});