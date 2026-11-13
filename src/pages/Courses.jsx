
import React, { useState } from "react";

import CourseCard from "../components/CourseCard";
import CourseFilter from "../components/CourseFilter";

import { initialCourses } from "../data/courseData";

import "./Courses.css";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [];

  initialCourses.forEach((course) => {
    if (!categories.includes(course.category)) {
      categories.push(course.category);
    }
  });

  let filteredCourses = initialCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "price-low") {
    filteredCourses.sort((a, b) => a.fee - b.fee);
  } else if (sort === "price-high") {
    filteredCourses.sort((a, b) => b.fee - a.fee);
  } else if (sort === "rating") {
    filteredCourses.sort((a, b) => b.rating - a.rating);
  } else if (sort === "name") {
    filteredCourses.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="courses-page">

      <section className="courses-banner">
        <div className="page-container">
          <span>EXPLORE OUR PROGRAMS</span>
          <h1>Discover Your Perfect Course</h1>
          <p>
            Learn in-demand technologies and develop skills
            for your professional career.
          </p>
        </div>
      </section>

      <section className="courses-content section-padding">
        <div className="page-container">

          <div className="courses-heading">
            <div>
              <span>LEARNING PROGRAMS</span>
              <h2>All Courses</h2>
              <p>Find the right course for your career goals.</p>
            </div>

            <div className="courses-count">
              {filteredCourses.length} Courses Available
            </div>
          </div>

          <CourseFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            categories={categories}
          />

          {filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="courses-empty">
              <div>📚</div>
              <h3>No Courses Found</h3>
              <p>
                Try another search term or select a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSort("default");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
