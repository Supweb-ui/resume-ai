import dotenv from "dotenv";
import Groq from "groq-sdk";
import Resume from "../models/Resume.js";

dotenv.config();

// Initialize Groq client with API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Generate resume using Groq AI
export const generateResume = async (req, res, groq) => {
  try {
    const { name, email, education, skills, experience } = req.body;

    if (!name || !skills)
      return res.status(400).json({ error: "Missing required fields" });

    const prompt = `
    Create a professional resume for:
    Name: ${name}
    Email: ${email}
    Education: ${education}
    Skills: ${skills}
    Experience: ${experience}
    `;

    const completion = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0]?.message?.content || "No response from Groq";

    res.json({ success: true, resume: text });
  } catch (error) {
    console.error("❌ Error generating resume:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
};