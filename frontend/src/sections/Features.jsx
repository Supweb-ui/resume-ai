import React from "react";

export default function Features(){
  const items = [
    {t:"AI Summaries", d:"Automatically craft a concise professional summary."},
    {t:"Templates", d:"Multiple modern, ATS-friendly templates."},
    {t:"Download PDF", d:"Export resume as PDF with single click."},
    {t:"Save & Manage", d:"Store resumes in your account (backend)."},
  ];
  return (
    <section id="features" className="section">
      <div className="container center">
        <h2>Key Features</h2>
        <div style={{display:'flex',gap:18,justifyContent:'center',flexWrap:'wrap',marginTop:20}}>
          {items.map((it,i)=>(
            <div key={i} className="card" style={{width:220,textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:'var(--accent)'}}>{it.t}</div>
              <div className="text-muted" style={{marginTop:8}}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}