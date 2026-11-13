
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LMSProvider } from "./context/LMSContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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

import ScrollToTop from "./components/ScrollToTop";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LMSProvider>
          <ScrollToTop />
          <Navbar />

          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enrollment/:id" element={<Enrollment />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/payment/:enrollmentId" element={<Payment />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Pages */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-courses"
              element={
                <ProtectedRoute role="student">
                  <MyCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lesson/:courseId/:lessonId"
              element={
                <ProtectedRoute role="student">
                  <LessonViewer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/quiz/:courseId"
              element={
                <ProtectedRoute role="student">
                  <Quiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="/enrollment"
              element={<Navigate to="/courses" replace />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Pages */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute role="admin">
                  <ManageCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/students"
              element={
                <ProtectedRoute role="admin">
                  <ManageStudents />
                </ProtectedRoute>
              }
            />

          </Routes>

          <Footer />
        </LMSProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
