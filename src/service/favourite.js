import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
    const favoriteEvents = ref([]);

    const addToFavorites = (event) => {
        const existingIndex = favoriteEvents.value.findIndex(fav => fav.id === event.id);
        
        if (existingIndex === -1) {
            favoriteEvents.value.push({
                ...event,
                favoritedAt: new Date()
            });
        }
    };

    const removeFromFavorites = (eventId) => {
        const index = favoriteEvents.value.findIndex(fav => fav.id === eventId);
        if (index !== -1) {
            favoriteEvents.value.splice(index, 1);
        }
    };

    const isFavorite = (eventId) => {
        return favoriteEvents.value.some(fav => fav.id === eventId);
    };

    return {
        favoriteEvents,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };
});