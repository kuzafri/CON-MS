import axios from 'axios';
import { appConfig } from '@/config/app';

const api = axios.create({
    baseURL: appConfig.backend.enabled ? appConfig.backend.baseUrl : '',
    withCredentials: true,
    timeout: appConfig.backend.timeout
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // If backend is disabled, don't make actual requests
        if (!appConfig.backend.enabled) {
            console.warn('Backend is disabled. Request intercepted:', config.url);
            return Promise.reject(new Error('Backend is disabled - using dummy data'));
        }
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect to login if user was previously authenticated
            const token = localStorage.getItem('token');
            if (token) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Don't redirect automatically - let components handle it
                console.log('Token expired or invalid');
            }
        }
        return Promise.reject(error);
    }
);

export default api;