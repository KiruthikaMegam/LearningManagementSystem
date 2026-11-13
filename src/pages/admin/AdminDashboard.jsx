
import { useAuth } from "../../context/AuthContext";
import { useLMS } from "../../context/LMSContext";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { users } = useAuth();
  const { courses, enrollments } = useLMS();

  const students = users.filter((user) => user.role === "student");

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: "👨‍🎓",
      color: "blue"
    },
    {
      title: "Total Courses",
      value: courses.length,
      icon: "📚",
      color: "red"
    },
    {
      title: "Enrollments",
      value: enrollments.length,
      icon: "📝",
      color: "green"
    },
    {
      title: "Available Courses",
      value: courses.length,
      icon: "🎯",
      color: "orange"
    }
  ];

  const recentStudents = students.slice(-5).reverse();
  const recentCourses = courses.slice(-5).reverse();

  return (
    <div className="admin-dashboard">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">ADMINISTRATION</span>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening in your LMS.</p>
        </div>

        <Link to="/admin/courses" className="admin-primary-btn">
          + Add Course
        </Link>
      </div>

      <div className="admin-stats-grid">
        {stats.map((item) => (
          <div className="admin-stat-card" key={item.title}>
            <div className={`admin-stat-icon ${item.color}`}>
              {item.icon}
            </div>

            <div>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Students</h2>
              <p>Recently registered students</p>
            </div>

            <Link to="/admin/students">View All</Link>
          </div>

          {recentStudents.length > 0 ? (
            <div className="admin-recent-list">
              {recentStudents.map((student) => (
                <div className="admin-recent-item" key={student.id}>
                  <div className="admin-student-avatar">
                    {student.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="admin-recent-info">
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                  </div>

                  <span className="admin-status active">Student</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty">
              <span>👨‍🎓</span>
              <p>No students registered yet.</p>
            </div>
          )}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Courses</h2>
              <p>Recently added courses</p>
            </div>

            <Link to="/admin/courses">Manage</Link>
          </div>

          {recentCourses.length > 0 ? (
            <div className="admin-recent-list">
              {recentCourses.map((course) => (
                <div className="admin-recent-item" key={course.id}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="admin-course-thumb"
                  />

                  <div className="admin-recent-info">
                    <h3>{course.title}</h3>
                    <p>{course.category} · {course.level}</p>
                  </div>

                  <span className="admin-course-fee">
                    ₹{Number(course.fee).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty">
              <span>📚</span>
              <p>No courses available.</p>
            </div>
          )}
        </section>
      </div>

      <section className="admin-quick-actions">
        <h2>Quick Actions</h2>

        <div className="admin-action-grid">
          <Link to="/admin/courses" className="admin-action-card">
            <span>📚</span>
            <div>
              <h3>Manage Courses</h3>
              <p>Add or update learning courses</p>
            </div>
            <strong>→</strong>
          </Link>

          <Link to="/admin/students" className="admin-action-card">
            <span>👥</span>
            <div>
              <h3>Manage Students</h3>
              <p>View registered student accounts</p>
            </div>
            <strong>→</strong>
          </Link>
        </div>
      </section>
    </div>
  );
}
