
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <Link to="/" className="footer-logo">
            <span>Q</span>SPIDERS
          </Link>

          <p>
            Build your future with industry-focused training,
            practical learning and placement assistance.
          </p>

          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">f</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">ig</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">in</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">▶</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Overview</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/enrollment">Enrollment</Link>
          <Link to="/placements">Placements</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h3>Popular Courses</h3>
          <Link to="/courses/java-fullstack">Java Full Stack</Link>
          <Link to="/courses/python-fullstack">Python Full Stack</Link>
          <Link to="/courses/software-testing">Software Testing</Link>
          <Link to="/courses/react-development">React JS</Link>
          <Link to="/courses/data-science">Data Science</Link>
          <Link to="/courses/uiux-design">UI/UX Design</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>📍 Chennai, Tamil Nadu, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ info@qspiders.com</p>
          <Link to="/contact" className="footer-contact-btn">
            Get in Touch
          </Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} QSpiders LMS. All Rights Reserved.
        </p>
        <p>Learn Today. Lead Tomorrow.</p>
      </div>
    </footer>
  );
}
