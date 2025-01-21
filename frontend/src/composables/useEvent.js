// src/composables/useEvents.js
import { ref } from 'vue';
import axios from '@/utils/axios';

export function useEvent() {
    const event = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchEventById = async (id) => {
        loading.value = true;
        error.value = null;
        
        try {
            const response = await axios.get(`/events/${id}`);
            event.value = response.data;
        } catch (err) {
            error.value = err.message || 'Failed to fetch event';
            console.error('Error fetching event:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        event,
        loading,
        error,
        fetchEventById
    };
}