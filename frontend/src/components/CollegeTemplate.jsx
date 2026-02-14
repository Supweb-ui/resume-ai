import React from "react";
import "./CollegeTemplate.css";

export default function CollegeTemplate({ form, photoPreview, aiSections }) {
  return (
    <div className="college-template">

      {/* ===== COLLEGE HEADER ===== */}
      <div className="college-top-header">
        <h2>SSBES’ INSTITUTE OF TECHNOLOGY & MANAGEMENT</h2>
        <p>Beside Kusum Auditorium, VIP Road, Nanded (Maharashtra) – 431602</p>
        <p>Institute Website: http://www.ssbesitm.org</p>
        <p>TPO Mob No.: +91-9766013868 | TPO Email: placements@ssbesitm.org</p>
      </div>

      {/* ===== PROFILE HEADER ===== */}
      <div className="college-profile-header">

        <div className="college-photo">
          {photoPreview ? (
            <img src={photoPreview} alt="profile" />
          ) : (
            <div className="photo-placeholder"></div>
          )}
        </div>

        <div className="college-header-text">
          <h1>{form.name || "Your Name"}</h1>
          <p>
            {aiSections?.profile || form.summary || "Profile summary will appear here"}
          </p>
        </div>

      </div>

      {/* ===== BODY ===== */}
      <div className="college-body">

        {/* LEFT COLUMN */}
        <div className="college-left">

          <section>
            <h2>CONTACT</h2>
            <p>📞 {form.phone || "-"}</p>
            <p>📧 {form.email || "-"}</p>
            <p>📍 {form.address || "-"}</p>
            <p>🔗 {form.linkedin || "-"}</p>
          </section>

          <section>
            <h2>SKILLS</h2>
            <p><strong>Programming Languages:</strong> {form.programmingLanguages || "-"}</p>
            <p><strong>Web Development:</strong> {form.webDevelopment || "-"}</p>
            <p><strong>Database Management:</strong> {form.databaseManagement || "-"}</p>
            <p><strong>Additional Skills:</strong> {form.additionalSkills || "-"}</p>
          </section>

          <section>
            <h2>INTERESTS</h2>
            <ul>
              {(form.interests || "").split(",").filter(Boolean).map((s, i) => (
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Personal Details</h2>
            <p><strong>Date of Birth:</strong> {form.dob || "-"}</p>
            <p><strong>Gender:</strong> {form.gender || "-"}</p>
            <p><strong>Marital Status:</strong> {form.marital || "-"}</p>
            <p><strong>Nationality:</strong> {form.nationality || "-"}</p>
            <p><strong>Languages Known:</strong> {form.languages || "-"}</p>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="college-right">

          <section>
            <h2>EDUCATIONAL QUALIFICATION</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              {aiSections?.education || form.education || "-"}
            </p>
          </section>

          <section>
            <h2>PROJECTS COMPLETED</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              {aiSections?.projects || form.projects || "-"}
            </p>
          </section>

          <section>

            <section>
              <h2>Work Experience</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {aiSections?.experience || form.experience || "-"}
              </p>
            </section>

            <section>
              <h2>Certifications</h2>
              <p style={{ whiteSpace: "pre-line" }}>
                {aiSections?.certificates || form.certificates || "-"}
              </p>
            </section>
            <h2>References</h2>

            <div className="ref-item">
              <p><strong>1. {form.ref1Name || "Reference Person Name"}</strong></p>
              <p> {form.ref1Position || "Position / Designation"}</p>
              <p> {form.ref1Company || "Company Name"}</p>
              <p>Contact No: {form.ref1Contact || "-"}</p>
              <p>Email: {form.ref1Email || "-"}</p>
            </div>

            <div className="ref-item">
              <p><strong>2. {form.ref2Name || "Reference Person Name"}</strong></p>
              <p>{form.ref2Position || "Position / Designation"}</p>
              <p>{form.ref2Company || "Company Name"}</p>
              <p>Contact No: {form.ref2Contact || "-"}</p>
              <p>Email: {form.ref2Email || "-"}</p>
            </div>
          </section>

          

        </div>

      </div>
    </div>
  );
}