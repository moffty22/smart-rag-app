import React from "react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-yellow-500 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <button className="px-8 py-4 bg-yellow-500 text-black rounded-lg shadow-lg">
          Take Picture
        </button>
        <button className="px-8 py-4 bg-yellow-500 text-black rounded-lg shadow-lg">
          Upload Existing Photo
        </button>
        <button className="px-8 py-4 bg-yellow-500 text-black rounded-lg shadow-lg">
          Download RAG Report
        </button>
        <button className="px-8 py-4 bg-yellow-500 text-black rounded-lg shadow-lg">
          Generate Similar Questions
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;

