import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

// API methods
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
};

export const projectsAPI = {
  getAll: (featured = false) => api.get(`/projects${featured ? '?featured=true' : ''}`),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;