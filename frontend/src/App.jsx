import React, { useEffect } from "react";
import { useRedirectToDashboard } from "./utils/roleHandler"; // Import the custom hook
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GuestPage from "./pages/GuestPage";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentRegister from "./components/StudentRegister";
import StudentDashboard from "./components/StudentDashboard";
import ReportsPage from "./pages/ReportsPage";
import GenerateQuestionsPage from "./pages/GenerateQuestionsPage";
import UploadComponent from "./components/UploadComponent";
import ReviewReport from "./components/ReviewReport";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from "./pages/RegisterPage";  // Import the RegisterPage component

const App = () => {
  useRedirectToDashboard(); // Use the custom hook here

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Your routing system or other methods for navigation */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} /> {/* You can set a HomePage or change it to any other default page */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Register page route */}
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/guest" element={<GuestPage />} /> {/* Make sure this matches the "Try It Now" link */}

          {/* Protected Routes using PrivateRoute */}
          <Route
            path="/teacher-dashboard"
            element={
              <PrivateRoute>
                <TeacherDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          {/* Additional Routes */}
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/generate-questions" element={<GenerateQuestionsPage />} />
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/review-report" element={<ReviewReport />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;

