import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",  // Assuming your backend is running on localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows cookies to be included in requests
});

export default axiosInstance;


// http://localhost:3000
// https://mealmonkey.onrender.com/
// http://localhost:5173
// https://mealmonkey-food.vercel.app