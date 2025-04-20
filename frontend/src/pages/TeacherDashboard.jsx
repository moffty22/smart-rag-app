import React from "react";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-yellow-500 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 w-4/5">
        <div className="bg-yellow-500 text-black p-4 rounded shadow-lg">
          <h2 className="font-bold">Class RAG Reports</h2>
          <p>View and manage student RAG reports.</p>
        </div>
        <div className="bg-yellow-500 text-black p-4 rounded shadow-lg">
          <h2 className="font-bold">Generate Class QR Code</h2>
          <p>Share the QR code or link for student registration.</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

