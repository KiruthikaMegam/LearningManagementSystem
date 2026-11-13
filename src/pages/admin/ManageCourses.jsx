
import { useState } from "react";
import { useLMS } from "../../context/LMSContext";
import "./ManageCourses.css";

const emptyCourse = {
  title: "",
  category: "",
  level: "Beginner",
  duration: "",
  fee: "",
  rating: 4.5,
  students: 0,
  mode: ["Online"],
  image: "/assets/java.jpg",
  shortDescription: "",
  description: "",
  instructor: {
    name: "",
    role: "Instructor",
    experience: ""
  },
  placement: "Placement assistance available",
  lessons: []
};

export default function ManageCourses() {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse
  } = useLMS();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyCourse);
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filteredCourses = courses.filter((course) => {
    const title = course.title.toLowerCase();
    const category = course.category.toLowerCase();
    const searchText = search.toLowerCase();

    return title.includes(searchText) || category.includes(searchText);
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "instructorName" || name === "instructorExperience") {
      setForm({
        ...form,
        instructor: {
          ...form.instructor,
          [name === "instructorName" ? "name" : "experience"]: value
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  }

  function handleModeChange(mode) {
    let updatedModes = [...form.mode];

    if (updatedModes.includes(mode)) {
      updatedModes = updatedModes.filter((item) => item !== mode);
    } else {
      updatedModes.push(mode);
    }

    setForm({
      ...form,
      mode: updatedModes
    });
  }

  function openAddForm() {
    setEditId(null);
    setForm({
      ...emptyCourse,
      instructor: { ...emptyCourse.instructor },
      mode: ["Online"],
      lessons: []
    });
    setMessage("");
    setShowForm(true);
  }

  function openEditForm(course) {
    setEditId(course.id);

    setForm({
      ...emptyCourse,
      ...course,
      mode: course.mode || ["Online"],
      instructor: {
        ...emptyCourse.instructor,
        ...course.instructor
      },
      lessons: course.lessons || []
    });

    setMessage("");
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.mode.length === 0) {
      setMessage("Please select at least one course mode.");
      return;
    }

    const courseData = {
      ...form,
      fee: Number(form.fee),
      rating: Number(form.rating),
      students: Number(form.students)
    };

    if (editId) {
      updateCourse(editId, courseData);
      setMessage("Course updated successfully!");
    } else {
      addCourse(courseData);
      setMessage("Course added successfully!");
    }

    setShowForm(false);
    setEditId(null);
    setForm(emptyCourse);
  }

  function handleDelete() {
    if (deleteId !== null) {
      deleteCourse(deleteId);
      setDeleteId(null);
    }
  }

  return (
    <div className="manage-courses-page">
      <div className="manage-heading">
        <div>
          <span className="admin-eyebrow">COURSE MANAGEMENT</span>
          <h1>Manage Courses</h1>
          <p>Create, update, and organize your learning courses.</p>
        </div>

        <button className="manage-add-btn" onClick={openAddForm}>
          + Add New Course
        </button>
      </div>

      {message && (
        <div className="manage-success-message">{message}</div>
      )}

      <div className="manage-course-toolbar">
        <div>
          <h2>All Courses</h2>
          <p>{courses.length} courses available</p>
        </div>

        <input
          type="search"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="manage-course-grid">
          {filteredCourses.map((course) => (
            <div className="manage-course-card" key={course.id}>
              <div className="manage-course-image">
                <img src={course.image} alt={course.title} />
                <span>{course.level}</span>
              </div>

              <div className="manage-course-content">
                <small>{course.category}</small>
                <h3>{course.title}</h3>
                <p>{course.shortDescription}</p>

                <div className="manage-course-details">
                  <span>⏱ {course.duration}</span>
                  <span>👨‍🎓 {course.students || 0} students</span>
                </div>

                <div className="manage-course-bottom">
                  <strong>
                    ₹{Number(course.fee).toLocaleString("en-IN")}
                  </strong>

                  <span>⭐ {course.rating}</span>
                </div>

                <div className="manage-course-actions">
                  <button
                    className="course-edit-btn"
                    onClick={() => openEditForm(course)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="course-delete-btn"
                    onClick={() => setDeleteId(course.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="manage-course-empty">
          <span>📚</span>
          <h3>No Courses Found</h3>
          <p>Try another search or add a new course.</p>
        </div>
      )}

      {showForm && (
        <div className="course-modal-overlay">
          <div className="course-modal">
            <div className="course-modal-heading">
              <div>
                <h2>{editId ? "Edit Course" : "Add New Course"}</h2>
                <p>Enter the course information below.</p>
              </div>

              <button
                type="button"
                className="course-modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="course-form-grid">
                <div className="course-form-group">
                  <label>Course Name *</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter course name"
                    required
                  />
                </div>

                <div className="course-form-group">
                  <label>Category *</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Example: Development"
                    required
                  />
                </div>

                <div className="course-form-group">
                  <label>Level *</label>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div className="course-form-group">
                  <label>Duration *</label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="Example: 6 Months"
                    required
                  />
                </div>

                <div className="course-form-group">
                  <label>Course Fee (₹) *</label>
                  <input
                    type="number"
                    name="fee"
                    min="0"
                    value={form.fee}
                    onChange={handleChange}
                    placeholder="Enter course fee"
                    required
                  />
                </div>

                <div className="course-form-group">
                  <label>Course Image Path</label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/assets/java.jpg"
                  />
                </div>

                <div className="course-form-group">
                  <label>Instructor Name *</label>
                  <input
                    name="instructorName"
                    value={form.instructor.name}
                    onChange={handleChange}
                    placeholder="Instructor name"
                    required
                  />
                </div>

                <div className="course-form-group">
                  <label>Instructor Experience</label>
                  <input
                    name="instructorExperience"
                    value={form.instructor.experience}
                    onChange={handleChange}
                    placeholder="Example: 5 Years"
                  />
                </div>

                <div className="course-form-group full-width">
                  <label>Short Description *</label>
                  <textarea
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleChange}
                    placeholder="Write a short course description"
                    required
                  />
                </div>

                <div className="course-form-group full-width">
                  <label>Course Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write the full course description"
                    required
                  />
                </div>

                <div className="course-form-group full-width">
                  <label>Course Mode</label>
                  <div className="course-mode-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={form.mode.includes("Online")}
                        onChange={() => handleModeChange("Online")}
                      />
                      Online
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={form.mode.includes("Offline")}
                        onChange={() => handleModeChange("Offline")}
                      />
                      Offline
                    </label>
                  </div>
                </div>
              </div>

              <div className="course-form-actions">
                <button
                  type="button"
                  className="course-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="course-save-btn">
                  {editId ? "Update Course" : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="course-modal-overlay">
          <div className="course-delete-modal">
            <div className="delete-modal-icon">🗑️</div>
            <h2>Delete Course?</h2>
            <p>Are you sure you want to delete this course?</p>

            <div className="course-form-actions">
              <button
                className="course-cancel-btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="course-confirm-delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
