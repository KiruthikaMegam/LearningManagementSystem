
import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

    if (!form.subject.trim()) {
      newErrors.subject = "Please enter a subject";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const previousMessages = JSON.parse(
      localStorage.getItem("qspiders_contact_messages") || "[]"
    );

    const newMessage = {
      id: Date.now(),
      ...form,
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem(
      "qspiders_contact_messages",
      JSON.stringify([...previousMessages, newMessage])
    );

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    setErrors({});
  }

  return (
    <div className="contact-page">

      <section className="contact-banner">
        <div className="page-container">
          <span>WE ARE HERE TO HELP</span>
          <h1>Contact Us</h1>
          <p>
            Have questions about our courses or learning platform?
            Send us a message.
          </p>
        </div>
      </section>

      <section className="contact-content section-padding">
        <div className="page-container contact-layout">

          {/* Contact Information */}
          <div className="contact-info">

            <span className="contact-eyebrow">GET IN TOUCH</span>
            <h2>Let's Start a Conversation</h2>

            <p className="contact-info-description">
              Contact our team for course information,
              enrollment assistance, or general queries.
            </p>

            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <h3>Our Location</h3>
                <p>Sample Training Centre, Chennai, Tamil Nadu</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <div>
                <h3>Phone Number</h3>
                <p>+91 98765 43210 (Demo)</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">✉️</div>
              <div>
                <h3>Email Address</h3>
                <p>info@example.com</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">🕒</div>
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Saturday, 9:00 AM - 6:00 PM</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="contact-form-card">

            <h2>Send Us a Message</h2>
            <p>Fill out the form and we'll get back to you.</p>

            {submitted && (
              <div className="contact-success">
                ✓ Your message has been saved successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="contact-form-row">

                <div className="contact-form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <small>{errors.name}</small>
                  )}
                </div>

                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small>{errors.email}</small>
                  )}
                </div>

              </div>

              <div className="contact-form-row">

                <div className="contact-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit phone number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <small>{errors.phone}</small>
                  )}
                </div>

                <div className="contact-form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    value={form.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && (
                    <small>{errors.subject}</small>
                  )}
                </div>

              </div>

              <div className="contact-form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                ></textarea>

                {errors.message && (
                  <small>{errors.message}</small>
                )}
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message →
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
