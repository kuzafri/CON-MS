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
        
        // No authentication required - all requests are public
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
        // Handle any errors without authentication requirements
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;