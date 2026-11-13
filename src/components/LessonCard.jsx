
import React from "react";
import { Link } from "react-router-dom";
import "./LessonCard.css";

export default function LessonCard({
  lesson,
  courseId,
  index,
  completed = false,
  locked = false
}) {
  return (
    <div className={`lesson-card ${completed ? "lesson-completed" : ""}`}>
      <div className="lesson-number">
        {completed ? "✓" : index + 1}
      </div>

      <div className="lesson-details">
        <h4>{lesson.title}</h4>
        <p>⏱ {lesson.duration}</p>
      </div>

      {locked ? (
        <span className="lesson-locked">🔒 Locked</span>
      ) : (
        <Link
          to={`/lesson/${courseId}/${lesson.id}`}
          className="lesson-action"
        >
          {completed ? "Review Lesson" : "Start Lesson"} →
        </Link>
      )}
    </div>
  );
}
