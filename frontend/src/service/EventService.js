// services/eventService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const eventService = {
    async getEvents() {
        try {
            const response = await axios.get(`${API_URL}/events`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    async getEventById(id) {
        try {
            const response = await axios.get(`${API_URL}/events/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    }
};