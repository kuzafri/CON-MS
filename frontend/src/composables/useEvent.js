// src/composables/useEvents.js
import { ref } from 'vue';
import axios from 'axios';

export function useEvent() {
    const events = ref([]);
    const event = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchEvents = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api/events');
            events.value = response.data;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const fetchEventById = async (id) => {
        loading.value = true;
        try {
            const response = await axios.get(`/api/events/${id}`);
            event.value = response.data;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        events,
        event,
        loading,
        error,
        fetchEvents,
        fetchEventById
    };
}