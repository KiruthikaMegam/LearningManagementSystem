
import React from "react";
import "./Testimonial.css";

export default function Testimonial({ review }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {"★".repeat(review.rating)}
        <span>{"☆".repeat(5 - review.rating)}</span>
      </div>

      <p className="testimonial-message">
        "{review.message}"
      </p>

      <div className="testimonial-user">
        <div className="testimonial-avatar">
          {review.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h4>{review.name}</h4>
          <p>{review.course}</p>
        </div>
      </div>
    </div>
  );
}
