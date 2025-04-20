import { useState } from 'react';
import { uploadFile } from '../services/api';

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file.');
    const response = await uploadFile(file);
    alert(response.message);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2"
      />
      <button onClick={handleFileUpload} className="bg-blue-500 text-white p-2 ml-2">
        Upload
      </button>
    </div>
  );
}

export default FileUploader;

