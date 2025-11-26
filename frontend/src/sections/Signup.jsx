import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/auth/signup", form, {
        headers: { "Content-Type": "application/json" },
      });

      // expected backend response: { token, user: { id, name, email } }
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      if (user?.email) localStorage.setItem("user_email", user.email);
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/generate"), 700);
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || "Signup failed. Try again.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-container fade-in">
      <div className="signup-card card ">
        <h2>Sign up</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="input"
            autoComplete="name"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            type="email"
            autoComplete="email"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
            type="password"
            autoComplete="new-password"
            required
          />

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </div>

        {message && <div style={{ marginTop: 12 }} className="small">{message}</div>}
      </div>
    </section>
  );
}