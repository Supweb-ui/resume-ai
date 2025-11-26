import express from "express";
import jwt from "jsonwebtoken";
import Groq from "groq-sdk";
import Resume from "../models/Resume.js";

const router = express.Router();

// Initialize Groq client (make sure GROQ_API_KEY is set)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Optional verifyToken middleware: if token present verify it, else allow unauthenticated generation
const verifyTokenOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // no token — continue but set req.user = null
    req.user = null;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id || decoded.sub || null;
    return next();
  } catch (err) {
    // If token invalid, don't block; just treat as unauthenticated (avoid 401 while testing)
    console.warn("Invalid JWT, continuing as unauthenticated:", err.message || err);
    req.user = null;
    return next();
  }
};

// POST /api/resume/generate
router.post("/generate", verifyTokenOptional, async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      phone = "",
      website = "",
      education = "",
      experience = "",
      skills = "",
      achievements = "",
      certificates = "",
    additional = "",
    
    } = req.body ?? {};

    // Basic validation
    if (!name || !skills) {
      return res.status(400).json({ error: "Missing required fields: name or skills" });
    }

    // Build a clear prompt that requests a two-column-looking resume text (we return plain text)
    const prompt = `
You are an expert resume writer. Produce a clean, professional resume in plain text using sections.
Return only plain text (no HTML). Use headings and bullet points.
Target style: two-column print-friendly resume with a left column for contact & skills and a right column for profile & experience.

Candidate details:
Name: ${name}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
Website: ${website || "N/A"}
Additional: ${additional || "N/A"}

Education:
${education || "Not provided"}

Experience:
${experience || "Not provided"}


Achievements:
${achievements || "None"}

Certificates:
${certificates || "None"}

Additional Qualifications:
${additional || "None"}

Output example:
NAME
Contact: ...

---
PROFILE:
- short bullet sentences

EXPERIENCE:
- Company / Role — Month Year to Month Year
  • bullet
  • bullet


EDUCATION:
- BCA, SSBE'S INSTITUTE OF TECHNOLOGY AND MANAGEMENT , NANDED — 2026

ACHIEVEMENTS:
- achievement1
- achievement2

Additional Qualifications:
- qualification1
- other qualificationS:
- skill1
- skill2
- skill3



Make the text concise, with bullets and clear headings.
`;

    // Call Groq chat completion
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 900,
    });

    const generatedText = response?.choices?.[0]?.message?.content?.trim?.() ?? null;

    if (!generatedText) {
      return res.status(500).json({ error: "AI did not return content." });
    }

    // Save to DB
    const saved = await Resume.create({
      user: req.user,
      content: generatedText,
      createdAt: new Date(),
    });

    return res.json({ success: true, generated: generatedText, id: saved._id });
  } catch (err) {
    console.error("resume/generate error:", err);
    // return helpful error for debugging
    return res.status(500).json({
      error: "Server error while generating resume",
      details: err?.message || String(err),
    });
  }
});

export default router;