import React from "react";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign the user out
      console.log("User logged out successfully");
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default Logout;

