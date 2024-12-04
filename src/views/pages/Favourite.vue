<script setup>
import { HeartIcon } from 'lucide-vue-next';
import { computed } from 'vue';
// import { Button } from '@/components/ui/button';
import { useFavoriteStore } from '@/stores/favorite';

const favoriteStore = useFavoriteStore();

const favorites = computed(() => favoriteStore.favorites);
const hasFavorites = computed(() => favorites.value.length > 0);

const removeFavorite = (event) => {
    favoriteStore.removeFavorite(event.id);
};
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col mt-14">
        <div class="container mx-auto py-6">
            <h1 class="text-2xl font-bold mb-6 dark:text-white">My Favorites</h1>

            <div v-if="!hasFavorites" class="text-center py-12 dark:text-white">
                <p class="text-lg mb-4">No favorite events yet</p>
                <Button as="router-link" to="/event" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Explore Events </Button>
            </div>

            <div v-else class="flex flex-wrap gap-4">
                <div v-for="event in favorites" :key="event.id" class="dark:bg-surface-800 p-6 bg-white shadow-lg rounded-lg w-max sm:w-1/3 relative">
                    <div class="relative">
                        <img :src="event.image" alt="Event Image" class="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div class="flex flex-row mt-4">
                        <h2 class="text-xl font-semibold mt-4">{{ event.title }}</h2>
                        <button @click="removeFavorite(event)" class="focus:outline-none right-5 absolute">
                            <HeartIcon fill="red" stroke="red" class="w-6 h-6 hover:scale-110 transition-transform" />
                        </button>
                    </div>
                    <p class="text-gray-500 dark:text-white">{{ event.description }}</p>
                    <p class="text-gray-700 dark:text-white font-bold">{{ event.date }}</p>
                    <div class="flex flex-wrap mt-2 space-x-2">
                        <span class="bg-gray-200 dark:text-black text-sm py-1 px-2 rounded">Music</span>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-lg font-bold">RM{{ event.price }}</span>
                        <Button as="router-link" to="/booking" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> Buy now </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Additional styles can be added here if needed */
</style>
