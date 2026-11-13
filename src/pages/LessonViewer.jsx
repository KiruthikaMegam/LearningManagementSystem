
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";

import { lessonContent } from "../data/lessonData";

import "./LessonViewer.css";

export default function LessonViewer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const {
    courses,
    isCoursePaid,
    completeLesson,
    getCourseProgress
  } = useLMS();

  const [message, setMessage] = useState("");

  if (!currentUser || currentUser.role !== "student") {
    return (
      <div className="lesson-page-message">
        <h2>Student Login Required</h2>
        <p>Please login as a student to access your lessons.</p>
        <button onClick={() => navigate("/login")}>
          Login Now
        </button>
      </div>
    );
  }

  const paid = isCoursePaid(currentUser.id, courseId);

  if (!paid) {
    return (
      <div className="lesson-page-message">
        <h2>Course Enrollment Required</h2>
        <p>Complete enrollment and demo payment to access this lesson.</p>
        <button onClick={() => navigate(`/courses/${courseId}`)}>
          View Course
        </button>
      </div>
    );
  }

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <div className="lesson-page-message">
        <h2>Course Not Found</h2>
        <button onClick={() => navigate("/courses")}>
          Browse Courses
        </button>
      </div>
    );
  }

  const lessons = Array.isArray(course.lessons)
    ? course.lessons
    : [];

  const currentIndex = lessons.findIndex(
    (item) => String(item.id) === String(lessonId)
  );

  const lesson = lessons[currentIndex];

  if (!lesson) {
    return (
      <div className="lesson-page-message">
        <h2>Lesson Not Found</h2>
        <p>This lesson is not available in the selected course.</p>
        <button onClick={() => navigate("/my-courses")}>
          My Courses
        </button>
      </div>
    );
  }

  const content =
    lessonContent?.[courseId]?.[lessonId] ||
    lessonContent?.[lessonId] ||
    null;

  const progress = getCourseProgress(currentUser.id, courseId);

  function handleComplete() {
    const completed = completeLesson(
      currentUser.id,
      courseId,
      lessonId
    );

    if (!completed) {
      setMessage("Unable to save lesson progress. Please try again.");
      return;
    }

    if (currentIndex < lessons.length - 1) {
      navigate(`/lesson/${courseId}/${lessons[currentIndex + 1].id}`);
    } else {
      setMessage("Congratulations! You have completed all lessons.");
    }
  }

  function handleNext() {
    if (currentIndex < lessons.length - 1) {
      navigate(`/lesson/${courseId}/${lessons[currentIndex + 1].id}`);
    } else {
      navigate(`/quiz/${courseId}`);
    }
  }

  return (
    <div className="lesson-viewer-page">

      <div className="lesson-viewer-heading">
        <button
          className="lesson-back-button"
          onClick={() => navigate("/my-courses")}
        >
          ← My Courses
        </button>

        <span>{course.category}</span>
        <h1>{course.title}</h1>
        <p>{lesson.title}</p>
      </div>

      <div className="lesson-viewer-layout">

        <aside className="lesson-sidebar">
          <h3>Course Lessons</h3>

          <div className="lesson-list">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                className={
                  String(item.id) === String(lessonId)
                    ? "active-lesson"
                    : ""
                }
                onClick={() =>
                  navigate(`/lesson/${courseId}/${item.id}`)
                }
              >
                <span>{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.duration || "Lesson"}</small>
                </div>
              </button>
            ))}
          </div>

          <div className="lesson-progress">
            <div>
              <span>Course Progress</span>
              <strong>{progress}%</strong>
            </div>

            <div className="lesson-progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        <main className="lesson-main-content">

          <div className="lesson-content-card">
            <div className="lesson-content-heading">
              <span>LESSON {currentIndex + 1}</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.description || "Learn the concepts in this lesson."}</p>
            </div>

            {content ? (
              <div className="lesson-text-content">
                {typeof content === "string" ? (
                  <p>{content}</p>
                ) : (
                  <>
                    {content.description && (
                      <p>{content.description}</p>
                    )}

                    {content.topics && (
                      <div className="lesson-topics">
                        <h3>Topics Covered</h3>

                        {content.topics.map((topic, index) => (
                          <div key={index} className="lesson-topic">
                            <span>✓</span>
                            {topic}
                          </div>
                        ))}
                      </div>
                    )}

                    {content.example && (
                      <div className="lesson-example">
                        <h3>Example</h3>
                        <pre>{content.example}</pre>
                      </div>
                    )}

                    {content.content && (
                      <p>{content.content}</p>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="lesson-placeholder">
                <div>📖</div>
                <h3>Lesson Content</h3>
                <p>
                  The lesson is ready. Add learning content to
                  lessonData.js to display detailed notes here.
                </p>
              </div>
            )}
          </div>

          {message && (
            <div className="lesson-completion-message">
              {message}
            </div>
          )}

          <div className="lesson-navigation">

            <button
              className="lesson-previous-button"
              disabled={currentIndex === 0}
              onClick={() =>
                navigate(
                  `/lesson/${courseId}/${lessons[currentIndex - 1].id}`
                )
              }
            >
              ← Previous Lesson
            </button>

            <button
              className="lesson-complete-button"
              onClick={handleComplete}
            >
              {currentIndex === lessons.length - 1
                ? "Complete Final Lesson"
                : "Complete & Continue"}
            </button>

            <button
              className="lesson-next-button"
              onClick={handleNext}
            >
              {currentIndex === lessons.length - 1
                ? "Take Quiz →"
                : "Next Lesson →"}
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}
