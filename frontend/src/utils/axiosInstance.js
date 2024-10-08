import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",  // Assuming your backend is running on localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows cookies to be included in requests
});

export default axiosInstance;
