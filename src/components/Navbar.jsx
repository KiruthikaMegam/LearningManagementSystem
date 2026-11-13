
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span>Q</span>SPIDERS
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>

          <NavLink to="/" onClick={closeMenu}>
            Overview
          </NavLink>

          <NavLink to="/courses" onClick={closeMenu}>
            Courses
          </NavLink>

          <NavLink to="/enrollment" onClick={closeMenu}>
            Enrollment
          </NavLink>

          <NavLink to="/placements" onClick={closeMenu}>
            Placements
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact Us
          </NavLink>

          <NavLink to="/ratings" onClick={closeMenu}>
            Ratings
          </NavLink>

          {currentUser ? (
            <div className="navbar-user">

              <Link
                to={
                  currentUser.role === "admin"
                    ? "/admin-dashboard"
                    : "/student-dashboard"
                }
                className="navbar-profile"
                onClick={closeMenu}
              >
                {/* {currentUser.name.charAt(0).toUpperCase()}
                <span>{currentUser.name}</span> */}
              </Link>

              <button
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="navbar-actions">
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link
                to="/signup"
                className="signup-btn"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
}
