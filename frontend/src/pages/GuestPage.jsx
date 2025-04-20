import React, { useState } from "react";
import Button from "../components/Button";
import CameraUpload from "../components/CameraUpload";

const GuestPage = () => {
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (photos.length === 0) {
      alert("Please take or upload at least one photo.");
      return;
    }

    setIsUploading(true);
    console.log("Uploading files:", photos);

    // Create FormData to send files to backend
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append("files", photo); // ✅ Flask expects "files", not "photos"
    });

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} - ${response.statusText}`);
      }

      console.log("Upload success:", await response.json());

      // ✅ Fetch Excel RAG report
      const ragResponse = await fetch("http://localhost:5000/generate-rag-report");
      if (!ragResponse.ok) {
        throw new Error("Failed to generate RAG report.");
      }

      const blob = await ragResponse.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "RAG_Report.xlsx"; // 📥 Excel file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("RAG Report downloaded successfully as an Excel file!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Error uploading photos: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Upload Your Photos</h1>

      {/* Camera Upload Component */}
      <CameraUpload setPhotos={setPhotos} />

      {/* Show Uploaded Photos */}
      {photos.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Uploaded Files:</h2>
          <ul className="list-disc pl-5 text-gray-600">
            {photos.map((photo, index) => (
              <li key={index}>
                {photo.name || `Photo ${index + 1}`} {/* ✅ Display file name */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {isUploading ? "Uploading..." : "Upload All"}
      </Button>
    </div>
  );
};

export default GuestPage;

