import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaApple, FaGooglePlay } from "react-icons/fa6";
import {Link} from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      {/* Award Badge */}
      <footer className="resumeio-footer">

      {/* MAIN FOOTER TOP */}
      <div className="footer-links">
        <div className="footer-section">
          <h1>ResumeAI🚀</h1>
        </div>
        <div>
          <h4>RESUME</h4>
           <p>All Resume Builder</p>
           <Link to="/ats-score"><p>ATS Score</p></Link>
           <Link to="/resume-examples"><p>Resume Examples</p></Link>
          <Link to="/resume-templates"><p>Resume Templates</p></Link>
        </div>

        <div>
          <h4>COVER LETTER</h4>
          <Link to="/cover-letter-templates"><p>Cover Letter Templates</p></Link>
          <Link to="/cover-letter-examples"><p>Cover Letter Examples</p></Link>
          <Link to="/cover-letter-writing-guide"><p>Writing Guide</p></Link>
        </div>

        <div>
          <h4>JOB SEEKERS</h4>
          <Link to="/job-search"><p>Job Search</p></Link>
          <p>Career Blog</p>
          <Link to="/resume-help"><p>Resume Help</p></Link>
          <Link to="/interview-tips"><p>Interview Tips</p></Link>
        </div>

        <div>
          <h4>OUR COMPANY</h4>
          <Link to="/about-us"><p>About Us</p></Link>
          <Link to="/pricing"><p>Pricing</p></Link>
          <p>Updates</p>
          <Link to="/privacy"><p>Privacy Policy</p></Link>
          <Link to="/terms"><p>Terms of Service</p></Link>
        </div>
      </div>

      {/* LOWER SECTION (COUNTRY + SOCIAL MEDIA) */}
      <div className="lower-footer">
        <div className="country-select">
          <p>🌍 SELECT YOUR COUNTRY</p>
          <select>
            <option>International</option>
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
          </select>
        </div>

        <div className="social-follow">
          <p>JOIN US ON SOCIAL MEDIA</p>

          <div className="icons">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
            </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
            </a>
          
            <a href="https://wa.me/yourphonenumber" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© 2025 ResumeAI — All Rights Reserved.</p>
      </div>

    </footer>
    </footer>
  );
};

export default Footer;