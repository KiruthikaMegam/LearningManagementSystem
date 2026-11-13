
import { createContext, useContext, useState } from "react";
import { initialCourses } from "../data/courseData";

const LMSContext = createContext();

export function LMSProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("qspiders_courses");

    if (saved) {
      try {
        const savedCourses = JSON.parse(saved);

        if (Array.isArray(savedCourses) && savedCourses.length > 0) {
          return savedCourses;
        }
      } catch {
        return initialCourses;
      }
    }

    return initialCourses;
  });

  const [enrollments, setEnrollments] = useState(() => {
    const saved = localStorage.getItem("qspiders_enrollments");

    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem("qspiders_completedLessons");

    try {
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [quizResults, setQuizResults] = useState(() => {
    const saved = localStorage.getItem("qspiders_quizResults");

    try {
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  function saveEnrollments(updatedEnrollments) {
    setEnrollments(updatedEnrollments);

    localStorage.setItem(
      "qspiders_enrollments",
      JSON.stringify(updatedEnrollments)
    );
  }

  function saveCourses(updatedCourses) {
    setCourses(updatedCourses);

    localStorage.setItem(
      "qspiders_courses",
      JSON.stringify(updatedCourses)
    );
  }

  // Create student enrollment
  function enrollCourse(studentId, courseId, studentDetails, mode = "Online") {
    const alreadyEnrolled = enrollments.some(
      (item) =>
        String(item.studentId) === String(studentId) &&
        String(item.courseId) === String(courseId) &&
        item.paymentStatus === "Paid"
    );

    if (alreadyEnrolled) {
      return {
        success: false,
        message: "You are already enrolled in this course."
      };
    }

    const existingPending = enrollments.find(
      (item) =>
        String(item.studentId) === String(studentId) &&
        String(item.courseId) === String(courseId) &&
        item.paymentStatus === "Pending"
    );

    if (existingPending) {
      return {
        success: true,
        enrollmentId: existingPending.id,
        message: "Please complete your payment."
      };
    }

    const course = courses.find(
      (item) => String(item.id) === String(courseId)
    );

    if (!course) {
      return {
        success: false,
        message: "Course not found."
      };
    }

    const newEnrollment = {
      id: Date.now(),
      studentId,
      courseId: course.id,
      studentDetails,
      mode,
      courseFee: Number(course.fee) || 0,
      enrollmentStatus: "Pending Payment",
      paymentStatus: "Pending",
      paymentId: null,
      enrolledAt: new Date().toISOString(),
      paidAt: null
    };

    saveEnrollments([...enrollments, newEnrollment]);

    return {
      success: true,
      enrollmentId: newEnrollment.id,
      message: "Enrollment successful. Please complete payment."
    };
  }

  // Complete demo payment
  function completeDemoPayment(enrollmentId) {
    const enrollment = enrollments.find(
      (item) => String(item.id) === String(enrollmentId)
    );

    if (!enrollment) {
      return {
        success: false,
        message: "Enrollment not found."
      };
    }

    if (enrollment.paymentStatus === "Paid") {
      return {
        success: true,
        message: "Payment is already completed."
      };
    }

    const updated = enrollments.map((item) =>
      String(item.id) === String(enrollmentId)
        ? {
            ...item,
            paymentStatus: "Paid",
            enrollmentStatus: "Enrolled",
            paymentId: "DEMO-" + Date.now(),
            paidAt: new Date().toISOString()
          }
        : item
    );

    saveEnrollments(updated);

    return {
      success: true,
      message: "Demo payment completed successfully!"
    };
  }

  // Check whether student has paid for a course
  function isCoursePaid(studentId, courseId) {
    return enrollments.some(
      (item) =>
        String(item.studentId) === String(studentId) &&
        String(item.courseId) === String(courseId) &&
        item.paymentStatus === "Paid"
    );
  }

  // Get one student's enrollment for a course
  function getEnrollment(studentId, courseId) {
    return enrollments.find(
      (item) =>
        String(item.studentId) === String(studentId) &&
        String(item.courseId) === String(courseId)
    ) || null;
  }

  // Get student's enrolled courses
  function getMyCourses(studentId) {
    return enrollments
      .filter(
        (item) =>
          String(item.studentId) === String(studentId) &&
          item.paymentStatus === "Paid"
      )
      .map((item) => {
        const course = courses.find(
          (course) =>
            String(course.id) === String(item.courseId)
        );

        if (!course) {
          return null;
        }

        return {
          ...item,
          course: {
            ...course,
            lessons: Array.isArray(course.lessons)
              ? course.lessons
              : []
          }
        };
      })
      .filter((item) => item !== null);
  }

  // Complete a lesson
  function completeLesson(studentId, courseId, lessonId) {
    if (!isCoursePaid(studentId, courseId)) {
      return false;
    }

    const key = `${studentId}_${courseId}`;
    const currentLessons = completedLessons[key] || [];

    if (currentLessons.includes(lessonId)) {
      return true;
    }

    const updated = {
      ...completedLessons,
      [key]: [...currentLessons, lessonId]
    };

    setCompletedLessons(updated);

    localStorage.setItem(
      "qspiders_completedLessons",
      JSON.stringify(updated)
    );

    return true;
  }

  // Get course progress
  function getCourseProgress(studentId, courseId) {
    if (!isCoursePaid(studentId, courseId)) {
      return 0;
    }

    const course = courses.find(
      (item) => String(item.id) === String(courseId)
    );

    if (!course || !Array.isArray(course.lessons) ||
        course.lessons.length === 0) {
      return 0;
    }

    const key = `${studentId}_${courseId}`;
    const completed = completedLessons[key] || [];

    return Math.min(
      100,
      Math.round((completed.length / course.lessons.length) * 100)
    );
  }

  // Save quiz result
  function submitQuiz(studentId, courseId, score, total) {
    if (!isCoursePaid(studentId, courseId)) {
      return false;
    }

    const key = `${studentId}_${courseId}`;

    const updated = {
      ...quizResults,
      [key]: {
        score,
        total,
        percentage:
          total > 0 ? Math.round((score / total) * 100) : 0,
        submittedAt: new Date().toISOString()
      }
    };

    setQuizResults(updated);

    localStorage.setItem(
      "qspiders_quizResults",
      JSON.stringify(updated)
    );

    return true;
  }

  // Get quiz result
  function getQuizResult(studentId, courseId) {
    const key = `${studentId}_${courseId}`;

    return quizResults[key] || null;
  }

  // Add course
  function addCourse(courseData) {
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      lessons: Array.isArray(courseData.lessons)
        ? courseData.lessons
        : []
    };

    saveCourses([...courses, newCourse]);
  }

  // Update course
  function updateCourse(courseId, updatedData) {
    const updated = courses.map((course) =>
      String(course.id) === String(courseId)
        ? { ...course, ...updatedData }
        : course
    );

    saveCourses(updated);
  }

  // Delete course
  function deleteCourse(courseId) {
    const updated = courses.filter(
      (course) => String(course.id) !== String(courseId)
    );

    saveCourses(updated);
  }

  return (
    <LMSContext.Provider
      value={{
        courses,
        enrollments,
        completedLessons,
        quizResults,
        enrollCourse,
        completeDemoPayment,
        isCoursePaid,
        getEnrollment,
        getMyCourses,
        completeLesson,
        getCourseProgress,
        submitQuiz,
        getQuizResult,
        addCourse,
        updateCourse,
        deleteCourse
      }}
    >
      {children}
    </LMSContext.Provider>
  );
}

export function useLMS() {
  return useContext(LMSContext);
}
