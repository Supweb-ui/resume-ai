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
import CoverLetterTemplates from "./Pages/CoverLetterTemplate";
import CoverLetterExamples from "./Pages/CoverLetterExamples";
import ResumeHelp from "./Pages/ResumeHelp";
import WritingGuide from "./Pages/WritingGuide";
import ResumeTemplates from "./Pages/ResumeTemplates";
import InterviewTips from "./Pages/InterviewTips";
import JobSearch from "./Pages/JobSearch";
import ATSScore from "./Pages/ATSScore";
import Pricing from "./Pages/Pricing";
import Terms from "./Pages/Terms";
import AboutUs from "./Pages/AboutUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import RecentlyResumes from "./sections/RecentlyResumes";



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
          <Route path="/cover-letter-templates" element={<CoverLetterTemplates/>} />
          <Route path="/cover-letter-examples" element={<CoverLetterExamples/>} />
          <Route path="/resume-help" element={<ResumeHelp/>} />
          <Route path="/resume-templates" element={<ResumeTemplates/>} />
          <Route path="/interview-tips" element={<InterviewTips/>} />
          <Route path="/job-search" element={<JobSearch/>} />
          <Route path="/ats-score" element={<ATSScore/>} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/cover-letter-writing-guide" element={<WritingGuide/>} />
          <Route path="/recent-resumes" element={<RecentlyResumes/>} />

         </Routes>
      </main>
      <Footer />
    </>
  )
}