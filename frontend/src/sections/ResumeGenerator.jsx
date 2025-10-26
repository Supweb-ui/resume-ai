import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./ResumeGenerator.css";

export default function ResumeGenerator() {
  const savedTemplate = localStorage.getItem("selectedTemplate") || "modern";

  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: "",
    achievements: "",
    certificates: "",
    template: savedTemplate,
  });

  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedId, setSavedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("selectedTemplate", form.template);
  }, [form.template]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Generate Resume
  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.skills) {
      setError("Please enter at least your name and skills.");
      return;
    }

    setLoading(true);
    setGenerated("");
    setSavedId(null);

    try {
      const token = localStorage.getItem("token");

      console.log("Sending data:", form); // 👈 Debug log

      const response = await axios.post(
        "http://localhost:5001/api/resume/generate",
        form, // ✅ send correct form data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedText =
        response.data.generated ||
        response.data.result ||
        response.data.generatedResume ||
        "No resume text received.";

      setGenerated(generatedText);
      if (response.data.id) setSavedId(response.data.id);
    } catch (err) {
      console.error("Resume generation error:", err);

      if (err.response) {
        setError(err.response.data?.error || "Backend error occurred.");
      } else if (err.request) {
        setError("Cannot reach backend. Please check if server is running.");
      } else {
        setError("Unexpected error: " + err.message);
      }

      // ✅ fallback summary
      setGenerated(
        `${form.name} — ${form.education || ""}. Experienced with ${
          form.skills || ""
        }. ${form.experience ? `Worked as ${form.experience}.` : ""}`
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginLeft = 40;
    let y = 40;

    doc.setFontSize(20);
    doc.text(form.name || "Your Name", marginLeft, y);
    y += 26;

    doc.setFontSize(11);
    doc.text(`Email: ${form.email || "-"}`, marginLeft, y);
    y += 18;

    doc.setFontSize(13);
    doc.text("Summary", marginLeft, y);
    y += 16;

    doc.setFontSize(10);
    const summary = generated || "AI summary will appear here after generation.";
    doc.text(doc.splitTextToSize(summary, 520), marginLeft, y);
    y += doc.getTextDimensions(doc.splitTextToSize(summary, 520)).h + 10;

    doc.setFontSize(12);
    doc.text("Education", marginLeft, y);
    y += 16;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(form.education || "-", 520), marginLeft, y);
    y += 30;

    doc.setFontSize(12);
    doc.text("Experience", marginLeft, y);
    y += 16;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(form.experience || "-", 520), marginLeft, y);
    y += 30;

    doc.setFontSize(12);
    doc.text("Skills", marginLeft, y);
    y += 16;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(form.skills || "-", 520), marginLeft, y);
    y += 30;

    doc.addPage();
    let y2 = 40;

    doc.setFontSize(12);
    doc.text("Achievements", marginLeft, y2);
    y2 += 16;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(form.achievements || "-", 520), marginLeft, y2);
    y2 += 40;

    doc.setFontSize(12);
    doc.text("Certificates", marginLeft, y2);
    y2 += 16;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(form.certificates || "-", 520), marginLeft, y2);

    const filename = `${(form.name || "resume").replace(/\s+/g, "_")}.pdf`;
    doc.save(filename);
  };

  return (
    <section className="resume-generator">
      {/* ---------- Form Section ---------- */}
      <div className="resume-form card">
        <h2>Resume Generator</h2>

        <form onSubmit={handleGenerate} style={{ display: "grid", gap: 12 }}>
          <input name="name" value={form.name} onChange={onChange} placeholder="Full name" className="input" />
          <input name="email" value={form.email} onChange={onChange} placeholder="Email (optional)" className="input" />
          <input name="education" value={form.education} onChange={onChange} placeholder="Education (degree, institution)" className="input" />
          <input name="experience" value={form.experience} onChange={onChange} placeholder="Experience (role, years)" className="input" />
          <input name="skills" value={form.skills} onChange={onChange} placeholder="Skills (comma separated)" className="input" />
          <textarea name="achievements" value={form.achievements} onChange={onChange} placeholder="Achievements" className="input" />
          <input name="certificates" value={form.certificates} onChange={onChange} placeholder="Certificates" className="input" />

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
            <span className="small" style={{ minWidth: 90 }}>Template</span>
            <select
              name="template"
              value={form.template}
              onChange={onChange}
              style={{ padding: 8, borderRadius: 8, flex: 1 }}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="creative">Creative</option>
            </select>
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </button>

            <button
              className="btn"
              type="button"
              onClick={() => {
                setForm({
                  name: "",
                  email: "",
                  education: "",
                  experience: "",
                  skills: "",
                  achievements: "",
                  certificates: "",
                  template: "modern",
                });
                setGenerated("");
                setError("");
                setSavedId(null);
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "inherit",
              }}
            >
              Reset
            </button>
          </div>

          {error && <div style={{ color: "#ff4d4d", marginTop: 6 }}>{error}</div>}
        </form>
      </div>

      {/* ---------- Preview Section ---------- */}
      <div className="resume-preview card">
        <h3>Preview</h3>

        <div style={{ marginBottom: 12 }}>
          <div className="preview-header">{form.name || "Your Name"}</div>
          <div className="preview-body" style={{ marginTop: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <strong>About</strong>
              <div className="small" style={{ marginTop: 6 }}>
                {generated || "AI summary will appear here after generation."}
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Education</strong>
              <div className="small">{form.education || "-"}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Experience</strong>
              <div className="small">{form.experience || "-"}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Skills</strong>
              <div className="small">{form.skills || "-"}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Achievements</strong>
              <div className="small">{form.achievements || "-"}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Certificates</strong>
              <div className="small">{form.certificates || "-"}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
          <button className="download-btn" onClick={downloadPDF} disabled={!generated && !form.name}>
            Download PDF
          </button>

          {savedId && (
            <button
              className="download-btn"
              style={{ background: "#22c55e" }}
              onClick={() => alert("Saved ID: " + savedId)}
            >
              Saved ✓
            </button>
          )}
        </div>
      </div>
    </section>
  );
}