import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-yellow-500 w-64 min-h-screen p-4">
      <ul className="space-y-4">
        <li className="text-black font-bold">Dashboard</li>
        <li className="text-black font-bold">Camera</li>
        <li className="text-black font-bold">Upload</li>
        <li className="text-black font-bold">Generate Questions</li>
        <li className="text-black font-bold">RAG Report</li>
      </ul>
    </div>
  );
};

export default Sidebar;

