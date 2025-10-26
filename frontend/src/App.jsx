import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import Features from "./sections/Features";
import ResumeGenerator from "./sections/ResumeGenerator";
import Templates from "./sections/Templates";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Signup from "./sections/Signup";
import Login from "./sections/Login";


export default function App(){
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/features" element={<Features/>} />
          <Route path="/generate" element={<ResumeGenerator/>} />
          <Route path="/templates" element={<Templates/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
         </Routes>
      </main>
      <Footer />
    </>
  )
}