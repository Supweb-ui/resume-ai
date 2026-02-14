import React from "react";
import "./NewImageTemplate.css";


export default function NewImageTemplate({ form, photoPreview, aiSections }) {
  return (
    <div className="new-template">

      {/* HEADER */}
      <div className="new-header">
        <div className="photo-circle">
          {photoPreview ? (
            <img src={photoPreview} alt="profile" />
          ) : (
            <div className="photo-placeholder" />
          )}
        </div>

        <div className="header-text">
          <h1>{form.name || "Your Name"}</h1>
          <h3>{form.jobTitle || "Job Title"}</h3>
        </div>
      </div>

      {/* BODY */}
      <div className="new-body">

        {/* LEFT COLUMN */}
        <div className="new-left">

          <section>
           <h2>CONTACT</h2>
            <div className="contact-item">📧 {form.email || "-"}</div>
            <div className="contact-item">📞 {form.phone || "-"}</div>
            <div className="contact-item">📍 {form.address || "-"}</div>
            <div className="contact-item">🔗 {form.linkedin || "-"}</div>
            <div className="contact-item">💻 {form.github || "-"}</div>
          </section>

          <section>
            <h2>Profile Summary</h2>
            <p>{aiSections?.profile || form.summary || "-"}</p>
          </section>

          <section>
            <h2>Skills</h2>
            <ul>
              {(form.programmingLanguages || "").split(",").filter(Boolean).map((s,i)=>(
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Languages</h2>
            <ul>
              {(form.languages || "").split(",").filter(Boolean).map((s,i)=>(
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Hobbies</h2>
            <ul>
              {(form.hobbies || "").split(",").filter(Boolean).map((s,i)=>(
                <li key={i}>{s.trim()}</li>
              ))}
            </ul>
          </section>

          {/* PERSONAL DETAILS */}
          <section>
            <h2>Personal Details</h2>
            <p><strong>Date of Birth:</strong> {form.dob || "-"}</p>
            <p><strong>Gender:</strong> {form.gender || "-"}</p>
            <p><strong>Marital Status:</strong> {form.marital || "-"}</p>
            <p><strong>Nationality:</strong> {form.nationality || "-"}</p>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="new-right">

          <section>
            <h2>Professional Experience</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.experience || form.experience || "-"}
            </p>
          </section>

          <section>
            <h2>Projects</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.projects || form.projects || "-"}
            </p>
          </section>

          <section>
            <h2>Education</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.education || form.education || "-"}
            </p>
          </section>

          <section>
            <h2>Achievements</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.achievements || form.achievements || "-"}
            </p>
          </section>

          <section>
            <h2>Certificates</h2>
            <p style={{whiteSpace:"pre-line"}}>
              {aiSections?.certificates || form.certificates || "-"}
            </p>
          </section>

          <section>
            <h2>References</h2>

            <div className="ref-item">
              <p><strong>1. {form.ref1Name || "Reference Person Name"}</strong></p>
              <p>{form.ref1Position || "Position / Designation"}</p>
              <p>{form.ref1Company || "Company Name"}</p>
              <p>Contact No: {form.ref1Contact || "-"}</p>
            </div>
          </section>
            
          


        </div>

      </div>
    </div>
  );
}