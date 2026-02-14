import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import temp1 from "../assets/template1.jpg";
import temp2 from "../assets/template2.jpg";
import temp3 from "../assets/template3.jpg";
import temp5 from "../assets/template5.jpg";
import temp6 from "../assets/template6.jpg";
import temp7 from "../assets/template7.jpg";
import temp8 from "../assets/template8.jpg";
import temp9 from "../assets/template9.jpg";
import temp12 from "../assets/template12.jpg";

import temp18 from "../assets/template18.jpg";
import temp20 from "../assets/template20.jpg";
import temp21 from "../assets/template21.jpg";
import temp22 from "../assets/template22.jpg";
import temp23 from "../assets/template23.jpg";
import temp24 from "../assets/template24.jpg";
import resume1 from "../assets/resume1.jpg";
import resume2 from "../assets/resume2.jpg";
import resume3 from "../assets/resume3.jpg";
import layout1 from "../assets/layout1.jpg";
import layout2 from "../assets/layout2.jpg";
import layout3 from "../assets/layout3.jpg";
import layout4 from "../assets/layout4.jpg";
import layout5 from "../assets/layout5.jpg";
import layout6 from "../assets/layout6.jpg";
import preview1 from "../assets/preview1.jpg";
import preview2 from "../assets/preview2.jpg";
import preview3 from "../assets/preview3.jpg";
import preview4 from "../assets/preview4.jpg";




import "./Home.css";

const images = [
  temp12,
  temp8,
  temp9,
];
const previewImages = [
  preview1,
  preview2,
  preview3,
  preview4
]


function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className={`faq-item ${isOpen ? "open" : ""}`}>
      <h3
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}>
        {question}
      </h3>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
}


export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  const prev = () => {
  setPreviewIndex((p) => (p - 1 + previewImages.length) % previewImages.length);
};

const next = () => {
  setPreviewIndex((p) => (p + 1) % previewImages.length);
};
  

useEffect(() => {
  const interval = setInterval(() => {
    setPreviewIndex((p) => (p + 1) % previewImages.length);
  }, 6000); // Every 3 seconds

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  

  return (
    <div className="home-container ">
      
      {/* ---------- HERO SECTION ---------- */}
      
    <section className="hero">

  {/* LEFT CONTENT */}
  <div className="hero-content">
    <h1 className="shine-text">
      India's Top <br /> Resume Templates
    </h1>

    <p>
      Get the job 2x as fast. Use recruiter-approved templates and 
      step-by-step content recommendations to create a new resume 
      or optimize your current one.
    </p>

    <div className="buttons">
  <button 
    className="btn primary"
    onClick={() => navigate("/generate")}
  >
    Create new resume
  </button>

  <button 
    className="btn secondary"
    onClick={() => navigate("/optimize")}
  >
    Optimize my resume
  </button>
</div>

    <div className="rating">
      <img src={temp8} alt="reviews" />
      <span>4.5 out of 5 based on 15,575 reviews</span>
    </div>
  </div>

  {/* RIGHT RESUME PREVIEW */}
  <div className="hero-image">
    <img src={temp18} alt="Resume show" className="resume-show" />
  </div>

</section>

      <section className="home-preview-section">

      {/* Top area: preview (left) + heading + action pills (right) */}
      <div className="top-area">
        <div className="preview-area">
          <button className="arrow left" onClick={prev} aria-label="prev">❮</button>

          <div className="preview-frame">
            <img src={previewImages[previewIndex]} alt="resume preview" />
          </div>

          <button className="arrow right" onClick={next} aria-label="next">❯</button>
        </div>

        <div className="headline-area">
          <h1 className="headline">
            Create resumes that get noticed — <span>simple, easy, fast, free</span>
          </h1>

          <p className="subtext">
            Instantly create professional resumes and cover letters with AI & templates.
            Pick a tool and start — preview updates live on the right.
          </p>

          <div className="action-pills">
            <button className="pill primary">AI writer</button>
            <button className="pill">Resume builder</button>
            <button className="pill">Sample</button>
            <button className="pill">Cover letter</button>

          </div>

          {/* small dots / pagination under headline */}
          <div className="preview-dots">
            {previewImages.map((_, i) => (
              <button
                key={i}
                className={"dot " + (i === previewIndex ? "active" : "")}
                onClick={() => setPreviewIndex(i)}
                aria-label={`preview ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* ---------- TEMPLATES PREVIEW ---------- */}
      {/* ---------- TEMPLATES PREVIEW ---------- */}
<section className="templates-preview fade-in" id="templates">
  <h2>Resume Templates Preview</h2>
  <div className="slider-container">
    <div className="slider-track">
      <div className="template-card ">
        <div className="template-thumb temp1">
          <img src={temp1} alt="Modern Template" />
        </div>
        <p>Modern Template</p>
      </div>
      <div className="template-card">
        <div className="template-thumb temp2">
          <img src={temp2} alt="Classic Template" />
        </div>
        <p>Classic Template</p>
      </div>
      <div className="template-card">
        <div className="template-thumb temp3">
          <img src={temp3} alt="Creative Template" />
        </div>
        <p>Creative Template</p>
      </div>
      <div className="template-card">
        <div className="template-thumb temp4">
          <img src={temp5} alt="Professional Template" />
        </div>
        <p>Professional Template</p>
      </div>
      {/* repeat for infinite effect */}
      <div className="template-card">
        <div className="template-thumb temp1">
          <img src={temp6} alt="Modern Template" />
        </div>
        <p>Modern Template</p>
      </div>
      <div className="template-card">
        <div className="template-thumb temp2">
          <img src={temp7} alt="Classic Template" />
        </div>
        <p>Classic Template</p>
      </div>
    </div>
  </div>
  </section>
  
  <div className="resume-section">

  {/* LEFT SIDE TEXT */}
  <div className="left-text">
    <h1>Every detail on your resume, built to perfection</h1>
    <p>Our resume templates are based on what employers actually look for in a candidate. How do we know?We've talked with thousand of employers to get the answer.</p>

    <Link to="/generate" className="cta-btn">
        Create my resume
      </Link>
  </div>

  {/* RIGHT SIDE SLIDER */}
  <div className="right-slider">

    <button className="arrow-btn left" onClick={prev}>◀</button>

    <div className="slider-card">
      <img
        src={previewImages[previewIndex]}
        className="slider-img"
        alt="resume"
      />
    </div>

    <button className="arrow-btn right" onClick={next}>▶</button>

    <div className="dots">
      {previewImages.map((_, i) => (
        <span key={i} className={`dot ${i === previewIndex ? "active" : ""}`}></span>
      ))}
    </div>

  </div>

</div>
  
      
<section className="feature-section">

  {/* ---- Row 1 ---- */}
  <div className="feature-row">
    <div className="feature-card">
      <div className="feature-img">
        <img src={layout1} alt="" />
      </div>
      <h3>100% Free download</h3>
      <p>Ability to download and print resumes in PDF and TXT formats.</p>
    </div>

    <div className="feature-card">
      <div className="feature-img">
        <img src={layout3} alt="" />
      </div>
      <h3>Pre-written examples</h3>
      <p>Over 100+ tailored examples to boost your resume quality.</p>
    </div>

    <div className="feature-card">
      <div className="feature-img">
        <img src={layout2} alt="" />
      </div>
      <h3>Intuitive to use</h3>
      <p>Easily organize and customize with drag-and-drop simplicity.</p>
    </div>
  </div>

  {/* ---- Row 2 ---- */}
  <div className="feature-row">
    <div className="feature-card">
      <div className="feature-img">
        <img src={layout4} alt="" />
      </div>
      <h3>Know your progress</h3>
      <p>Stay on track throughout the resume-building process.</p>
    </div>

    <div className="feature-card">
      <div className="feature-img">
        <img src={layout6} alt="" />
      </div>
      <h3>Helpful tips</h3>
      <p>Guidance from experts to improve your resume easily.</p>
    </div>

    <div className="feature-card">
      <div className="feature-img">
        <img src={layout5} alt="" />
      </div>
      <h3>Upload resume</h3>
      <p>Upload and enhance your existing resume.</p>
    </div>
  </div>

</section>

<section className="trusted-section">
  <p className="trusted-text">
    Trusted by <strong>6M+</strong> professionals from companies across the world
  </p>

  <div className="carousel">
    <div className="carousel-track">
      <img src={temp20} alt="Apple" />
      <img src={temp21} alt="Statefarm" />
      <img src={temp22} alt="Walmart" />
      <img src={temp23} alt="Georgia Tech" />
      <img src={temp24} alt="Deloitte" />

      {/* duplicates for infinite loop */}
      <img src={temp20} alt="Apple" />
      <img src={temp21} alt="Statefarm" />
      <img src={temp22} alt="Walmart" />
      <img src={temp23} alt="Georgia Tech" />
      <img src={temp24} alt="Deloitte" />
    </div>
  </div>
</section>
{/* ---------- WHY BUILD WITH RESUMEAI SECTION ---------- */}
<section className="why-section fade-in" id="why">
  <h2 className="why-title">Why build your resume with ResumeAI?</h2>

  <div className="why-container">

    <div className="why-box">
      <img src="https://cdn-icons-png.flaticon.com/512/2331/2331949.png" alt="Free Icon" />
      <h3>We’re actually free</h3>
      <p>
        No gimmicks, no premium traps — everything you need to build
        a professional resume completely free.
      </p>
    </div>

    <div className="why-box">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="Templates Icon" />
      <h3>Data-Driven Templates</h3>
      <p>
        Our templates are designed based on what top employers look for.
        Clean design with hiring success in mind.
      </p>
    </div>

    <div className="why-box">
      <img src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png" alt="Visibility Icon" />
      <h3>Get Seen</h3>
      <p>
        Share your resume easily with interested employers and boost
        your chances of landing interviews.
      </p>
    </div>

  </div>
</section>
{/* ---------- CALL TO ACTION (CTA) SECTION ---------- */}
<section className="cta-section fade-in">
  <div className="cta-box">

    {/* Left Column */}
    <div className="cta-left">
      <h2>
        Start building your resume today,<br />
        land your dream job tomorrow
      </h2>

      <Link to="/generate" className="cta-btn">
        Create my resume
      </Link>
    </div>

    {/* Right Column - Resume Images */}
    <div className="hero-right">
  <div className="slideshow">
    {images.map((img, index) => (
      <img
        key={index}
        src={img}
        className={`slide ${index === currentIndex ? "active" : ""}`}
        alt="Resume Slide"
      />
    ))}
  </div>
</div>

  </div>
</section>

<div className="resume-hero-container">
  <div className="resume-stack">
    <img
      src={resume1}
      className="resume-card card-1"
      alt="Resume 1"
    />
     
    <img
      src={resume2}
      className="resume-card card-2"
      alt="Resume 2"
    />

    <img
      src={resume3}
      className="resume-card card-3"
      alt="Resume 3"
    />

  </div>
</div>
  

    {/* ---------- FAQ ---------- */}
      {/* ---------- FAQ ---------- */}
<section className="faq-section fade-in" id="faq">
  <h2 className="faq-title">Frequently Asked Questions</h2>

  <div className="faq-wrapper">

    {[
      {
      q: "Do I need a different resume for every different job application?",
      a:
        "Yes. Every job has different requirements. You don’t need a completely new resume, but you must tailor the content for each job. Adjust skills, experience, and highlights according to the role."
    },
    {
      q: "How do I choose the right resume template?",
      a:
        "Select a template that matches your job field and personality. Ensure it is clean, ATS-friendly, and easy to read for recruiters and hiring systems."
    },
    {
      q: "What does ATS-friendly mean?",
      a:
        "ATS friendly means a resume that can be read by Applicant Tracking Systems. Simple formatting, clear headings, and standard fonts help your resume pass ATS screening."
    },
    {
      q: "Free resume builder doesn’t usually mean free. Does this site sell my information?",
      a:
        "No. Our resume builder never sells your personal information. All your data stays private and secure."
    },
    {
      q: "Can I have my resume reviewed when I’ve finished building?",
      a:
        "Yes. You can download, preview, and improve your resume instantly with our AI-based suggestions."
    },
    {     
       q: "Can I edit my resume after downloading?",
      a:
        "Yes. You can always return to your saved resumes, make edits, and download updated versions anytime."
    },
    {
      q: "Is my personal data secure on this platform?",
      a:
        "Absolutely. We prioritize your privacy and use robust security measures to protect your data."
    },
    {
      q: "Can I use ResumeAI on my mobile device?",
      a:
        "Yes. ResumeAI is fully responsive and works seamlessly on smartphones and tablets."
    },
    {
      q: "Are there any limitations on the number of resumes I can create?",
      a:
        "No. You can create and save as many resumes as you need without any restrictions."
    },
    {
      q: "What if I need help or support?",
      a:
        "You can reach out to our support team via the contact section on the website. We’re here to help!"
    }
    ].map((faq, i) => (
      <FAQItem key={i} question={faq.q} answer={faq.a} />
    ))}

  </div>
</section>
      

      
    </div>
  );

}

