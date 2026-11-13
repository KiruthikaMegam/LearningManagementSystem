
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const { currentUser } = useAuth();

  const {
    getMyCourses,
    getCourseProgress
  } = useLMS();

  const myCourses = currentUser
    ? getMyCourses(currentUser.id)
    : [];

  const completedCourses = myCourses.filter(
    (item) =>
      getCourseProgress(currentUser.id, item.courseId) === 100
  );

  const inProgressCourses = myCourses.filter(
    (item) =>
      getCourseProgress(currentUser.id, item.courseId) < 100
  );

  const overallProgress = myCourses.length > 0
    ? Math.round(
        myCourses.reduce(
          (total, item) =>
            total +
            getCourseProgress(currentUser.id, item.courseId),
          0
        ) / myCourses.length
      )
    : 0;

  return (
    <div className="student-dashboard">

      <div className="student-welcome">
        <div>
          <span className="student-eyebrow">
            STUDENT OVERVIEW
          </span>

          <h1>
            Welcome back, {currentUser?.name || "Student"}!
          </h1>

          <p>
            Continue learning and keep moving towards your goals.
          </p>
        </div>

        <Link to="/courses" className="student-explore-btn">
          Explore Courses →
        </Link>
      </div>

      <div className="student-stats">

        <div className="student-stat-card">
          <div className="student-stat-icon blue">📚</div>
          <div>
            <h3>{myCourses.length}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon green">✓</div>
          <div>
            <h3>{completedCourses.length}</h3>
            <p>Completed Courses</p>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon orange">⏳</div>
          <div>
            <h3>{inProgressCourses.length}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon purple">🎯</div>
          <div>
            <h3>{overallProgress}%</h3>
            <p>Overall Progress</p>
          </div>
        </div>

      </div>

      <section className="student-courses-section">

        <div className="student-section-heading">
          <div>
            <span>YOUR LEARNING</span>
            <h2>My Enrolled Courses</h2>
          </div>

          <Link to="/my-courses">View All →</Link>
        </div>

        {myCourses.length === 0 ? (

          <div className="student-empty-state">
            <div className="student-empty-icon">📖</div>

            <h3>No Courses Enrolled Yet</h3>

            <p>
              Explore our courses and enroll in a program to start learning.
            </p>

            <Link to="/courses" className="student-explore-btn">
              Browse Courses →
            </Link>
          </div>

        ) : (

          <div className="student-course-grid">

            {myCourses.map((item) => {

              const course = item.course || {};

              const lessons = Array.isArray(course.lessons)
                ? course.lessons
                : [];

              const progress = getCourseProgress(
                currentUser.id,
                item.courseId
              );

              return (
                <div
                  className="student-course-card"
                  key={item.id}
                >

                  <div className="student-course-image">
                    <img
                      src={course.image || ""}
                      alt={course.title || "Course"}
                    />

                    <span className="student-course-category">
                      {course.category || "General"}
                    </span>
                  </div>

                  <div className="student-course-content">

                    <h3>{course.title || "Course"}</h3>

                    <p className="student-course-duration">
                      {course.duration || "Flexible Duration"} •{" "}
                      {lessons.length} Lessons
                    </p>

                    <div className="student-progress-heading">
                      <span>Course Progress</span>
                      <strong>{progress}%</strong>
                    </div>

                    <div className="student-progress-bar">
                      <div
                        className="student-progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <Link
                      to="/my-courses"
                      className="student-continue-btn"
                    >
                      {progress === 100
                        ? "Review Course"
                        : "Continue Learning →"}
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>

      <section className="student-quick-section">

        <div className="student-section-heading">
          <div>
            <span>QUICK ACCESS</span>
            <h2>Explore Your Learning Tools</h2>
          </div>
        </div>

        <div className="student-quick-grid">

          <Link to="/my-courses" className="student-quick-card">
            <span>📚</span>
            <div>
              <h3>My Courses</h3>
              <p>View your enrolled courses</p>
            </div>
            <strong>→</strong>
          </Link>

          <Link to="/courses" className="student-quick-card">
            <span>🔍</span>
            <div>
              <h3>Course Catalogue</h3>
              <p>Discover new learning programs</p>
            </div>
            <strong>→</strong>
          </Link>

          <Link to="/profile" className="student-quick-card">
            <span>👤</span>
            <div>
              <h3>My Profile</h3>
              <p>View your account information</p>
            </div>
            <strong>→</strong>
          </Link>

        </div>

      </section>

    </div>
  );
}
