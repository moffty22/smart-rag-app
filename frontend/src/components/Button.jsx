import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-secondary transition-transform transform hover:scale-105"
    >
      {label}
    </button>
  );
};

export default Button;

