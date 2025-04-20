import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth SDK
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { db } from "../firebase/firebase-config"; // Firebase Firestore config
import { useNavigate } from "react-router-dom"; // For navigation after login

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State to display error message
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true while waiting for response
    setError(""); // Reset any previous error messages

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Firebase login
      const user = userCredential.user;

      // Retrieve user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        // Redirect to appropriate dashboard based on role
        if (userRole === "teacher") {
          navigate("/teacher-dashboard");
        } else if (userRole === "student") {
          navigate("/student-dashboard");
        } else {
          setError("User role is undefined. Please contact support.");
        }
      } else {
        setError("User not found in the database. Please contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Error logging in. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state after login attempt
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* If there's an error, show the error message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email change
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            disabled={loading} // Disable input if loading
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle password change
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            disabled={loading} // Disable input if loading
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        {/* Add a link to the signup page */}
        <p>
          Don't have an account? <a href="/register" className="text-blue-600">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

