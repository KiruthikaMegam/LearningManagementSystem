
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.password) {
      newErrors.password = "Please enter a password";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = signup({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    });

    if (!result.success) {
      setErrors({
        email: result.message
      });
      return;
    }

    navigate("/login");
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-info">

          <span className="auth-eyebrow">JOIN OUR LEARNING COMMUNITY</span>

          <h1>Start Building Your Future Today</h1>

          <p>
            Create your student account and explore courses,
            complete lessons, and improve your technical skills.
          </p>

          <div className="auth-features">
            <div>✓ Explore different learning programs</div>
            <div>✓ Access your enrolled courses</div>
            <div>✓ Track your learning progress</div>
            <div>✓ Practice with quizzes</div>
          </div>

        </div>

        <div className="auth-form-card">

          <div className="auth-logo">QSPIDERS</div>

          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Register as a student to get started.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="auth-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />

              {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="auth-form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />

              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className="auth-form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={handleChange}
              />

              {errors.phone && <small>{errors.phone}</small>}
            </div>

            <div className="auth-form-group">
              <label>Password</label>

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
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

              {errors.password && <small>{errors.password}</small>}
            </div>

            <div className="auth-form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <small>{errors.confirmPassword}</small>
              )}
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account →
            </button>

          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>

      </div>

    </div>
  );
}
