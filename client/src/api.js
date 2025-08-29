// client/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// This part is crucial for sending the token with every request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    // For our current setup, we use 'x-auth-token'
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export default API;