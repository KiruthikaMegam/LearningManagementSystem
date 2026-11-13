
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import LessonCard from "../components/LessonCard";

import "./CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const {
    courses,
    getMyCourses,
    isCoursePaid
  } = useLMS();

  const course = courses.find(
    (item) => String(item.id) === String(id)
  );

  const [mode, setMode] = useState("Online");
  const [message, setMessage] = useState("");

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course Not Found</h2>
        <p>The course you are looking for is unavailable.</p>

        <button onClick={() => navigate("/courses")}>
          Browse Courses
        </button>
      </div>
    );
  }

  const lessons = Array.isArray(course.lessons)
    ? course.lessons
    : [];

  const myCourses = currentUser && currentUser.role === "student"
    ? getMyCourses(currentUser.id)
    : [];

  const enrolledCourse = myCourses.find(
    (item) => String(item.courseId) === String(course.id)
  );

  const paid = currentUser && currentUser.role === "student"
    ? isCoursePaid(currentUser.id, course.id)
    : false;

  function handleEnrollment() {
    setMessage("");

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role !== "student") {
      setMessage("Only students can enroll in courses.");
      return;
    }

    if (paid) {
      navigate(`/enrollment/${course.id}`);
      return;
    }

    navigate(`/enrollment/${course.id}`);
  }

  return (
    <div className="course-details-page">

      <section className="course-details-banner">
        <div className="page-container">

          <div className="details-breadcrumb">
            <span onClick={() => navigate("/")}>Home</span>
            {" / "}
            <span onClick={() => navigate("/courses")}>Courses</span>
            {" / "}
            {course.title}
          </div>

          <span className="details-category">
            {course.category}
          </span>

          <h1>{course.title}</h1>

          <p>{course.shortDescription}</p>

          <div className="details-rating">
            ⭐ {course.rating} Rating
            <span> | </span>
            {course.students}+ Students
          </div>

        </div>
      </section>

      <section className="course-details-content section-padding">
        <div className="page-container">

          <div className="course-details-layout">

            <div className="course-details-main">

              <div className="details-image">
                <img src={course.image} alt={course.title} />
              </div>

              <div className="details-section">
                <h2>About This Course</h2>
                <p>{course.description}</p>
              </div>

              <div className="details-section">
                <h2>What You Will Learn</h2>

                <div className="learning-points">
                  <p>✓ Understand important {course.category} concepts.</p>
                  <p>✓ Develop practical technical skills.</p>
                  <p>✓ Work on real-world learning exercises.</p>
                  <p>✓ Prepare for technical interviews.</p>
                </div>
              </div>

              <div className="details-section">
                <h2>Your Instructor</h2>

                <div className="instructor-card">
                  <div className="instructor-avatar">
                    {course.instructor?.name?.charAt(0) || "I"}
                  </div>

                  <div>
                    <h3>{course.instructor?.name || "QSpiders Instructor"}</h3>
                    <p>{course.instructor?.role || "Technical Trainer"}</p>
                    <span>
                      {course.instructor?.experience || "Experienced"} Experience
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h2>Course Curriculum</h2>

                <p className="lesson-count">
                  {lessons.length} Lessons included
                </p>

                {lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      courseId={course.id}
                      index={index}
                    />
                  ))
                ) : (
                  <p>No lessons have been added to this course yet.</p>
                )}
              </div>

              <div className="details-section placement-info">
                <h2>Placement Support</h2>
                <p>{course.placement}</p>
              </div>

            </div>

            <aside className="course-enrollment-card">

              <div className="enrollment-image">
                <img src={course.image} alt={course.title} />
              </div>

              <div className="enrollment-card-content">

                <span className="enrollment-label">
                  COURSE FEE
                </span>

                <h2>
                  ₹{Number(course.fee || 0).toLocaleString("en-IN")}
                </h2>

                <div className="enrollment-features">
                  <p>⏱ Duration: {course.duration}</p>
                  <p>📚 Lessons: {lessons.length}</p>
                  <p>⭐ Rating: {course.rating}/5</p>
                  <p>👨‍🎓 Students: {course.students}+</p>
                </div>

                {!paid && (
                  <>
                    <h3>Select Learning Mode</h3>

                    <div className="mode-options">
                      {(Array.isArray(course.mode)
                        ? course.mode
                        : ["Online", "Offline"]
                      ).map((item) => (
                        <button
                          type="button"
                          key={item}
                          className={mode === item ? "selected-mode" : ""}
                          onClick={() => setMode(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {message && (
                  <p className="enrollment-message">
                    {message}
                  </p>
                )}

                <button
                  className="enroll-button"
                  onClick={handleEnrollment}
                >
                  {paid
                    ? "View Course Details"
                    : enrolledCourse
                      ? "Continue Enrollment"
                      : "Enroll Now"}
                </button>

                <p className="enrollment-note">
                  Learn at your pace with structured lessons
                  and practical training.
                </p>

                {paid && (
                  <p className="enrollment-paid-message">
                    ✓ You are enrolled in this course.
                  </p>
                )}

              </div>
            </aside>

          </div>
        </div>
      </section>

    </div>
  );
}
