import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoriteStore = defineStore('favorite', () => {
    const favorites = ref([]);

    const addFavorite = (event) => {
        if (!favorites.value.some(fav => fav.id === event.id)) {
            favorites.value.push({ ...event, isFavorite: true });
        }
    };

    const removeFavorite = (eventId) => {
        favorites.value = favorites.value.filter(fav => fav.id !== eventId);
    };

    const isFavorite = (eventId) => {
        return favorites.value.some(fav => fav.id === eventId);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };
}); 