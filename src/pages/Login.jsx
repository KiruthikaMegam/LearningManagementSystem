
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    const user = login(form.email, form.password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-info">
          <span className="auth-eyebrow">WELCOME TO QSPIDERS</span>

          <h1>Continue Your Learning Journey</h1>

          <p>
            Sign in to access your courses, track your progress,
            complete lessons, and develop new skills.
          </p>

          <div className="auth-features">
            <div>✓ Access your enrolled courses</div>
            <div>✓ Track your learning progress</div>
            <div>✓ Complete lessons and quizzes</div>
            <div>✓ Manage your student profile</div>
          </div>

        </div>

        <div className="auth-form-card">

          <div className="auth-logo">QSPIDERS</div>

          <h2>Welcome Back!</h2>
          <p className="auth-subtitle">
            Login to your account to continue.
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="auth-form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="auth-form-group">
              <label>Password</label>

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Login →
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <div className="admin-credentials">
            <h4>Default Admin Login</h4>
            <p>Email: admin@qspiders.com</p>
            <p>Password: Admin@123</p>
          </div>

          <div className="demo-credentials">
            <h4>Demo Student Login</h4>
            <p>Email: student@gmail.com</p>
            <p>Password: 123456</p>
          </div>

        </div>

      </div>

    </div>
  );
}
