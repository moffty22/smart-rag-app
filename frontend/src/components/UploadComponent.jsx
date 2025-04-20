import React, { useRef } from 'react';

const UploadComponent = () => {
    const fileInput = useRef();

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('files', fileInput.current.files[0]);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Upload failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Upload successful', data);

        } catch (error) {
            console.error('Upload error:', error);
            alert(`Upload failed. Please try again. Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" ref={fileInput} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadComponent;

