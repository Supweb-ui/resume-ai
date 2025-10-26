import express from "express";
import jwt from "jsonwebtoken";
import Groq from "groq-sdk";
import Resume from "../models/Resume.js";

const router = express.Router();

// ✅ Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ Middleware: verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ Generate Resume Route
router.post("/generate", verifyToken, async (req, res) => {
  try {
    const { name, email, education, skills, experience, achievements, certificates } = req.body;

    // Check required fields
    if (!name || !skills) {
      return res.status(400).json({ error: "Missing required fields: name or skills" });
    }

    const prompt = `
    Generate a professional and well-structured resume for the following person:

    Name: ${name}
    Email: ${email || "N/A"}
    Education: ${education || "Not specified"}
    Experience: ${experience || "Not specified"}
    Skills: ${skills}
    Achievements: ${achievements || "N/A"}
    Certificates: ${certificates || "N/A"}

    Format the output as a proper professional resume text with sections.
    `;

    // ✅ Fixed model name
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ⚡ Updated, supported model
      messages: [{ role: "user", content: prompt }],
    });

    const resumeText =
      response.choices?.[0]?.message?.content || "AI failed to generate resume.";

    // ✅ Save to DB
    const resume = await Resume.create({
      user: req.user,
      content: resumeText,
    });

    res.json({ success: true, generated: resumeText, id: resume._id });
  } catch (err) {
    console.error("Resume generation error:", err);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

export default router;