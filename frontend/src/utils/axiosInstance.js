import axios from "axios";
import { SERVER_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows cookies to be included in requests
});

export default axiosInstance;