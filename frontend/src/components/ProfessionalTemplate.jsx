import React from "react";
import "./ProfessionalTemplate.css";

export default function ProfessionalTemplate({ form, photoPreview, aiSections }) {
  return (
    <div className="professional-template">

      {/* HEADER */}
      <div className="pro-header">
        <div className="pro-photo">
          {photoPreview ? (
            <img src={photoPreview} alt="profile" />
          ) : (
            <div className="photo-placeholder"></div>
          )}
        </div>

        <div className="pro-header-text">
          <h1>{form.name || "Your Name"}</h1>
          <h3>{form.jobTitle || "Job Title"}</h3>
          <p>{aiSections?.profile || form.summary || "Profile summary will appear here"}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="pro-body">

        {/* LEFT COLUMN */}
        <div className="pro-left">

          <section>
            <h2>CONTACT</h2>
            <div className="contact-item">📧 {form.email || "-"}</div>
            <div className="contact-item">📞 {form.phone || "-"}</div>
            <div className="contact-item">📍 {form.address || "-"}</div>
            <div className="contact-item">🔗 {form.linkedin || "-"}</div>
            <div className="contact-item">💻 {form.github || "-"}</div>
          </section>

          <section>
            <h2>SKILLS</h2>
            <ul>
              {(form.programmingLanguages|| "").split(",").filter(Boolean).map((s,i)=>(
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>LANGUAGES</h2>
            <ul>
              {(form.languages || "").split(",").filter(Boolean).map((s,i)=>(
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>INTERESTS</h2>
            {(form.interests || "").split(",").filter(Boolean).map((s,i)=>(
              <div className="interest-box" key={i}>{s.trim()}</div>
            ))}
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="pro-right">

          <section>
            <h2 className="pro-title">EDUCATION</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.education || form.education || "-"}
            </p>
          </section>

          <section>
            <h2 className="pro-title">PROFESSIONAL EXPERIENCE</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.experience || form.experience || "-"}
            </p>
          </section>

          <section>
            <h2 className="pro-title">PROJECTS</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.projects || form.projects || "-"}
            </p>
          </section>

          <section>
            <h2 className="pro-title">ADDITIONAL</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.organizations || form.additional || "-"}
            </p>
          </section>

          <section>
            <h2 className="pro-title">CERTIFICATES</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.certificates || form.certificates || "-"}
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}