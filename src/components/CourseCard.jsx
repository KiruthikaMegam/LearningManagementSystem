
import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-card-image">
        <img src={course.image} alt={course.title} />

        <span className="course-category">
          {course.category}
        </span>
      </div>

      <div className="course-card-content">
        <div className="course-rating">
          <span>★</span>
          {course.rating} Rating
          <span className="course-students">
            {course.students}+ Students
          </span>
        </div>

        <h3>{course.title}</h3>

        <p className="course-description">
          {course.shortDescription}
        </p>

        <div className="course-info">
          <span>◷ {course.duration}</span>
          <span>● {course.level}</span>
        </div>

        <div className="course-mode">
          {course.mode.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <div className="course-card-footer">
          <div className="course-fee">
            <small>Course Fee</small>
            <strong>₹{course.fee.toLocaleString("en-IN")}</strong>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="course-view-btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
