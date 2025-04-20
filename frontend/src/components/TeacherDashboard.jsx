// src/components/TeacherDashboard.jsx

import React, { useState } from "react";
import { db } from "../firebase/firebase-config";
import { QRCodeCanvas } from "qrcode.react"; // Corrected to use named import if required by your library

const TeacherDashboard = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [link, setLink] = useState("");

  // Function to generate a unique student registration link
  const generateRegistrationLink = async () => {
    try {
      // Generate a unique token for the registration link
      const token = Math.random().toString(36).substr(2, 9); // Use a more secure method in production

      // Save this token and associated teacher information in Firestore
      const studentData = {
        email: studentEmail,
        token: token,
        createdAt: new Date(),
      };

      await db.collection("teacher-student-links").doc(token).set(studentData);

      // Construct the registration URL
      const registrationLink = `https://yourapp.com/register?token=${token}`;
      setLink(registrationLink);
    } catch (error) {
      console.error("Error generating registration link: ", error);
    }
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <p>Generate a registration link for students:</p>
      <input
        type="email"
        placeholder="Student's Email"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
      />
      <button onClick={generateRegistrationLink}>Generate Registration Link</button>

      {link && (
        <div>
          <p>
            Share this link with the student:{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </p>
          <p>Or scan this QR code:</p>
          <QRCode value={link} size={128} />
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;

