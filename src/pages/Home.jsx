
import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import Testimonial from "../components/Testimonial";

import { initialCourses } from "../data/courseData";

import "./Home.css";

const reviews = [
  {
    name: "Alex Morgan",
    course: "Java Full Stack",
    rating: 5,
    message: "The trainers explained every concept clearly. The practical sessions helped me improve my development skills."
  },
  {
    name: "Sarah Johnson",
    course: "React Development",
    rating: 5,
    message: "I learned React from the basics and completed real-world projects. It was a great learning experience."
  },
  {
    name: "John David",
    course: "Software Testing",
    rating: 4,
    message: "The course content was easy to understand and the placement guidance was very helpful."
  }
];

export default function Home() {
  const popularCourses = initialCourses.slice(0, 3);

  return (
    <div className="home-page">

      <Hero />

      {/* Statistics */}
      <section className="home-stats page-container">
        <div className="stat-item">
          <h2>10+</h2>
          <p>Popular Courses</p>
        </div>

        <div className="stat-item">
          <h2>5000+</h2>
          <p>Learning Students</p>
        </div>

        <div className="stat-item">
          <h2>50+</h2>
          <p>Expert Trainers</p>
        </div>

        <div className="stat-item">
          <h2>1000+</h2>
          <p>Career Opportunities</p>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="home-courses section-padding">
        <div className="page-container">

          <div className="home-section-heading">
            <span>OUR PROGRAMS</span>
            <h2>Explore Popular Courses</h2>
            <p>
              Choose the right technology course and build your
              professional career with practical learning.
            </p>
          </div>

          <div className="home-course-grid">
            {popularCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>

          <div className="home-center-btn">
            <Link to="/courses" className="home-primary-btn">
              View All Courses →
            </Link>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="home-benefits section-padding">
        <div className="page-container">

          <div className="home-section-heading">
            <span>WHY CHOOSE US</span>
            <h2>Learn Today. Lead Tomorrow.</h2>
            <p>
              Develop your skills through structured training,
              practical sessions, and career guidance.
            </p>
          </div>

          <div className="benefits-grid">

            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3>Expert Trainers</h3>
              <p>
                Learn from experienced trainers with practical
                industry knowledge.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💻</div>
              <h3>Practical Learning</h3>
              <p>
                Improve your technical skills through exercises
                and hands-on projects.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌐</div>
              <h3>Flexible Learning</h3>
              <p>
                Choose online or offline learning based on
                your convenience.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Placement Guidance</h3>
              <p>
                Prepare for interviews with resume support
                and placement guidance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-testimonials section-padding">
        <div className="page-container">

          <div className="home-section-heading">
            <span>STUDENT EXPERIENCES</span>
            <h2>What Our Students Say</h2>
            <p>
              Feedback from learners about their training experience.
            </p>
          </div>

          <div className="testimonial-grid">
            {reviews.map((review, index) => (
              <Testimonial
                key={index}
                review={review}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <section className="home-cta">
        <div className="page-container">
          <h2>Ready to Start Your Learning Journey?</h2>

          <p>
            Explore our courses and take your next step
            towards a successful technology career.
          </p>

          <Link to="/courses" className="home-cta-btn">
            Explore Courses →
          </Link>
        </div>
      </section>

    </div>
  );
}
