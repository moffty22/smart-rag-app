import React, { useState, useEffect } from "react";

const ReviewReport = () => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // ✅ Fetch the RAG report data from Flask when the component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/review-report")
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch report: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched report data:", data);  // ✅ Debugging
        setReportData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        console.error("Error fetching report:", err);
      });
  }, []);

  const handleInputChange = (index, field, value) => {
    setReportData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const saveChanges = () => {
    setIsSaving(true);
    fetch("http://localhost:5000/api/review-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to save changes: ${response.status}`);
        return response.json();
      })
      .then(() => {
        setIsSaving(false);
        alert("Changes saved successfully!");
      })
      .catch((err) => {
        setIsSaving(false);
        alert(`Error: ${err.message}`);
        console.error("Error saving report:", err);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!reportData || !reportData.topics) return <p>No data available.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Review RAG Report</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Topic</th>
            <th className="border px-2 py-1">RAG Status</th>
            <th className="border px-2 py-1">Marks Scored</th>
            <th className="border px-2 py-1">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {reportData.topics.map((topic, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => handleInputChange(index, "topics", e.target.value)}
                  className="w-full px-2 py-1"
                  aria-label={`Topic ${index + 1}`}
                />
              </td>
              <td className="border px-2 py-1">
                <select
                  value={reportData.rag_status[index]}
                  onChange={(e) => handleInputChange(index, "rag_status", e.target.value)}
                  className="w-full px-2 py-1"
                  aria-label={`RAG Status ${index + 1}`}
                >
                  <option value="Red">Red</option>
                  <option value="Amber">Amber</option>
                  <option value="Green">Green</option>
                </select>
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={reportData.marks_scored[index]}
                  onChange={(e) => handleInputChange(index, "marks_scored", parseFloat(e.target.value))}
                  className="w-full px-2 py-1"
                  aria-label={`Marks Scored ${index + 1}`}
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={reportData.total_marks[index]}
                  onChange={(e) => handleInputChange(index, "total_marks", parseFloat(e.target.value))}
                  className="w-full px-2 py-1"
                  aria-label={`Total Marks ${index + 1}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={saveChanges}
          disabled={isSaving}
          className={`px-4 py-2 rounded ${isSaving ? "bg-gray-400" : "bg-blue-500 text-white"}`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ReviewReport;

