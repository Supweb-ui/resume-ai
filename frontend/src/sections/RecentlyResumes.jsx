import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentlyResumes.css";

export default function RecentlyResumes() {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedResumes")) || [];
    setResumes(data);
  }, []);

  const openResume = (resume) => {
    localStorage.setItem("resumeForm", JSON.stringify(resume.form));
    localStorage.setItem("aiText", resume.aiText);
    localStorage.setItem("resumePhoto", resume.photoPreview);
    localStorage.setItem("selectedTemplate", resume.template);
    navigate("/generate");
  };
  const deleteResume = (id) => {
    const updatedResumes = resumes.filter((r) => r.id !== id);
    setResumes(updatedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
  };
  const filteredResumes = resumes.filter((r) => r.form.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="recent-container">
      <h2 className="recent-title">Recently Created Resumes</h2>
      <input
        type="text"
        placeholder="Search by name..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      

      <div className="recent-list">
        {filteredResumes.length === 0 ? (
          <p>No resumes found </p>
        ) : (
          filteredResumes.map((r) => (
            <div key={r.id} className="recent-card">
              <img
                src={r.resumeImage}
                alt="resume"
                className="recent-image"
              />

              <div className="recent-info">
                <div className="recent-name">{r.form.name}</div>
                <div className="recent-date">{r.createdAt}</div>
              </div>

              <button className="open-btn" onClick={() => openResume(r)}>
                Open & Edit
              </button>
              <button className="delete-btn" onClick={() => deleteResume(r.id)}>
                Delete
              </button>
              <button className="preview-btn" onClick={() => setPreviewImg(r.resumeImage)}>
                Preview
              </button>
            </div>
          ))
        )}
      </div>
      {previewImg && (
        <div className="preview-modal" onClick={() => setPreviewImg(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
          <img src={previewImg} alt="Preview" className="preview-image" />
          <button className="close-btn" onClick={() => setPreviewImg(null)}>
            ✖
          </button>
        </div>
        </div>
      )}
    </div>
  );
}