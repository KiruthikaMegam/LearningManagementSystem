
import React from "react";
import Testimonial from "../components/Testimonial";
import { initialCourses } from "../data/courseData";
import "./Ratings.css";

const reviews = [
  {
    id: 1,
    name: "Alex Morgan",
    rating: 5,
    course: "Java Full Stack Development",
    message:
      "The course helped me understand Java and web development step by step. The practical lessons were very useful."
  },
  {
    id: 2,
    name: "Sarah Williams",
    rating: 5,
    course: "Python Full Stack Development",
    message:
      "I enjoyed learning Python through practical examples. The course structure was easy to follow."
  },
  {
    id: 3,
    name: "John David",
    rating: 4,
    course: "Software Testing",
    message:
      "A good learning experience with useful testing concepts and hands-on practice."
  },
  {
    id: 4,
    name: "Priya Sharma",
    rating: 5,
    course: "React Development",
    message:
      "The React lessons helped me understand components, props, hooks, and project development."
  },
  {
    id: 5,
    name: "David Wilson",
    rating: 4,
    course: "Data Science",
    message:
      "The concepts were explained clearly. I especially liked the practical learning approach."
  },
  {
    id: 6,
    name: "Emily Rose",
    rating: 5,
    course: "UI/UX Design",
    message:
      "A helpful course for learning design principles and creating user-friendly interfaces."
  }
];

export default function Ratings() {
  const averageRating = (
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length
  ).toFixed(1);

  function getRatingCount(star) {
    return reviews.filter((review) => review.rating === star).length;
  }

  return (
    <div className="ratings-page">

      <section className="ratings-banner">
        <div className="page-container">
          <span>STUDENT FEEDBACK</span>
          <h1>Ratings & Reviews</h1>
          <p>
            Discover what learners say about their learning experience
            with our courses.
          </p>
        </div>
      </section>

      <section className="ratings-summary section-padding">
        <div className="page-container">

          <div className="ratings-summary-card">

            <div className="overall-rating">
              <h2>{averageRating}</h2>
              <div className="rating-stars">★★★★★</div>
              <p>Based on {reviews.length} demo reviews</p>
            </div>

            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = getRatingCount(star);
                const percentage = (count / reviews.length) * 100;

                return (
                  <div className="rating-row" key={star}>
                    <span>{star} ★</span>

                    <div className="rating-progress">
                      <div
                        className="rating-progress-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <span>{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="rating-course-count">
              <h3>{initialCourses.length}</h3>
              <p>Learning Programs</p>
              <span>Explore courses and start learning</span>
            </div>

          </div>

        </div>
      </section>

      <section className="ratings-reviews section-padding">
        <div className="page-container">

          <div className="ratings-heading">
            <span>LEARNER STORIES</span>
            <h2>What Our Students Say</h2>
            <p>
              Feedback from learners about their courses and learning journey.
            </p>
          </div>

          <div className="ratings-grid">
            {reviews.map((review) => (
              <div className="rating-review-card" key={review.id}>
                <Testimonial review={review} />
                <div className="review-course">
                  Course: {review.course}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="ratings-cta">
        <div className="page-container">
          <h2>Your Learning Journey Starts Here!</h2>
          <p>
            Explore our courses and build skills for your future.
          </p>
          <a href="/courses">Explore Courses →</a>
        </div>
      </section>

    </div>
  );
}
