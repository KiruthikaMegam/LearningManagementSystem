
import React from "react";
import "./CourseFilter.css";

export default function CourseFilter({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories
}) {
  return (
    <div className="course-filter">
      <div className="filter-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-select">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>

          {categories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-select">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Course Name</option>
        </select>
      </div>
    </div>
  );
}
