import axios from "axios";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Always include cookies for JWT authentication
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add any required headers
api.interceptors.request.use(
  (config) => {
    // You can add additional headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response?.status === 401) {
      console.error("Authentication failed - redirecting to login");
      // You could redirect to login page here
    } else if (error.response?.status === 403) {
      console.error("Access forbidden");
    } else if (error.response?.status >= 500) {
      console.error("Server error occurred");
    }
    return Promise.reject(error);
  }
);

export default api;
