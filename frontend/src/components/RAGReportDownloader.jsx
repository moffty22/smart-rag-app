import React, { useState } from "react";
import axios from "axios";

function RAGReportDownloader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/download-rag-report", {
        responseType: "blob", // Ensures the response is treated as a file
      });

      // Create a downloadable link for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RAG_Report.xlsx"); // Default filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Failed to download the RAG report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-md shadow-sm bg-gray-50">
      <h2 className="text-xl font-bold mb-2">Download RAG Report</h2>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download"}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default RAGReportDownloader;

