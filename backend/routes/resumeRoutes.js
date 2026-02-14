import express from "express";
import jwt from "jsonwebtoken";
import Groq from "groq-sdk";
import Resume from "../models/Resume.js";

const router = express.Router();


// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Optional token verification
const verifyTokenOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
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
    console.warn("Invalid JWT, continuing as unauthenticated:", err.message);
    req.user = null;
    return next();
  }
};

// ------------------------------
//   POST: /api/resume/generate
// ------------------------------
router.post("/generate", verifyTokenOptional, async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      phone = "",
      website = "",
      education = "",
      experience = "",
      programmingLanguages = "",
      webDevelopment = "",
      databaseManagement = "",
      additionalSkills = "",
      achievements = "",
      certificates = "",
      additional = "",
      projects ="",
    } = req.body ?? {};

    // Required fields check
    if (!name || !programmingLanguages) {
      return res.status(400).json({ error: "Missing required fields: name or programmingLanguages" });
    }

    // Prompt
    const prompt = `
You are an expert resume writer.

IMPORTANT RULES:
- Return ONLY content under each heading.
- DO NOT repeat headings like PROFILE, EXPERIENCE, EDUCATION, etc.
- DO NOT add extra headings.
- DO NOT add separators or lines.
- Use clear bullet points.
- Keep content short, clean, and professional.
- Also include a brief in BBA, MCA, MBA, HSC,BCA in as per the candidate's education and experience in resume.

Candidate Information:
Name: ${name}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
Website: ${website || "N/A"}

Education:
${education}

Experience:
${experience}

programming Languages:
${programmingLanguages}

Web Development:
${webDevelopment}

Database Management:
${databaseManagement}

Additional Skills:
${additionalSkills}

Achievements:
${achievements}

Certificates:
${certificates}

Additional Information:
${additional}

Projects:
${projects}

OUTPUT FORMAT (IMPORTANT):
PROFILE
Highly motivated and detail-oriented individual seeking a challenging position to utilize my skills and contribute to organizational success.
About BCA and web development.
When user input another education like BBA, MCA, MBA, HS then dont mention BCA in profile and write about that education.
• 2–4 bullet points

EXPERIENCE
• FRESHER / INTERN
• 2–4 bullet points

EDUCATION
• BCA (Bachelor of Computer Applications) — SRTUMN (2023 – 2026)
• Completed HSC in Science Stream from Shri Datt College , Hadgoan in 2023 securing Second Class with 57.80% marks.
• Completed SSC from People High School , Nanded in 2021 securing First Class with 84% marks.

ACHIEVEMENTS
• Bullet points

CERTIFICATES
as per user input and whenever user not mention about certificates then as per education mention below certificate.
• Bullet points

ADDITIONAL Information
• MS-CIT
• Certification of Internship on Web Development from Elevate Labs.
Generate the resume content based on the above information.

Projects
• As per user input about projects then show user inputed project related infrmation and if user not mention about projects then write below points in projects.
• Resume AI - An AI-powered resume builder web application.
AI-Powered Resume Builder — A web application that allows users to generate professional resumes using AI. It provides multiple templates, real-time preview, data forms, and automatic formatting using React and Node.js.
features:
- User Authentication (Signup/Login)
- Multiple Resume Templates
- Real-time Resume Preview
- AI-Powered Content Generation
- Downloadable Resumes in PDF Format
- Responsive Design for Mobile and Desktop


`;

    // Groq API call
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 900,
    });

    // Extract model output safely
    let generatedText = null;

    if (response?.choices?.[0]?.message?.content) {
      // If returned as single string
      generatedText = response.choices[0].message.content.trim();
    } else if (Array.isArray(response?.choices?.[0]?.message?.content)) {
      // If returned as array (Groq sometimes does this)
      generatedText = response.choices[0].message.content.map(c => c.text).join("\n").trim();
    }

    if (!generatedText) {
      return res.status(500).json({ error: "AI returned empty output." });
    }

    // Save to MongoDB
    const saved = await Resume.create({
      user: req.user,
      content: generatedText,
      createdAt: new Date(),
    });

    return res.json({
      success: true,
      generated: generatedText,
      id: saved._id,
    });

  } catch (err) {
    console.error("resume/generate ERROR:", err);
    return res.status(500).json({
      error: "Server error while generating resume",
      details: err?.message || String(err),
    });
  }
});

export default router;