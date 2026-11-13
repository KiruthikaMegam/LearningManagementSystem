
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import "./Enrollment.css";

export default function Enrollment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const {
    courses,
    enrollments,
    enrollCourse,
    isCoursePaid,
    getCourseProgress
  } = useLMS();

  const course = courses.find(
  (item) => String(item.id) === String(id)
);

  const existingEnrollment = enrollments.find(
  (item) =>
    String(item.studentId) === String(currentUser?.id) &&
    String(item.courseId) === String(id)
);

  const paid = currentUser
  ? isCoursePaid(currentUser.id, course?.id || id)
  : false;

  const progress = currentUser && paid
  ? getCourseProgress(currentUser.id, course?.id || id)
  : 0;

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    mobile: currentUser?.phone || "",
    qualification: "",
    college: "",
    mode: "Online"
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role !== "student") {
      setError("Only students can enroll in courses.");
      return;
    }

    if (
      !form.name ||
      !form.email ||
      !form.mobile ||
      !form.qualification ||
      !form.college
    ) {
      setError("Please fill in all required details.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const result = enrollCourse(
      currentUser.id,
      course.id,
      form,
      form.mode
    );

    if (result.success) {
      navigate(`/payment/${result.enrollmentId}`);
    } else {
      setError(result.message || "Enrollment failed.");
    }
  }

  if (!currentUser) {
    return (
      <div className="enrollment-page">
        <h2>Please login to continue enrollment.</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="enrollment-page">
        <h2>Course not found</h2>
        <button onClick={() => navigate("/courses")}>
          Browse Courses
        </button>
      </div>
    );
  }

  // Show enrolled course details after successful payment
  if (paid) {
    return (
      <div className="enrollment-page">
        <div className="enrollment-container">
          <div className="enrollment-heading">
            <span>MY LEARNING</span>
            <h1>My Enrolled Course</h1>
            <p>Your course enrollment and learning details.</p>
          </div>

          <div className="my-enrolled-card">
            <img
              src={course.image}
              alt={course.title}
              className="my-enrolled-image"
            />

            <div className="my-enrolled-content">
              <span className="enrollment-category">
                {course.category}
              </span>

              <h2>{course.title}</h2>
              <p>{course.shortDescription}</p>

              <div className="my-enrolled-info">
                <div>
                  <span>Duration</span>
                  <strong>{course.duration}</strong>
                </div>

                <div>
                  <span>Level</span>
                  <strong>{course.level}</strong>
                </div>

                <div>
                  <span>Total Lessons</span>
                  <strong>{course.lessons?.length || 0}</strong>
                </div>

                <div>
                  <span>Course Fee</span>
                  <strong>₹{Number(course.fee || 0).toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <div className="enrolled-status-row">
                <span>Enrollment Status</span>
                <strong className="paid-status">Enrolled</strong>
              </div>

              <div className="enrolled-status-row">
                <span>Payment Status</span>
                <strong className="paid-status">Paid</strong>
              </div>

              <div className="enrolled-progress">
                <div className="progress-heading">
                  <span>Course Progress</span>
                  <strong>{progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="enrolled-buttons">
                <button
                  onClick={() => navigate("/my-courses")}
                >
                  View All My Courses
                </button>

                <button
                  className="continue-button"
                  onClick={() => {
                    if (course.lessons?.length > 0) {
                      navigate(
                        `/lesson/${course.id}/${course.lessons[0].id}`
                      );
                    } else {
                      navigate("/my-courses");
                    }
                  }}
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show pending payment information
  if (existingEnrollment) {
    return (
      <div className="enrollment-page">
        <div className="enrollment-container">
          <div className="enrollment-heading">
            <span>ENROLLMENT</span>
            <h1>Complete Your Enrollment</h1>
            <p>Your course enrollment is waiting for payment.</p>
          </div>

          <div className="my-enrolled-card">
            <img
              src={course.image}
              alt={course.title}
              className="my-enrolled-image"
            />

            <div className="my-enrolled-content">
              <h2>{course.title}</h2>
              <p>{course.shortDescription}</p>
              <div className="enrolled-status-row">
                <span>Enrollment Status</span>
                <strong>Pending Payment</strong>
              </div>
              <div className="enrolled-status-row">
                <span>Payment Status</span>
                <strong>Pending</strong>
              </div>

              <h2>₹{Number(existingEnrollment.courseFee || course.fee || 0).toLocaleString("en-IN")}</h2>

              <button
                className="continue-button"
                onClick={() => navigate(`/payment/${existingEnrollment.id}`)}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="enrollment-page">
      <div className="enrollment-container">
        <div className="enrollment-heading">
          <span>JOIN QSPIDERS</span>
          <h1>Course Enrollment</h1>
          <p>Complete your details to enroll in your selected course.</p>
        </div>

        <div className="enrollment-layout">
          <div className="enrollment-form-card">
            <h2>Student Information</h2>
            <p>Enter your details below.</p>

            <form onSubmit={handleSubmit}>
              <div className="enrollment-input-group">
                <label>Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="enrollment-input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="enrollment-input-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </div>

              <div className="enrollment-input-group">
                <label>Qualification *</label>
                <select
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Qualification</option>
                  <option value="12th">12th Standard</option>
                  <option value="Diploma">Diploma</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="B.E">B.E</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="enrollment-input-group">
                <label>College Name *</label>
                <input
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="enrollment-input-group">
                <label>Learning Mode</label>
                <select
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                >
                  {(Array.isArray(course.mode)
                    ? course.mode
                    : ["Online", "Offline"]
                  ).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="enrollment-error">{error}</p>
              )}

              <button type="submit" className="enrollment-submit">
                Continue to Payment
              </button>
            </form>
          </div>

          <div className="enrollment-course-card">
            <img
              src={course.image}
              alt={course.title}
              className="enrollment-course-image"
            />

            <div className="enrollment-course-content">
              <span className="enrollment-category">
                {course.category}
              </span>

              <h2>{course.title}</h2>
              <p>{course.shortDescription}</p>

              <div className="enrollment-course-info">
                <div>
                  <span>Duration</span>
                  <strong>{course.duration}</strong>
                </div>

                <div>
                  <span>Level</span>
                  <strong>{course.level}</strong>
                </div>

                <div>
                  <span>Rating</span>
                  <strong>⭐ {course.rating}</strong>
                </div>

                <div>
                  <span>Lessons</span>
                  <strong>{course.lessons?.length || 0}</strong>
                </div>
              </div>

              <div className="enrollment-instructor">
                <span>Instructor</span>
                <strong>{course.instructor?.name}</strong>
                <small>{course.instructor?.experience}</small>
              </div>

              <div className="enrollment-price">
                <span>Total Course Fee</span>
                <h2>₹{Number(course.fee || 0).toLocaleString("en-IN")}</h2>
              </div>

              <div className="enrollment-placement">
                ✓ {course.placement}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
