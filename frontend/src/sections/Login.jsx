import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.email || !form.password) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      // expected backend response: { token, user: { id, name, email } }
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      if (user?.email) localStorage.setItem("user_email", user.email);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || "Login failed. Check credentials.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-container fade-in">
      <div className="login-card card ">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            required
          />

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/signup">Sign up</Link><br />
          Don't remember? <Link to="/reset">Reset Password</Link> <br />
          Don't have an account? <Link to="/guest">Continue as Guest</Link> 
        </div>

        {message && <div style={{ marginTop: 12 }} className="small">{message}</div>}
        
      </div>
    </section>
  );
}