// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-12">
        <ul className="flex space-x-12 text-xl font-bold text-white">
          <li>
            <Link to="/" className="flex items-center hover:text-indigo-300 transition-transform transform hover:scale-105">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="flex items-center hover:text-indigo-300 transition-transform transform hover:scale-105">
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="flex items-center hover:text-indigo-300 transition-transform transform hover:scale-105">
              <FaUserPlus className="mr-2" /> Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

