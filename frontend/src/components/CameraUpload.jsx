import React from "react";

const CameraUpload = ({ setPhotos }) => {
  const handlePhotoChange = async (event) => {
    const files = event.target.files;

    // ✅ Debug: Log selected files
    console.log("Files selected:", files);

    if (!files.length) {
      console.error("No files selected for upload.");
      return;
    }

    // Add files to state (if needed)
    const newPhotos = Array.from(files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    // ✅ Create FormData to send files to Flask
    const formData = new FormData();
    for (const file of newPhotos) {
      formData.append("files", file); // ✅ Must match `request.files.getlist('files')` in Flask
    }

    try {
      // ✅ Debug: Log before sending request
      console.log("Sending files to Flask backend...");

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Upload success:", result);
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed. Please try again. Error: ${error.message}`);
    }
  };

  const handleTakePhoto = () => {
    const inputElement = document.getElementById("camera-input");
    inputElement.click();
  };

  return (
    <div>
      <button onClick={handleTakePhoto} className="px-4 py-2 bg-blue-500 text-white rounded">
        Take/Upload Photo
      </button>
      <input
        id="camera-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange} // ✅ Calls function to send images to backend
        multiple
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CameraUpload;

