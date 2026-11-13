
import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const features = [
  {
    icon: "🎓",
    title: "Quality Learning",
    description: "Structured courses designed to help students understand technology concepts."
  },
  {
    icon: "💻",
    title: "Practical Training",
    description: "Learn through coding exercises, demonstrations, and project-based activities."
  },
  {
    icon: "👨‍🏫",
    title: "Expert Guidance",
    description: "Get learning guidance and support throughout your training journey."
  },
  {
    icon: "🚀",
    title: "Career Development",
    description: "Prepare for professional opportunities with technical and interview practice."
  }
];

export default function About() {
  return (
    <div className="about-page">

      {/* Banner */}
      <section className="about-banner">
        <div className="page-container">
          <span>GET TO KNOW US</span>
          <h1>About QSpiders</h1>
          <p>
            A learning platform focused on helping students
            develop technical skills and prepare for their careers.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro section-padding">
        <div className="page-container about-intro-layout">

          <div className="about-intro-content">
            <span className="about-eyebrow">WHO WE ARE</span>

            <h2>Building Skills for a Better Tomorrow</h2>

            <p>
              QSpiders is presented here as a learning management
              platform where students can explore technology courses,
              access lessons, track learning progress, and practice
              their knowledge.
            </p>

            <p>
              Our platform provides a simple learning experience
              with course information, instructor details, online
              and offline learning options, and student dashboards.
            </p>

            <Link to="/courses" className="about-primary-btn">
              Explore Our Courses →
            </Link>
          </div>

          <div className="about-intro-visual">
            <div className="about-visual-icon">📚</div>
            <h3>Learn. Practice. Grow.</h3>
            <p>
              Every new skill is a step towards your goals.
            </p>
          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="about-mission section-padding">
        <div className="page-container mission-grid">

          <div className="mission-card">
            <div>🎯</div>
            <h3>Our Mission</h3>
            <p>
              To provide an accessible and organized learning
              experience that helps students build technical
              knowledge through structured courses and practice.
            </p>
          </div>

          <div className="mission-card">
            <div>🌟</div>
            <h3>Our Vision</h3>
            <p>
              To create a supportive learning environment where
              students can continuously improve their skills
              and prepare for future opportunities.
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="about-features section-padding">
        <div className="page-container">

          <div className="about-heading">
            <span>WHAT MAKES US DIFFERENT</span>
            <h2>Our Learning Approach</h2>
            <p>
              A simple and structured approach to technical learning.
            </p>
          </div>

          <div className="about-feature-grid">
            {features.map((item, index) => (
              <div className="about-feature-card" key={index}>
                <div className="about-feature-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Learning Steps */}
      <section className="about-journey section-padding">
        <div className="page-container">

          <div className="about-heading">
            <span>YOUR LEARNING JOURNEY</span>
            <h2>How Our Platform Works</h2>
          </div>

          <div className="about-journey-grid">

            <div className="journey-item">
              <span>01</span>
              <h3>Choose a Course</h3>
              <p>Explore available courses and select your area of interest.</p>
            </div>

            <div className="journey-item">
              <span>02</span>
              <h3>Enroll and Learn</h3>
              <p>Enroll in a course and access your learning lessons.</p>
            </div>

            <div className="journey-item">
              <span>03</span>
              <h3>Practice and Test</h3>
              <p>Complete lessons and take quizzes to check your knowledge.</p>
            </div>

            <div className="journey-item">
              <span>04</span>
              <h3>Track Progress</h3>
              <p>Monitor your learning progress through your dashboard.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="page-container">
          <h2>Start Your Learning Journey Today</h2>
          <p>
            Discover courses, build new skills, and work towards
            your professional goals.
          </p>

          <Link to="/courses" className="about-cta-btn">
            Browse Courses →
          </Link>
        </div>
      </section>

    </div>
  );
}
