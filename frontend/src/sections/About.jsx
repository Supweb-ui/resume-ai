import React from "react";

export default function About(){
  return (
    <section id="about" className="section">
      <div className="container center">
        <h2>About This App</h2>
        <p className="text-muted" style={{maxWidth:760,margin:'12px auto 0'}}>
          Resume.AI helps students and professionals quickly create high-quality resumes using AI. 
          Fill your details, choose a template, and download as PDF. Optionally save to your account.
          Built with React, Node.js, and MongoDB by Omkar Pawar.
          <br/><br/>
          This project is open-source on <a href="https://github.com/yourusername/resume-ai" target="_blank" rel="noopener noreferrer">GitHub</a>.
          Feel free to contribute or report issues!
          <br/><br/>
          Contact: <a href="mailto:omkar.pawar@example.com">omkar.pawar@example.com</a>
          <br/><br/>
          © 2024 Resume.AI
          
       </p>
      </div>
    </section>
  )
}