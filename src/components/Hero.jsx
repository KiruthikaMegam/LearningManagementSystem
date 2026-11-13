
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-tag">
              YOUR CAREER STARTS HERE
            </span>

            <h1>
              Learn Skills.
              <br />
              Build Your <span>Future.</span>
            </h1>

            <p>
              Get industry-ready skills with expert trainers,
              practical learning and career-focused training
              programs. Start your IT journey with QSpiders.
            </p>

            <div className="hero-buttons">
              <Link to="/courses" className="hero-primary-btn">
                Explore Courses →
              </Link>

              <Link to="/about" className="hero-secondary-btn">
                Learn More
              </Link>
            </div>

            <div className="hero-highlights">
              <div>
                <strong>Online</strong>
                <span>Learn Anywhere</span>
              </div>

              <div>
                <strong>Offline</strong>
                <span>Classroom Training</span>
              </div>

              <div>
                <strong>Career</strong>
                <span>Placement Assistance</span>
              </div>
            </div>
          </div>

          <div className="hero-image-content">
            <img
              src="/assets/hero-training.jpg"
              alt="Students learning technology"
            />

            <div className="hero-floating-card">
              <span>🎓</span>
              <div>
                <strong>Learn With Experts</strong>
                <p>Practical Training Programs</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
