
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import "./Payment.css";

export default function Payment() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { enrollments, courses, completeDemoPayment } = useLMS();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const enrollment = enrollments.find(
    (item) => String(item.id) === String(enrollmentId)
  );

  const course = courses.find(
    (item) => String(item.id) === String(enrollment?.courseId)
  );

  function handlePayment() {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (
      !enrollment ||
      String(enrollment.studentId) !== String(currentUser.id)
    ) {
      setError("Enrollment not found.");
      return;
    }

    if (enrollment.paymentStatus === "Paid") {
      setSuccess(true);
      return;
    }

    setProcessing(true);
    setError("");

    const result = completeDemoPayment(enrollment.id);

    setProcessing(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message || "Payment could not be completed.");
    }
  }

  if (!currentUser) {
    return (
      <div className="payment-page">
        <div className="payment-message">
          <h2>Please Login</h2>
          <p>Please login to continue your payment.</p>
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  }

  if (!enrollment || !course) {
    return (
      <div className="payment-page">
        <div className="payment-message">
          <h2>Payment Details Not Found</h2>
          <p>Please enroll in a course before making payment.</p>
          <button onClick={() => navigate("/courses")}>
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  if (
    String(enrollment.studentId) !== String(currentUser.id)
  ) {
    return (
      <div className="payment-page">
        <div className="payment-message">
          <h2>Access Denied</h2>
          <p>This payment belongs to another student account.</p>
          <button onClick={() => navigate("/my-courses")}>
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-heading">
        <span>SECURE CHECKOUT</span>
        <h1>Complete Your Payment</h1>
        <p>Review your course details before confirming.</p>
      </div>

      {success ? (
        <div className="payment-success">
          <div className="payment-success-icon">✓</div>

          <h2>Payment Successful!</h2>

          <p>
            Your demo payment has been completed successfully.
            You can now access your course lessons and quizzes.
          </p>

          <div className="payment-success-details">
            <div>
              <span>Course</span>
              <strong>{course.title}</strong>
            </div>

            <div>
              <span>Payment ID</span>
              <strong>{enrollment.paymentId || "DEMO PAYMENT"}</strong>
            </div>

            <div>
              <span>Amount Paid</span>
              <strong>
                ₹{Number(enrollment.courseFee || course.fee || 0).toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="payment-paid-status">Paid</strong>
            </div>
          </div>

          <button
            className="payment-main-button"
            onClick={() => navigate(`/enrollment/${course.id}`)}
          >
            View My Enrolled Course
          </button>
        </div>
      ) : (
        <div className="payment-layout">
          <div className="payment-method-card">
            <h2>Demo Payment</h2>

            <p className="payment-description">
              This is a simulated payment for your college project.
              No actual transaction will take place.
            </p>

            <div className="demo-payment-box">
              <div className="demo-payment-icon">₹</div>

              <div>
                <strong>Demo Payment Gateway</strong>
                <span>Test payment mode</span>
              </div>

              <span className="demo-payment-badge">DEMO</span>
            </div>

            <div className="payment-security">
              <span>🔒</span>

              <div>
                <strong>Safe Demo Transaction</strong>
                <p>No bank details or card information required.</p>
              </div>
            </div>

            {error && (
              <div className="payment-error">{error}</div>
            )}

            <button
              className="payment-main-button"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing..." : "Pay Now"}

              {!processing && (
                <span>
                  ₹{Number(enrollment.courseFee || course.fee || 0).toLocaleString("en-IN")}
                </span>
              )}
            </button>

            <p className="payment-disclaimer">
              By clicking Pay Now, you are confirming a simulated demo payment.
            </p>
          </div>

          <div className="payment-summary-card">
            <h2>Order Summary</h2>

            <img src={course.image} alt={course.title} />

            <h3>{course.title}</h3>

            <p>{course.shortDescription}</p>

            <div className="payment-summary-info">
              <div>
                <span>Student</span>
                <strong>
                  {enrollment.studentDetails?.name || currentUser.name}
                </strong>
              </div>

              <div>
                <span>Learning Mode</span>
                <strong>{enrollment.mode}</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>{course.duration}</strong>
              </div>
            </div>

            <div className="payment-total">
              <span>Total Amount</span>

              <strong>
                ₹{Number(enrollment.courseFee || course.fee || 0).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
