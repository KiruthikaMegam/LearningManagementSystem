
import React from "react";
import { Link } from "react-router-dom";
import "./Placements.css";

const placementSteps = [
  {
    number: "01",
    title: "Technical Training",
    description: "Build strong technical knowledge through structured courses and practical exercises."
  },
  {
    number: "02",
    title: "Resume Preparation",
    description: "Learn how to prepare a professional resume that highlights your skills and projects."
  },
  {
    number: "03",
    title: "Interview Preparation",
    description: "Practice technical questions, coding exercises, and mock interviews."
  },
  {
    number: "04",
    title: "Career Guidance",
    description: "Get guidance on job applications, interview opportunities, and career development."
  }
];

const placementFeatures = [
  {
    icon: "📄",
    title: "Resume Building",
    description: "Create a professional resume that showcases your technical skills and projects."
  },
  {
    icon: "💻",
    title: "Technical Preparation",
    description: "Practice programming concepts and technical interview questions."
  },
  {
    icon: "🎤",
    title: "Mock Interviews",
    description: "Improve your communication and interview confidence through practice."
  },
  {
    icon: "🤝",
    title: "Career Guidance",
    description: "Understand job requirements and prepare for career opportunities."
  }
];

export default function Placements() {
  return (
    <div className="placements-page">

      <section className="placements-banner">
        <div className="page-container">
          <span>BUILD YOUR CAREER</span>
          <h1>Placement & Career Support</h1>
          <p>
            Develop technical skills, prepare for interviews,
            and take confident steps towards your career.
          </p>

          <Link to="/courses" className="placement-banner-btn">
            Explore Courses →
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="placement-intro section-padding">
        <div className="page-container placement-intro-layout">

          <div>
            <span className="placement-eyebrow">
              CAREER DEVELOPMENT
            </span>

            <h2>Prepare Yourself for the Professional World</h2>

            <p>
              Learning technology is the first step towards
              building a successful career. Our placement
              preparation section focuses on technical skills,
              resume preparation, interview practice, and
              career guidance.
            </p>

            <p>
              Students can use these resources to understand
              industry expectations and improve their
              employment readiness.
            </p>

            <Link to="/courses" className="placement-primary-btn">
              Start Learning →
            </Link>
          </div>

          <div className="placement-intro-image">
            <div className="placement-image-icon">🚀</div>
            <h3>Your Career Starts with Learning</h3>
            <p>
              Learn skills. Practice regularly. Prepare confidently.
            </p>
          </div>

        </div>
      </section>

      {/* Placement Features */}
      <section className="placement-features section-padding">
        <div className="page-container">

          <div className="placement-heading">
            <span>OUR SUPPORT</span>
            <h2>How We Help You Prepare</h2>
            <p>
              Improve your technical and professional skills
              through career preparation activities.
            </p>
          </div>

          <div className="placement-feature-grid">
            {placementFeatures.map((item, index) => (
              <div className="placement-feature-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Process */}
      <section className="placement-process section-padding">
        <div className="page-container">

          <div className="placement-heading">
            <span>YOUR JOURNEY</span>
            <h2>Placement Preparation Process</h2>
            <p>
              Follow these steps to prepare for your next career opportunity.
            </p>
          </div>

          <div className="placement-steps">
            {placementSteps.map((step) => (
              <div className="placement-step-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="placement-cta">
        <div className="page-container">
          <h2>Take the Next Step in Your Career</h2>
          <p>
            Choose a course, improve your skills, and start
            preparing for your professional journey.
          </p>

          <Link to="/courses" className="placement-cta-btn">
            Browse Courses →
          </Link>
        </div>
      </section>

    </div>
  );
}
