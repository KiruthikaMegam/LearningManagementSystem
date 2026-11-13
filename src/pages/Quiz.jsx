
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import { quizQuestions } from "../data/lessonData";

import "./Quiz.css";

export default function Quiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const {
    courses,
    isCoursePaid,
    submitQuiz,
    getQuizResult
  } = useLMS();

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  if (!currentUser || currentUser.role !== "student") {
    return (
      <div className="quiz-message">
        <h2>Student Login Required</h2>
        <p>Please login as a student to take this quiz.</p>
        <button onClick={() => navigate("/login")}>
          Login Now
        </button>
      </div>
    );
  }

  const paid = isCoursePaid(currentUser.id, courseId);

  if (!paid) {
    return (
      <div className="quiz-message">
        <h2>Course Enrollment Required</h2>
        <p>Complete your course payment before taking the quiz.</p>
        <button onClick={() => navigate(`/courses/${courseId}`)}>
          View Course
        </button>
      </div>
    );
  }

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <div className="quiz-message">
        <h2>Course Not Found</h2>
        <button onClick={() => navigate("/courses")}>
          Browse Courses
        </button>
      </div>
    );
  }

  const questions = quizQuestions?.[courseId] || [];
  const previousResult = getQuizResult(currentUser.id, courseId);

  function handleAnswer(questionId, selectedAnswer) {
    setAnswers({
      ...answers,
      [questionId]: selectedAnswer
    });
  }

  function handleSubmit() {
    if (questions.length === 0) {
      setMessage("No quiz questions are available for this course.");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      setMessage("Please answer all questions before submitting.");
      return;
    }

    let correctAnswers = 0;

    questions.forEach((question) => {
      const selectedAnswer = answers[question.id];

      const correctAnswer =
        typeof question.answer === "number"
          ? question.options[question.answer]
          : question.answer;

      if (selectedAnswer === correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round(
      (correctAnswers / questions.length) * 100
    );

    const saved = submitQuiz(
      currentUser.id,
      courseId,
      finalScore
    );

    if (!saved) {
      setMessage("Unable to save your quiz result. Please try again.");
      return;
    }

    setScore(finalScore);
    setSubmitted(true);
    setMessage("");
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setMessage("");
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-message">
        <h2>Quiz Coming Soon</h2>
        <p>No questions have been added for {course.title} yet.</p>
        <button onClick={() => navigate("/my-courses")}>
          My Courses
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page">

      <div className="quiz-heading">
        <span>TEST YOUR KNOWLEDGE</span>
        <h1>{course.title} Quiz</h1>
        <p>Answer the following questions to check your understanding.</p>
      </div>

      {!submitted ? (
        <div className="quiz-container">

          <div className="quiz-top-info">
            <div>
              <strong>{questions.length}</strong>
              <span>Total Questions</span>
            </div>

            <div>
              <strong>{Object.keys(answers).length}</strong>
              <span>Answered</span>
            </div>
          </div>

          <div className="quiz-question-list">

            {questions.map((question, index) => (
              <div className="quiz-question-card" key={question.id}>

                <div className="quiz-question-title">
                  <span>Question {index + 1}</span>
                  <h2>{question.question}</h2>
                </div>

                <div className="quiz-options">

                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={
                        answers[question.id] === option
                          ? "quiz-option selected-option"
                          : "quiz-option"
                      }
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() =>
                          handleAnswer(question.id, option)
                        }
                      />

                      <span className="quiz-option-letter">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>

                      <span>{option}</span>
                    </label>
                  ))}

                </div>

              </div>
            ))}

          </div>

          {message && (
            <p className="quiz-error">{message}</p>
          )}

          <button
            className="quiz-submit-button"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>

        </div>
      ) : (
        <div className="quiz-result-card">

          <div className={score >= 50 ? "quiz-result-icon passed" : "quiz-result-icon failed"}>
            {score >= 50 ? "✓" : "!"}
          </div>

          <span>QUIZ RESULT</span>

          <h2>
            {score >= 50 ? "Congratulations!" : "Keep Practicing!"}
          </h2>

          <p>
            {score >= 50
              ? "You have successfully passed this quiz."
              : "You did not reach the passing score. Try again to improve."}
          </p>

          <div className="quiz-score">
            <strong>{score}%</strong>
            <span>Your Score</span>
          </div>

          <div className="quiz-result-info">
            <div>
              <span>Total Questions</span>
              <strong>{questions.length}</strong>
            </div>

            <div>
              <span>Correct Answers</span>
              <strong>
                {Math.round((score / 100) * questions.length)}
              </strong>
            </div>

            <div>
              <span>Result</span>
              <strong className={score >= 50 ? "result-pass" : "result-fail"}>
                {score >= 50 ? "Passed" : "Failed"}
              </strong>
            </div>
          </div>

          <div className="quiz-result-buttons">
            <button
              className="quiz-retry-button"
              onClick={handleRetry}
            >
              Try Again
            </button>

            <button
              className="quiz-home-button"
              onClick={() => navigate("/my-courses")}
            >
              My Courses
            </button>
          </div>

        </div>
      )}

      {!submitted && previousResult !== null && previousResult !== undefined && (
        <div className="quiz-previous-result">
          Previous Best Score: <strong>{previousResult}%</strong>
        </div>
      )}

    </div>
  );
}
