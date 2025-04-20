// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <main className="flex-grow flex flex-col justify-center items-center text-white p-6">
        <h2 className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Smart RAG App</span>
        </h2>

        <p className="text-lg font-medium mb-4 text-center max-w-lg shadow-sm">
          <span className="italic">"Empowering Insights, One Question at a Time"</span>
        </p>

        <p className="text-md mb-6 text-center max-w-md leading-relaxed">
          Unlock smarter knowledge retrieval with our AI-powered platform, designed to enhance your learning experience.
        </p>

        <div className="flex space-x-6">
          <Link
            to="/guest"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
          >
            🚀 Try It Now
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-red-500 font-bold rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            🔑 Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

