// src/sections/ResumeGenerator.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import NewImagetemplate from "../components/NewImageTemplate";
import ProfessionalTemplate from "../components/ProfessionalTemplate";
import CollegeTemplate from "../components/CollegeTemplate";


import "./ResumeGenerator.css";

export default function ResumeGenerator() {
  const [form, setForm] = useState(() => {
  const saved = localStorage.getItem("resumeForm");
  return saved ? JSON.parse(saved) : {
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
  };
});
  

  const [photoPreview, setPhotoPreview] = useState(() => localStorage.getItem("resumePhoto") || null);
  const [aiText, setAiText] = useState(() => { return localStorage.getItem("aiText") || "";});
  const [template, setTemplate] = useState(() => localStorage.getItem("selectedTemplate") || "modern");
  const [colorTheme, setColorTheme] = useState("blue");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const previewRef = useRef(null);
  useEffect(() => {
  localStorage.setItem("resumeForm", JSON.stringify(form));
}, [form]);
useEffect(() => {
  localStorage.setItem("aiText", aiText);
}, [aiText]);

  // Simple section parser: looks for common uppercase headings or known keywords,
  // accumulates following lines into that section. Returns an object of section_key -> text.
  function parseSections(text) {
    if (!text) return {};
    const known = new Set([
      "PROFILE","SUMMARY","EXPERIENCE","WORK EXPERIENCE","PROJECTS","EDUCATION",
      "CERTIFICATES","CERTIFICATIONS","ACHIEVEMENTS","SKILLS","ADDITIONAL",
      "OBJECTIVE","REFERENCES","PERSONAL INFORMATION"
    ]);

    const lines = text.split("\n");
    const sections = {};
    // default starting section
    let current = "summary";
    sections[current] = "";

    for (let raw of lines) {
      const line = raw.trim();
      if (line === "") {
        // preserve paragraph breaks
        if (sections[current].length) sections[current] += "\n";
        continue;
      }

      const upper = line.toUpperCase();
      // treat known headings or very short uppercase lines as section headings
      if (known.has(upper) || (line.length <= 40 && /^[A-Z0-9 &-]+$/.test(line))) {
        const key = upper.toLowerCase().replace(/\s+/g, "_");
        if (!sections[key]) sections[key] = "";
        current = key;
        continue;
      }

      // append content to current section
      sections[current] += (sections[current].length ? "\n" : "") + line;
    }

    return sections;
  }

  // text input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };
    const handleSaveResume = async () => {
  const savedResumes = JSON.parse(localStorage.getItem("savedResumes")) || [];
  const canvas = await html2canvas(previewRef.current);
  const resumePreviewImage = canvas.toDataURL("image/png");

  const newResume = {
    id: Date.now(),
    form: form,
    aiText: aiText,
    resumeImage: resumePreviewImage,
    template: template,
    createdAt: new Date().toLocaleString()
  };

  savedResumes.push(newResume);
  localStorage.setItem("savedResumes", JSON.stringify(savedResumes));

  alert("Resume saved successfully ✅");
};
  // local photo preview only (not uploaded to backend)
  const handlePhoto = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    setPhotoPreview(ev.target.result);
    localStorage.setItem("resumePhoto", ev.target.result);
  };
  reader.readAsDataURL(f);
};
const handleGenerate = async () => {
  setError("");
  if (!form.name || !form.programmingLanguages) {
    setError("Please enter at least Name and Skills.");
    return;
  }

  setLoading(true);
  setAiText("");

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
      // Step 1: Normalize clean text
      const normalized = res.data.generated
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/^(#+\s*)+/gm, "")
        .trim();

      // Step 2: Remove duplicate headings
      const lines = normalized.split("\n");
      const cleanedLines = [];
      const seenHeadings = new Set();

      for (let ln of lines) {
        const t = ln.trim();
        if (t === "") {
          cleanedLines.push("");
          continue;
        }

        // Uppercase short headings
        if (t.length <= 40 && /^[A-Z0-9 &-]+$/.test(t)) {
          const key = t.toLowerCase();
          if (!seenHeadings.has(key)) {
            seenHeadings.add(key);
            cleanedLines.push(ln);
          }
        } else {
          cleanedLines.push(ln);
        }
      }

      const cleanedText = cleanedLines.join("\n").trim();

      // Step 3: Parse correct sections
      parseSections(cleanedText);

      // Step 4: SAVE parsed sections in state
      // Step 4: parsed sections are available in 'sections' (not stored in state)
      // (Optional) store raw text also
      setAiText(cleanedText);
    } 
    else if (res.data?.error) {
      setError(res.data.error);
    } 
    else {
      setError("No resume text received from server.");
      setAiText(`${form.name} — Skilled in ${form.skills}.`);
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
    setAiText(`${form.name} — Skilled in ${form.skills}.`);
  } finally {
    setLoading(false);
  }
};

  // PDF export using html2canvas + jsPDF with high scale and slicing to avoid blur & extra pages
  const handleDownloadPDF = async () => {
    setError("");
    if (!previewRef.current) {
      setError("Nothing to export.");
      return;
    }

    try {
      const element = previewRef.current;

      // Ensure the resume area has explicit width matching CSS A4 width (794px) when capturing
      // Capture with a high scale for crispness
      const canvas = await html2canvas(element, {
        scale: 3.5, // high scale for crisp text
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
          ctx.drawImage(
            canvas,
            0,
            positionPx,
            canvas.width,
            pageCanvas.height,
            0,
            0,
            canvas.width,
            pageCanvas.height
          );
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
  const handleDownloadDOCX = async () => {
  try {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: form.name || "Your Name", bold: true, size: 32 })] }),
            new Paragraph(""),

            new Paragraph("Profile Summary"),
            new Paragraph(aiSections?.profile || form.summary || "-"),

            new Paragraph("Work Experience"),
            new Paragraph(aiSections?.experience || form.experience || "-"),

            new Paragraph("Projects"),
            new Paragraph(aiSections?.projects || form.projects || "-"),

            new Paragraph("Education"),
            new Paragraph(aiSections?.education || form.education || "-"),

            new Paragraph("Skills"),
            new Paragraph(`Programming: ${form.programmingLanguages || "-"}`),
            new Paragraph(`Web: ${form.webDevelopment || "-"}`),
            new Paragraph(`Database: ${form.databaseManagement || "-"}`),
            new Paragraph(`Additional: ${form.additionalSkills || "-"}`),

            new Paragraph("Achievements"),
            new Paragraph(form.achievements || "-"),

            new Paragraph("Certificates"),
            new Paragraph(form.certificates || "-"),

            new Paragraph("Additional"),
            new Paragraph(form.additional || "-"),

            new Paragraph("References"),
            new Paragraph(`1. ${form.ref1Name || "-"}`),
            new Paragraph(`2. ${form.ref2Name || "-"}`)
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${(form.name || "resume").replace(/\s+/g, "_")}.docx`);
  } catch (err) {
    console.error("DOCX error:", err);
    setError("Failed to create DOCX file.");
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
      programmingLanguages: "",
      webDevelopment: "",
      databaseManagement: "",
      additionalSkills: "",
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
    setAiText("");
    setError("");
  };

  // Parse AI-generated text into sections for preview
  const aiSections = parseSections(aiText);

  return (
    
    <section className="resume-generator">
      {/* LEFT FORM */}
      <div className="generator-form neon-border" aria-hidden={false}>
        <div className="top-row">
          <h2>Resume Generator</h2>
        </div>
        <div className="template-row">
          <label>Choose Template:</label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
           <option value="modern">Modern</option>
           <option value="classic">Classic</option>
           <option value="college">College</option>
           <option value="professional">Professional</option>
           <option value="newimage">NewImage</option>
          </select>
        </div>
        <div className="color-row">
          <label>Color Theme:</label>
          <select value={colorTheme} onChange={(e) => setColorTheme(e.target.value)}>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
          </select>
        </div>

        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn" value={form.linkedin} onChange={handleChange} />
        <input name="website" placeholder="Website / Portfolio" value={form.website} onChange={handleChange} />
        <input name="education" placeholder="Education (e.g. BCA)" value={form.education} onChange={handleChange} />
        <input name="experience" placeholder="Experience (brief)" value={form.experience} onChange={handleChange} />
        <input name="programmingLanguages" placeholder="Programming Languages (comma separated)" value={form.programmingLanguages} onChange={handleChange} />
        <input name="webDevelopment" placeholder="Web Development Skills (comma separated)" value={form.webDevelopment} onChange={handleChange} />
        <input name="databaseManagement" placeholder="Database Management Skills (comma separated)" value={form.databaseManagement} onChange={handleChange} />
        <input name="additionalSkills" placeholder="Additional Skills (comma separated)" value={form.additionalSkills} onChange={handleChange} />
        <input name="languages" placeholder="Languages (comma separated)" value={form.languages} onChange={handleChange} />
        
        <input name="projects" placeholder="Projects (brief)" value={form.projects} onChange={handleChange} />
        <input name="interests" placeholder="Interests (comma separated)" value={form.interests} onChange={handleChange} />
        <input name="hobbies" placeholder="Hobbies (comma separated)" value={form.hobbies} onChange={handleChange} />
        <input name="jobTitle" placeholder="Job Title (optional)" value={form.jobTitle} onChange={handleChange} />
        <input name="additional" placeholder="Additional info (optional)" value={form.additional} onChange={handleChange} />
        <input name="objective" placeholder="Objective (optional)" value={form.objective} onChange={handleChange} />
        <input name="dob" placeholder="Date of Birth" value={form.dob} onChange={handleChange} />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
        <input name="marital" placeholder="Marital Status" value={form.marital} onChange={handleChange} />
        <input name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} />

        <input name="ref1Name" placeholder="Reference 1 - Name" value={form.ref1Name} onChange={handleChange} />
        <input name="ref1Position" placeholder="Reference 1 - Position" value={form.ref1Position} onChange={handleChange} />
        <input name="ref1Company" placeholder="Reference 1 - Company" value={form.ref1Company} onChange={handleChange} />
        <input name="ref1Contact" placeholder="Reference 1 - Contact" value={form.ref1Contact} onChange={handleChange} />

        <input name="ref2Name" placeholder="Reference 2 - Name" value={form.ref2Name} onChange={handleChange} />
        <input name="ref2Position" placeholder="Reference 2 - Position" value={form.ref2Position} onChange={handleChange} />
        <input name="ref2Company" placeholder="Reference 2 - Company" value={form.ref2Company} onChange={handleChange} />
        <input name="ref2Contact" placeholder="Reference 2 - Contact" value={form.ref2Contact} onChange={handleChange} />
        <textarea name="summary" placeholder="Professional summary (optional)" value={form.summary} onChange={handleChange} />
        <textarea name="achievements" placeholder="Achievements (optional)" value={form.achievements} onChange={handleChange} />
        <textarea name="certificates" placeholder="Certificates (optional)" value={form.certificates} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handlePhoto} className="photo-upload" />

        <div className="button-row">
          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
          <button className="generate-btn alt" onClick={handleReset}>
            Reset
          </button>
          <button className="generate-btn alt" onClick={handleSaveResume}>
            Save Resume 
            </button>
        </div>

        {error && <div className="error-text">{error}</div>}
      </div>

      {/* RIGHT PREVIEW */}
      <div className="resume-preview">
        {/* NEW IMAGE TEMPLATE */}
        {template === "newimage" ? (
          <div className="new-image-template" ref={previewRef} id="resume-content" >
            <NewImagetemplate form={form} aiSections={aiSections} 
            photoPreview={photoPreview}/>
          </div>
        ) : template === "professional" ? (
          <div className="professional-template" ref={previewRef} id="resume-content" >
            <ProfessionalTemplate form={form} aiSections={aiSections} 
            photoPreview={photoPreview}/>
          </div>
        ) : template === "college" ? (
          <div className="college-template" ref={previewRef} id="resume-content" >
            <CollegeTemplate form={form} aiSections={aiSections} photoPreview={photoPreview} />
          </div>
        ):
        (

          /* Default template preview */
          <div className="resume-html" id="resume-content" ref={previewRef} style={{ borderColor: colorTheme }}>

        
            
        {/* the A4-style resume that will be captured */}
                  

          {/* LEFT SIDEBAR */}
          <aside className="left-section" aria-hidden={false}>
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="profile-photo" />
            ) : (
              <div className="profile-photo placeholder" />
            )}

            <h2 className="left-name">{form.name || "Your Name"}</h2>

            <div className="left-box">
              <h3>Contact</h3>
              <div className="left-box contact-list">
                <div className="left-box contact-item email">
                  <span className="icon" dangerouslySetInnerHTML={{__html: emailSVG}} />
                  <p>{form.email || "-"}</p>
                </div>
                <div className="left-box contact-item phone">
                  <span className="icon" dangerouslySetInnerHTML={{__html: phoneSVG}} />
                  <p>{form.phone || "-"}</p>
                </div>
                <div className="left-box contact-item website">
                  <span className="icon" dangerouslySetInnerHTML={{__html: linkSVG}} />
                  <p style={{wordBreak: "break-word"}}>{form.website || "-"}</p>
                </div>
                <div className="left-box contact-item location">
                  <span className="icon" dangerouslySetInnerHTML={{__html: locationSVG}} />
                  <p>{form.address || "-"}</p>
                </div>
                <div className="left-box contact-item linkedin">
                  <span className="icon" dangerouslySetInnerHTML={{__html: linkedinSVG}} />
                  <p>{form.linkedin || "-"}</p>
                  
                </div>
              </div>
            </div>

            {/* Left side skills section  */}
            <section className="left-box skills-item">
            <h3>Skills</h3>
            <p><strong>Programming Languages:</strong> {form.programmingLanguages || "-"}</p>
            <p><strong>Web Development:</strong> {form.webDevelopment || "-"}</p>
            <p><strong>Database Management:</strong> {form.databaseManagement || "-"}</p>
            <p><strong>Additional Skills:</strong> {form.additionalSkills || "-"}</p>
            </section>

            <div className="left-box">
              <h3>Interests</h3>
              <ul>
                {(form.interests || "").split(",").filter(Boolean).map((s, i) => <li key={i}>{s.trim()}</li>)}
                {!form.interests && <li>-</li>}
              </ul>
            </div>
  <div className="spacer" />
  <div className="left-box">
    <h3>Languages</h3>
    <ul>
      {(form.languages || "").split(",").filter(Boolean).map((s, i) => <li key={i}>{s.trim()}</li>)}
      {!form.languages && <li>-</li>}
    </ul>
  </div>

  {/* LEFT SIDE - additional personal information */}
  <section className="left-box personal-info-item">
  <h2>Personal Information</h2>
  <p><strong>Date of Birth:</strong> {form.dob || "-"}</p>
  <p><strong>Gender:</strong> {form.gender || "-"}</p>
  <p><strong>Marital Status:</strong> {form.marital || "-"}</p>
  <p><strong>Nationality:</strong> {form.nationality || "-"}</p>
  <p><strong>Languages Known:</strong> {(form.languages || "-")}</p>
</section>
</aside>

          {/* RIGHT CONTENT */}
<main className="right-section">

  {/* NAME */}
  <h1 className="right-name">{form.name || "Your Name"}</h1>



  <section className="right-box summary-item">
  <h2>Profile Summary</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.profile || form.summary || "A short professional summary will appear here."}
  </p>
</section>

  <section className="right-box experience-item">
  <h2>Work Experience</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.experience || form.experience || "-"}
  </p>
</section>

  {/* PROJECTS */}
  <section className="right-box projects-item">
  <h2>Projects</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.projects || form.projects || "-"}
  </p>
</section>

  {/* EDUCATION */}
  <section className="right-box education-item">
  <h2>Education</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.education || form.education || "-"}
  </p>
</section>

  {/* CERTIFICATIONS */}
  <section className="right-box certifications-item">
  <h2>Certifications</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.certificates || form.certificates || "-"}
  </p>
</section>

  {/* ACHIEVEMENTS */}
  <section className="right-box achievements-item">
  <h2>Achievements</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.achievements || form.achievements || "-"}
  </p>
</section>

  {/* ADDITIONAL */}
  <section className="right-box additional-item">
  <h2>Additional</h2>
  <p style={{ whiteSpace: "pre-line" }}>
    {aiSections?.additional || form.additional || "-"}
  </p>
</section>


          {/* RIGHT SIDE */}
  <section className="right-box reference-section">
  <h2>References</h2>

  <div className="ref-item">
    <p><strong>1. {form.ref1Name || "Reference Person Name"}</strong></p>
    <p>{form.ref1Position || "Position / Designation"}</p>
    <p>{form.ref1Company || "Company Name"}</p>
    <p>Contact No: {form.ref1Contact || "-"}</p>
  </div>

  <div className="ref-item">
    <p><strong>2. {form.ref2Name || "Reference Person Name"}</strong></p>
    <p>{form.ref2Position || "Position / Designation"}</p>
    <p>{form.ref2Company || "Company Name"}</p>
    <p>Contact No: {form.ref2Contact || "-"}</p>
  </div>
</section>

          </main>
        </div>
        )}

        {/* Download button OUTSIDE preview so it is always visible */}
        <div className="button-row spacer" style={{ width: 794, marginTop: 14 }}>
          <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
          <div className="spacer" />
          <button className="download-btn" onClick={handleDownloadDOCX}>Download DOCX</button>
        </div>
      </div>
    </section>
  );
}

/* ----- Inline SVG icons used in preview (keeps component self-contained) ----- */
/* Placed at bottom so they are available inside component closure */
const emailSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d6ecff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4h16v16H4z" fill="none"></path>
  <polyline points="22,6 12,13 2,6"></polyline>
</svg>`;
const phoneSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d6ecff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19 19 0 0 1 3 4.11 1 1 0 0 1 4 3h4.09a1 1 0 0 1 1 .75 12 12 0 0 0 .7 2.81 1 1 0 0 1-.22 1L8.91 9.91a16 16 0 0 0 6.18 6.18l1.34-1.34a1 1 0 0 1 1-.22 12 12 0 0 0 2.81.7 1 1 0 0 1 .75 1V21z"></path>
</svg>`;
const linkSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d6ecff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L9.93 5.93"></path>
  <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.41a5 5 0 0 0 7.07 7.07L14 18.07"></path>
</svg>`;
const locationSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d6ecff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
  <circle cx="12" cy="10" r="3"></circle>
</svg>`;
const linkedinSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d6ecff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-14h4v2"></path>
  <rect x="2" y="9" width="4" height="11"></rect>
  <circle cx="4" cy="4" r="2"></circle>
</svg>`;