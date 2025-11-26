import React from "react";

export default function About(){
  return (
    <section id="about" className="section">
      <div className="container center neon-border" style={{padding:24,boxSizing:'border-box'}}>
        <h2>About This App</h2>
        <p className="text-muted" style={{maxWidth:760,margin:'12px auto 0'}}>
          Resume.AI helps students and professionals quickly create high-quality resumes using AI. 
          Fill your details, choose a template, and download as PDF. Optionally save to your account.
          Built with React, Node.js, and MongoDB by Omkar Pawar.
          <br/><br/>
          This project is open-source on <a href="https://github.com/yourusername/resume-ai" target="_blank" rel="noopener noreferrer">GitHub</a>.
          Feel free to contribute or report issues!
          <br/><br/>
          Contact: <a href="mailto:omkarpawar@gmail.com">omkarpawar@gmail.com</a> <br/>
          Linkdin: <a href="https://linkedin.com/in/omkarpawar" target="_blank" rel="noopener noreferrer">linkedin.com/in/omkarpawar</a> <br/>
          Twitter: <a href="https://twitter.com/omkar_pawar" target="_blank" rel="noopener noreferrer">twitter.com/omkar_pawar</a> <br/>
          GitHub: <a href="https://github.com/omkarpawar" target="_blank" rel="noopener noreferrer">github.com/omkarpawar</a> <br/>
          Instagram: <a href="https://instagram.com/omkar.pawar" target="_blank" rel="noopener noreferrer">instagram.com/omkar.pawar</a> <br/>
          Whatsapp: <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
         <br/><br/>
          © 2025 Resume.AI
          
       </p>
      </div>
    </section>
  )
}