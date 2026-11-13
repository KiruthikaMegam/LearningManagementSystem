
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLMS } from "../../context/LMSContext";
import "./ManageStudents.css";

export default function ManageStudents() {
  const { users, updateUsers } = useAuth();
  const { enrollments } = useLMS();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = users.filter(
    (user) => user.role === "student"
  );

  function getEnrollmentCount(studentId) {
    let count = 0;

    for (let i = 0; i < enrollments.length; i++) {
      if (enrollments[i].studentId === studentId) {
        count++;
      }
    }

    return count;
  }

  const enrolledStudents = students.filter(
    (student) => getEnrollmentCount(student.id) > 0
  );

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const name = (student.name || "").toLowerCase();
    const email = (student.email || "").toLowerCase();
    const phone = String(student.phone || "").toLowerCase();

    const matchesSearch =
      name.includes(searchText) ||
      email.includes(searchText) ||
      phone.includes(searchText);

    const enrollmentCount = getEnrollmentCount(student.id);

    let matchesStatus = true;

    if (statusFilter === "Enrolled") {
      matchesStatus = enrollmentCount > 0;
    } else if (statusFilter === "Not Enrolled") {
      matchesStatus = enrollmentCount === 0;
    }

    return matchesSearch && matchesStatus;
  });

  function handleDelete() {
    const updatedUsers = users.filter(
      (user) => user.id !== deleteId
    );

    updateUsers(updatedUsers);
    setDeleteId(null);
    setSelectedStudent(null);
  }

  return (
    <div className="manage-students-page">

      {/* PAGE HEADING */}
      <div className="manage-heading">
        <div>
          <span className="admin-eyebrow">
            STUDENT MANAGEMENT
          </span>

          <h1>Manage Students</h1>

          <p>
            View and manage all registered student accounts.
          </p>
        </div>

        <div className="student-total-badge">
          👥 {students.length} Students
        </div>
      </div>

      {/* STATISTICS */}
      <div className="student-stats">

        <div className="student-stat-card">
          <div className="student-stat-icon student-blue">
            👨‍🎓
          </div>

          <div>
            <p>Total Students</p>
            <h2>{students.length}</h2>
            <span>Registered accounts</span>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon student-green">
            📚
          </div>

          <div>
            <p>Enrolled Students</p>
            <h2>{enrolledStudents.length}</h2>
            <span>Students learning courses</span>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="student-stat-icon student-orange">
            📝
          </div>

          <div>
            <p>Total Enrollments</p>
            <h2>{enrollments.length}</h2>
            <span>Course registrations</span>
          </div>
        </div>

      </div>

      {/* SEARCH AND FILTER */}
      <div className="student-toolbar">

        <div className="student-toolbar-heading">
          <h2>Student Directory</h2>
          <p>
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        <div className="student-toolbar-controls">

          <div className="student-search">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Students</option>
            <option value="Enrolled">Enrolled Students</option>
            <option value="Not Enrolled">Not Enrolled</option>
          </select>

        </div>
      </div>

      {/* STUDENT CARDS */}
      {filteredStudents.length > 0 ? (

        <div className="student-card-grid">

          {filteredStudents.map((student) => {

            const enrollmentCount = getEnrollmentCount(student.id);

            return (
              <div className="student-profile-card" key={student.id}>

                <div className="student-card-top">

                  <div className="student-avatar-large">
                    {(student.name || "S").charAt(0).toUpperCase()}
                  </div>

                  <span
                    className={
                      enrollmentCount > 0
                        ? "student-active-badge"
                        : "student-inactive-badge"
                    }
                  >
                    {enrollmentCount > 0 ? "Enrolled" : "Not Enrolled"}
                  </span>

                </div>

                <div className="student-card-info">

                  <h3>{student.name}</h3>

                  <p>
                    <span>✉</span>
                    {student.email}
                  </p>

                  <p>
                    <span>☎</span>
                    {student.phone || "Phone not provided"}
                  </p>

                </div>

                <div className="student-card-enrollment">

                  <div>
                    <strong>{enrollmentCount}</strong>
                    <span>Enrolled Courses</span>
                  </div>

                  <div>
                    <strong>Student</strong>
                    <span>Account Type</span>
                  </div>

                </div>

                <div className="student-card-actions">

                  <button
                    className="student-view-btn"
                    onClick={() => setSelectedStudent(student)}
                  >
                    View Details
                  </button>

                  <button
                    className="student-delete-btn"
                    onClick={() => setDeleteId(student.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      ) : (

        <div className="students-empty">
          <div>👥</div>
          <h3>No Students Found</h3>
          <p>
            No students match your search or selected filter.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
          >
            Reset Filters
          </button>
        </div>

      )}

      {/* VIEW STUDENT MODAL */}
      {selectedStudent && (

        <div
          className="student-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >

          <div
            className="student-details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="student-details-close"
              onClick={() => setSelectedStudent(null)}
            >
              ×
            </button>

            <div className="student-details-header">

              <div className="student-avatar-large details-avatar">
                {(selectedStudent.name || "S")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <h2>{selectedStudent.name}</h2>

              <span>Student Account</span>

            </div>

            <div className="student-details-info">

              <div>
                <span>Email Address</span>
                <strong>{selectedStudent.email}</strong>
              </div>

              <div>
                <span>Phone Number</span>
                <strong>
                  {selectedStudent.phone || "Not provided"}
                </strong>
              </div>

              <div>
                <span>Account Type</span>
                <strong>Student</strong>
              </div>

              <div>
                <span>Enrolled Courses</span>
                <strong>
                  {getEnrollmentCount(selectedStudent.id)}
                </strong>
              </div>

            </div>

            <button
              className="student-modal-close-btn"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId !== null && (

        <div
          className="student-modal-overlay"
          onClick={() => setDeleteId(null)}
        >

          <div
            className="student-delete-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="student-delete-icon">
              🗑️
            </div>

            <h2>Delete Student?</h2>

            <p>
              Are you sure you want to delete this student account?
              This action cannot be undone.
            </p>

            <div className="student-modal-actions">

              <button
                className="student-cancel-btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="student-confirm-delete-btn"
                onClick={handleDelete}
              >
                Delete Student
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
