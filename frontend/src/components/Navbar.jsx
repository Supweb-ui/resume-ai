import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        Resume<span>AI</span>
      </div>
      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/generate">Generate</NavLink>
        <NavLink to="/templates">Templates</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </div>
      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}