import React, { useState } from "react";
import axios from "axios";

const TextExtractor = ({ file, onTextExtracted }) => {
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState(null);

  const handleExtractText = async () => {
    if (!file) {
      setError("Please upload a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/extract-text", formData);
      const text = response.data.text;
      setExtractedText(text);
      onTextExtracted(text); // Pass extracted text to parent or other components
    } catch (err) {
      setError("Failed to extract text from the image.");
    }
  };

  return (
    <div className="text-extractor">
      <button onClick={handleExtractText}>Extract Text</button>
      {extractedText && <p>Extracted Text: {extractedText}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TextExtractor;

