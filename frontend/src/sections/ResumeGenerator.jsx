import React, { useState, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./ResumeGenerator.css";

export default function ResumeGenerator() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    education: "",
    experience: "",
    skills: "",
    achievements: "",
    certificates: "",
    projects: "",
    interests: "",
    summary: "",
    additional: "",
    objective: "",
    references: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("blue");
  const [template, setTemplate] = useState("A");
  const previewRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handlePhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      setPhotoPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleGenerate = async () => {
    setError("");
    if (!form.name || !form.skills) {
      setError("Please enter at least Name and Skills.");
      return;
    }

    setLoading(true);
    setResumeText("");

    try {
      const token = localStorage.getItem("token") || null;
      const res = await axios.post(
        "http://localhost:5001/api/resume/generate",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          timeout: 60000,
        }
      );

      if (res.data?.generated) {
        // Normalize whitespace and trim repeated blank lines
        const normalized = res.data.generated.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
        setResumeText(normalized);
      } else if (res.data?.error) {
        setError(res.data.error);
      } else {
        setError("No resume text received from server.");
        setResumeText(`${form.name} — Skilled in ${form.skills}.`);
      }
    } catch (err) {
      console.error("Resume generation error:", err);
      if (err.response) {
        setError(err.response.data?.error || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError("Cannot reach backend. Is it running on http://localhost:5001 ?");
      } else {
        setError("Unexpected: " + err.message);
      }

      // fallback simple preview
      setResumeText(`${form.name} — Skilled in ${form.skills}.`);
    } finally {
      setLoading(false);
    }
  };

  // PDF export using html2canvas + jsPDF — handles multi-page content
  const handleDownloadPDF = async () => {
    setError("");
    if (!previewRef.current) {
      setError("Nothing to export.");
      return;
    }

    try {
      const element = previewRef.current;

      // Use white background for capture to avoid semi-transparent artifacts
      const canvas = await html2canvas(element, {
        scale: 3, // high resolution
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // image size in mm (preserve aspect)
      const imgProps = { width: canvas.width, height: canvas.height };
      const imgWidthMM = pageWidth;
      const imgHeightMM = (imgProps.height * imgWidthMM) / imgProps.width;

      if (imgHeightMM <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidthMM, imgHeightMM);
      } else {
        // split canvas into pages
        let remainingPx = canvas.height;
        let positionPx = 0;
        const pxPerPage = Math.floor((canvas.width * pageHeight) / pageWidth);

        while (remainingPx > 0) {
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(pxPerPage, canvas.height - positionPx);
          const ctx = pageCanvas.getContext("2d");
          ctx.drawImage(canvas, 0, positionPx, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);
          const pageData = pageCanvas.toDataURL("image/png");
          const pageImgHeightMM = (pageCanvas.height * imgWidthMM) / pageCanvas.width;

          if (pdf.getNumberOfPages() > 0) pdf.addPage();
          pdf.addImage(pageData, "PNG", 0, 0, imgWidthMM, pageImgHeightMM);

          positionPx += pageCanvas.height;
          remainingPx -= pageCanvas.height;
        }
      }

      pdf.save(`${(form.name || "resume").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      setError("Failed to create PDF. Try again.");
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      website: "",
      education: "",
      experience: "",
      skills: "",
      achievements: "",
      certificates: "",
      projects: "",
      interests: "",
      summary: "",
      additional: "",
      objective: "",
      references: "",
    });
    setPhotoPreview(null);
    setResumeText("");
    setError("");
  };

  return (
    <section className={`resume-generator theme-${theme}`}>
      <div className="generator-form neon-border">
        <div className="top-row">
          <h2>Resume Generator</h2>
          <div className="controls">
            <select value={template} onChange={(e) => setTemplate(e.target.value)} title="Template">
              <option value="A">Template A</option>
              <option value="B">Template B</option>
              <option value="C">Template C</option>
              <option value="D">Template D</option>
              <option value="E">Template E</option>
            </select>

            <select value={theme} onChange={(e) => setTheme(e.target.value)} title="Theme">
              <option value="blue">Blue</option>
              <option value="dark">Dark</option>
              <option value="neon">Neon</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="red">Red</option>
              <option value="teal">Teal</option>
              <option value="gray">Gray</option>
            </select>
          </div>
        </div>

        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn" value={form.linkedin} onChange={handleChange} />
        <input name="website" placeholder="Website / Portfolio" value={form.website} onChange={handleChange} />
        <input name="education" placeholder="Education (e.g. BCA)" value={form.education} onChange={handleChange} />
        <input name="experience" placeholder="Experience (brief)" value={form.experience} onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
        <input name="additional" placeholder="Additional Information (optional)" value={form.additional} onChange={handleChange} />
        <textarea name="achievements" placeholder="Achievements (optional)" value={form.achievements} onChange={handleChange} />
        <textarea name="certificates" placeholder="Certificates (optional)" value={form.certificates} onChange={handleChange} />
        <textarea name="projects" placeholder="Projects (optional)" value={form.projects} onChange={handleChange} />
        <textarea name="interests" placeholder="Interests (optional)" value={form.interests} onChange={handleChange} />
        <textarea name="summary" placeholder="Professional Summary (optional)" value={form.summary} onChange={handleChange} />
        <textarea name="objective" placeholder="Career Objective (optional)" value={form.objective} onChange={handleChange} />
        <textarea name="references" placeholder="References (optional)" value={form.references} onChange={handleChange} />
        

        <label className="photo-upload">
          Upload photo (preview only)
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </label>

        <div className="button-row">
          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
          <button className="generate-btn alt" onClick={handleReset}>Reset</button>
        </div>

        {error && <div className="error-text">{error}</div>}
      </div>

      <div className="resume-preview">
        <div
          className={`resume-html template-${template}`}
          id="resume-content"
          ref={previewRef}
          role="region"
          aria-label="Resume preview"
        >
          <div className="left-section">
            <div className="photo-wrap">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="profile-photo" />
              ) : (
                <div className="profile-photo placeholder" />
              )}
            </div>

            <h2 className="left-name">{form.name || "Your Name"}</h2>

            <div className="left-box">
              <h3>Contact</h3>
              <div className="left-box">
              <p>📧 {form.email || "-"}</p>
              <p>📞 {form.phone || "-"}</p>
              <p>🔗 {form.website || "-"}</p>
              <p>📍 {form.address || "-"}</p>
              <p>💼 {form.linkedin || "-"}</p>
            </div>
              
              <p className="small-break">{form.website || "-"}</p>
            </div>
            <div className="left-box">
              <h3>Skills</h3>
              <ul>
                {(form.skills || "").split(",").filter(Boolean).map((s, i) => <li key={i}>{s.trim()}</li>)}
                {!form.skills && <li>-</li>}
              </ul>
            </div>

            <div className="left-box">
              <h3>interests</h3>
              <ul>
                {(form.interests || "").split(",").filter(Boolean).map((s, i) => <li key={i}>{s.trim()}</li>)}
                {!form.interests && <li>-</li>}
              </ul>
            </div>

            <div className="left-box">
              <h3>Languages</h3>
              <ul>
                <li>English</li>
                <li>Hindi</li>
                <li>Marathi</li>
                <li>Spanish</li>
                <li>French</li>
                <li>German</li>
                <li>Chinese</li>
                <li>Japanese</li>
                <li>Russian</li>
              </ul>
            </div>
          </div>

          <div className="right-section">
            <h1 className="right-name">{form.name || "Your Name"}</h1>
            <div className="subtitle">{form.education || ""}</div>

            <div className="right-box">
              <h2>Profile</h2>
              <p style={{ whiteSpace: "pre-line" }}>{resumeText || `Short summary will appear here after generation.`}</p>
            </div>

            <div className="right-box">
              <h2>Work Experience</h2>
              <div className="item">
                <h3>{form.experience || "-"}</h3>
              </div>
            </div>

            <div className="right-box">
              <h2>Achievements</h2>
              <p>{form.achievements || "-"}</p>
            </div>

            <div className="right-box">
              <h2>Certificates</h2>
              <p>{form.certificates || "-"}</p>
            </div>
            <div className="right-box">
              <h2>Additional Information</h2>
              <p>{form.additional || "-"}</p>
            </div>
            <div className="right-box">
              <h2>Project</h2>
              <p>{form.projects || "-"}</p>
            </div>
            <div className="right-box">
              <h2>References</h2>
              <p>{form.references || "-"}</p>
            </div>


            {/* Download button stays visible below content */}
            <div className="download-wrap">
              <button className="download-btn" onClick={handleDownloadPDF} disabled={!resumeText && !form.name}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}