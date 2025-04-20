import axios from "axios";
import { useAuth } from "react-oidc-context";

// Base API URL (supports environment variables)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create an axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
});

// Attach authorization token to every request
apiClient.interceptors.request.use(
  async (config) => {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated && user) {
      const token = user.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.warn("User not authenticated or access token missing.");
    }

    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// ✅ **Register Teacher API Call**
export const registerTeacher = async (data) => {
  try {
    const response = await apiClient.post("/teacher/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering teacher:", error);
    throw error;
  }
};

// ✅ **Register Student API Call**
export const registerStudent = async (data) => {
  try {
    const response = await apiClient.post("/student/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering student:", error);
    throw error;
  }
};

// ✅ **Upload File API Call**
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("files", file);

  try {
    const response = await apiClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// ✅ **Generate Questions API Call**
export const generateQuestions = async (data) => {
  try {
    const response = await apiClient.post("/generate-questions", data);
    return response.data;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};

// ✅ **Fetch Reports API Call**
export const getReports = async () => {
  try {
    const response = await apiClient.get("/reports");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export default apiClient;

