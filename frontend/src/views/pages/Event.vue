<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { HeartIcon } from 'lucide-vue-next';
import { useFavoriteStore } from '@/stores/favorite';
import { eventService } from '@/service/EventService';
import axios from 'axios';

const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));
const categoriesContainer = ref(null);
const email = ref('');
const events = ref([]);
const loading = ref(true);
const error = ref(null);
const allEvents = ref([]);

let scrollInterval = null;

const favoriteStore = useFavoriteStore();

const fetchAllEvents = async () => {
    try {
        loading.value = true;
        const response = await axios.get('http://localhost:5001/api/events');
        console.log('Response:', response.data);

        if (!response.data || !Array.isArray(response.data)) {
            error.value = 'Invalid response data received';
            return;
        }

        allEvents.value = response.data.map((event) => ({
            _id: event._id,
            title: event.concertTitle,
            venue: 'DTSP USM',
            image: '/concert.png',
            price: event.economyPrice,
            date: new Date(event.calendarValue).toLocaleDateString(),
            startTime: event.startTime,
            genre: event.genre,
            performers: event.performers
        }));
        error.value = null;
    } catch (err) {
        console.error('Full error:', err);
        error.value = 'Failed to fetch events. Please try again later.';
        allEvents.value = [];
    } finally {
        loading.value = false;
    }
};

const toggleFavorite = (event) => {
    if (favoriteStore.isFavorite(event.id)) {
        favoriteStore.removeFavorite(event.id);
        event.isFavorite = false;
    } else {
        favoriteStore.addFavorite(event);
        event.isFavorite = true;
    }
};

const startAutoScroll = () => {
    if (!categoriesContainer.value) return;

    scrollInterval = setInterval(() => {
        const container = categoriesContainer.value;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0;
        } else {
            container.scrollLeft += 1;
        }
    }, 30);
};

const stopAutoScroll = () => {
    if (scrollInterval) {
        clearInterval(scrollInterval);
    }
};

const smoothScroll = (id) => {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const clearFilters = () => {
    console.log('Filters cleared!');
};

const subscribe = () => {
    if (email.value.trim() !== '') {
        alert(`Subscribed with email: ${email.value}`);
        email.value = ''; // Clear the email input field
    } else {
        alert('Please enter a valid email!');
    }
};

// Layout actions
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

onMounted(() => {
    startAutoScroll();
    fetchAllEvents();
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col mt-14">
        <div class="mx-auto py-6">
            <div class="flex flex-col md:flex-row w-full">
                <!-- Sidebar -->
                <div class="sm:w-auto mx-3 h-max p-4 rounded-lg dark:bg-surface-800 mt-2">
                    <h2 class="text-lg font-semibold mb-4 dark:text-white">Locations</h2>
                    <button class="bg-gray-200 dark:text-black text-sm py-1 px-4 rounded w-full" @click="clearFilters">Clear filters</button>
                    <div class="mt-6">
                        <h2 class="text-lg font-semibold mb-2 dark:text-white">Stay in the loop</h2>
                        <input v-model="email" type="email" placeholder="your@email.com" class="border w-full p-2 rounded mb-2" />
                        <button class="bg-blue-500 text-white px-4 py-2 rounded w-full" @click="subscribe">Create alerts</button>
                    </div>
                </div>

                <!-- Event Cards -->
                <div v-if="allEvents.length > 0" class="flex flex-wrap gap-2 w-full mt-2">
                    <div v-for="event in allEvents" :key="event._id" class="ml-2 dark:bg-surface-800 p-6 bg-white shadow-lg rounded-lg sm:w-1/3 relative">
                        <router-link :to="{ name: 'EventDetail', params: { id: event._id } }" class="block">
                            <div class="relative">
                                <img :src="event.image" alt="Event Image" class="w-full h-48 object-cover rounded-lg" />
                            </div>
                            <div class="flex flex-row mt-4">
                                <h2 class="text-xl font-semibold mt-4">{{ event.title }}</h2>
                                <button 
                                    @click.stop="toggleFavorite(event)" 
                                    class="focus:outline-none right-5 absolute"
                                >
                                    <HeartIcon 
                                        :fill="event.isFavorite ? 'red' : 'none'" 
                                        :stroke="event.isFavorite ? 'red' : 'currentColor'" 
                                        class="w-6 h-6 hover:scale-110 transition-transform"
                                    />
                                </button>
                            </div>
                            <p class="text-gray-500 dark:text-white">{{ event.description }}</p>
                            <p class="text-gray-700 dark:text-white font-bold">{{ event.date }} {{ event.startTime }}</p>
                            <div class="flex flex-wrap mt-2 space-x-2">
                                <span class="bg-gray-200 dark:text-black text-sm py-1 px-2 rounded">{{ event.genre }}</span>
                                <span :class="`text-sm py-1 px-2 rounded ${
                                    event.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 
                                    event.status === 'Approved' ? 'bg-green-200 text-green-800' :
                                    'bg-gray-200 dark:text-black'}`"
                                >
                                    {{ event.status }}
                                </span>
                            </div>
                            <div class="flex justify-between items-center mt-4">
                                <span class="text-lg font-bold">RM{{ event.price }}</span>
                                <Button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy now</Button>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-else-if="loading" class="w-full flex justify-center items-center min-h-[200px]">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="w-full flex justify-center items-center min-h-[200px]">
                    <div class="text-red-500">{{ error }}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add custom styles if needed. */
</style>