import React from "react";

export default function FAQ(){
  const faqs = [
    {q:"How reliable is AI text?", a:"AI gives a strong starting point — always review and customize."},
    {q:"Can I download PDF?", a:"Yes — click Download PDF after generating."},
    {q:"Where are resumes stored?", a:"If backend enabled, they get saved to your MongoDB (optional)."},
  ];
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="center">FAQ</h2>
        <div style={{marginTop:20}}>
          {faqs.map((f,i)=>(
            <div key={i} className="card" style={{marginBottom:12}}>
              <strong>{f.q}</strong>
              <div className="text-muted" style={{marginTop:6}}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}