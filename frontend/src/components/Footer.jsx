import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaApple, FaGooglePlay } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      {/* Award Badge */}
      <div className="footer-badge">
        <p>2025 Latest</p>
        <p>Resume AI</p>
      </div>

      {/* Review Text */}
      <div className="footer-review">
        <p>Resume AI Customer Choice 5 Time Winner (2024–2025)</p>
        <p>
          EXCELLENT ⭐⭐⭐⭐☆ 16,412 reviews on <span>Trustpilot</span>
        </p>
      </div>

      <div className="footer-divider"></div>

      {/* Social Links */}
      <div className="footer-social">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaXTwitter /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaPinterestP /></a>
        
      </div>

      {/* App Store Icons */}
      <div className="footer-apps">
        <FaApple />
        <FaGooglePlay />
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <a href="#">Sitemap</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Accessibility</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Help Center</a>
        <a href="#">Contact Us</a>
      </div>

      {/* Copyright */}
      <p className="footer-copy">© 2025, Bold Limited. All rights reserved.</p>
    </footer>
  );
};

export default Footer;