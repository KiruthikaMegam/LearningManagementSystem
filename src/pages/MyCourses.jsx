
import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";

import "./MyCourses.css";

export default function MyCourses() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const {
    getMyCourses,
    getCourseProgress
  } = useLMS();

  if (!currentUser || currentUser.role !== "student") {
    return (
      <div className="my-courses-page">
        <div className="my-courses-empty">
          <h2>Please Login as a Student</h2>
          <p>Login to view your enrolled courses.</p>

          <button onClick={() => navigate("/login")}>
            Login Now
          </button>
        </div>
      </div>
    );
  }

  const myCourses = getMyCourses(currentUser.id);

  function handleContinue(course) {
    const lessons = Array.isArray(course.lessons)
      ? course.lessons
      : [];

    if (lessons.length > 0) {
      navigate(`/lesson/${course.id}/${lessons[0].id}`);
    }
  }

  return (
    <div className="my-courses-page">

      <div className="my-courses-heading">
        <span>MY LEARNING</span>
        <h1>My Courses</h1>
        <p>Continue learning and build your technical skills.</p>
      </div>

      {myCourses.length === 0 ? (
        <div className="my-courses-empty">
          <div className="my-courses-empty-icon">📚</div>

          <h2>No Courses Yet</h2>

          <p>
            You haven't purchased any courses yet.
            Explore our courses and start learning today.
          </p>

          <button onClick={() => navigate("/courses")}>
            Explore Courses
          </button>
        </div>
      ) : (
        <div className="my-courses-grid">

          {myCourses.map((item) => {
            const course = item.course;

            if (!course) {
              return null;
            }

            const lessons = Array.isArray(course.lessons)
              ? course.lessons
              : [];

            const progress = getCourseProgress(
              currentUser.id,
              course.id
            );

            return (
              <div className="my-course-card" key={item.id}>

                <div className="my-course-image">
                  <img
                    src={course.image}
                    alt={course.title}
                  />

                  <span className="my-course-paid">
                    ✓ Enrolled
                  </span>
                </div>

                <div className="my-course-content">

                  <span className="my-course-category">
                    {course.category}
                  </span>

                  <h2>{course.title}</h2>

                  <p className="my-course-description">
                    {course.shortDescription}
                  </p>

                  <div className="my-course-info">
                    <span>⏱ {course.duration}</span>
                    <span>📚 {lessons.length} Lessons</span>
                  </div>

                  <div className="my-course-progress-heading">
                    <span>Course Progress</span>
                    <strong>{progress}%</strong>
                  </div>

                  <div className="my-course-progress-bar">
                    <div
                      className="my-course-progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="my-course-buttons">

                    <button
                      className="my-course-continue"
                      onClick={() => handleContinue(course)}
                      disabled={lessons.length === 0}
                    >
                      {lessons.length > 0
                        ? "Continue Learning"
                        : "Lessons Coming Soon"}
                    </button>

                    <button
                      className="my-course-quiz"
                      onClick={() => navigate(`/quiz/${course.id}`)}
                    >
                      View Quiz
                    </button>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}
