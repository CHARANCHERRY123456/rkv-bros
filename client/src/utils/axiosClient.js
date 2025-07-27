import axios from "axios";
import envVars from '../config/config.js';

const backendUrl = envVars.VITE_BASE_URL;

const axiosClient = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Add a request interceptor to attach token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
