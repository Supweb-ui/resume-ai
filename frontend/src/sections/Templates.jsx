import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Templates.css";


 // we’ll add animation here


      

// ✅ Import images (make sure they’re in src/assets/)
import temp1 from "../assets/template1.jpg";
import temp2 from "../assets/template2.jpg";
import temp3 from "../assets/template3.jpg";

const Templates = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const navigate = useNavigate(); // navigation hook

  const templates = [
    {
      id: 1,
      title: "Modern Resume",
      desc: "A clean and elegant resume design perfect for professionals.",
      img: temp1,
      value: "modern",
    },
    {
      id: 2,
      title: "Creative Resume",
      desc: "Stand out with a colorful and artistic resume template.",
      img: temp2,
      value: "creative",
    },
    {
      id: 3,
      title: "Classic Resume",
      desc: "A traditional, well-structured resume format for formal jobs.",
      img: temp3,
      value: "classic",
    },
  ];

  // ✅ Function to handle template selection
  const handleUseTemplate = (template) => {
    localStorage.setItem("selectedTemplate", template.value);
    navigate("/generate"); // redirect to resume generator page
  };

  return (
    <section className="templates" id="templates">
      <h2>Resume Templates</h2>
      <p>Choose from beautifully designed templates and start building your resume today!</p>

      {/* ---------- Templates Grid ---------- */}
      <div className="template-grid">
        {templates.map((temp) => (
          <div className="template-card" key={temp.id}>
            <img src={temp.img} alt={temp.title} className="template-img" />
            <h3>{temp.title}</h3>
            <p>{temp.desc}</p>
            <div className="btn-group">
              <button className="btn-primary" onClick={() => handleUseTemplate(temp)}>
                Use This Template
              </button>
              <button className="btn-preview" onClick={() => setPreviewImg(temp.img)}>
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Preview Modal ---------- */}
      {previewImg && (
        <div className="preview-modal" onClick={() => setPreviewImg(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewImg} alt="Template Preview" />
            <button className="close-btn" onClick={() => setPreviewImg(null)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Templates;