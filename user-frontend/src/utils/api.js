import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;