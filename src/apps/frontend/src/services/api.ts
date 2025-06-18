import axios from 'axios';

// Create axios instance with base configuration
export const api = axios.create({
    baseURL: process.env.VITE_API_URL || 'http://localhost:3001/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle authorization errors
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }

        // Log errors in development mode
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', error);
        }

        return Promise.reject(error);
    }
);
