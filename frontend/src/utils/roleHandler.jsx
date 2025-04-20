import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

// Custom hook to handle redirect based on user role
export const useRedirectToDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user role from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            console.log(`User role: ${role}`); // Debugging log
            // Redirect based on role
            if (role === "teacher") {
              navigate("/teacher-dashboard");
            } else if (role === "student") {
              navigate("/student-dashboard");
            } else {
              console.error("Unknown role:", role);
            }
          } else {
            console.error("User document does not exist in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        console.log("No user is signed in.");
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [navigate]);
};

