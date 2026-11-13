import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LMSProvider } from "./context/LMSContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Enrollment from "./pages/Enrollment";
import Placements from "./pages/Placements";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Ratings from "./pages/Ratings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import MyCourses from "./pages/MyCourses";
import LessonViewer from "./pages/LessonViewer";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageStudents from "./pages/admin/ManageStudents";
import Payment from "./pages/Payment";

function NotFound() {
  return (
    <main className="not-found-page" style={{ minHeight: "55vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 20px" }}>
      <span style={{ fontSize: "64px", fontWeight: 800, color: "#e6176e" }}>404</span>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ marginTop: "18px", color: "#e6176e", fontWeight: 700 }}>Back to Home</a>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LMSProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enrollment/:id" element={<Enrollment />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/payment/:enrollmentId" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/my-courses" element={<ProtectedRoute role="student"><MyCourses /></ProtectedRoute>} />
            <Route path="/lesson/:courseId/:lessonId" element={<ProtectedRoute role="student"><LessonViewer /></ProtectedRoute>} />
            <Route path="/quiz/:courseId" element={<ProtectedRoute role="student"><Quiz /></ProtectedRoute>} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/courses" element={<ProtectedRoute role="admin"><ManageCourses /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </LMSProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
