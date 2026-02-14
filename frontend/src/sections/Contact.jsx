import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_fxpafjr",   // Service ID
      "template_6rjkmoi",           // Template ID
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      "xGTkrrvfO2KzaSRoW"   // Public Key
    )
    .then(() => {
      alert("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.log("EmailJS Error:", error);
      alert("Failed to send message ❌");
    });
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you. Fill out the form and we’ll get in touch!</p>

      <div className="contact-container">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>Email: <a href="mailto:pawaromkar030@gmail.com">pawaromkar030@gmail.com</a></p>
          <p>Phone: +91 8605532147</p>
          <p>Instagram: <a href="https://instagram.com/resume.ai" target="_blank" rel="noreferrer">@resume.ai</a></p>
          <p>Address: Nanded, Maharashtra, India</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;