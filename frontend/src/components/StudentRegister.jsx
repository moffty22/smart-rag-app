import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";  // Replace useHistory with useNavigate

const StudentRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validToken, setValidToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    // Validate the token
    const validateToken = async () => {
      try {
        const docRef = db.collection("teacher-student-links").doc(token);
        const doc = await docRef.get();

        if (doc.exists) {
          setValidToken(true);
        } else {
          setError("Invalid or expired token.");
        }
      } catch (err) {
        setError("Error validating token.");
      }
    };

    if (token) {
      validateToken();
    } else {
      setError("No token provided.");
    }
  }, [token]);

  const handleRegister = async () => {
    if (!validToken) return;

    try {
      // Create the student account
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      // After successful registration, associate the student with the token
      await db.collection("users").doc(userCredential.user.uid).set({
        email,
        role: "student",
        teacherToken: token, // Link student with the teacher via the token
      });

      // Delete the token document from Firestore after the student registers
      await db.collection("teacher-student-links").doc(token).delete();

      // Redirect to student dashboard using navigate
      navigate("/student-dashboard");
    } catch (err) {
      setError("Error creating account: " + err.message);
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      {error && <p>{error}</p>}
      {validToken ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </>
      ) : (
        <p>Invalid or expired registration link.</p>
      )}
    </div>
  );
};

export default StudentRegister;

