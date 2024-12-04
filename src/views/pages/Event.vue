<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { HeartIcon } from 'lucide-vue-next'; // Assuming you're using Lucide icons

const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));
const categoriesContainer = ref(null);
const email = ref('');
const events = ref([
    {
        id: 1,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 235,
        isFavorite: false
    },
    {
        id: 2,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 320,
        isFavorite: false
    },
    {
        id: 3,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 450,
        isFavorite: false
    },
    {
        id: 1,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 235,
        isFavorite: false
    },
    {
        id: 2,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 320,
        isFavorite: false
    },
    {
        id: 3,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 450,
        isFavorite: false
    }
]);
let scrollInterval = null;

const toggleFavorite = (event) => {
    event.isFavorite = !event.isFavorite;
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
});

onUnmounted(() => {
    stopAutoScroll();
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col mt-14">
        <div class="container mx-auto py-6">
            <div class="flex flex-col md:flex-row">
                <!-- Sidebar -->
                <div class="sm:w-auto mx-3 h-max p-4 rounded-lg dark:bg-surface-800">
                    <h2 class="text-lg font-semibold mb-4 dark:text-white">Locations</h2>
                    <button class="bg-gray-200 text-sm py-1 px-4 rounded w-full" @click="clearFilters">Clear filters</button>
                    <div class="mt-6">
                        <h2 class="text-lg font-semibold mb-2 dark:text-white">Stay in the loop</h2>
                        <input v-model="email" type="email" placeholder="your@email.com" class="border w-full p-2 rounded mb-2" />
                        <button class="bg-blue-500 text-white px-4 py-2 rounded w-full" @click="subscribe">Create alerts</button>
                    </div>
                </div>

                <!-- Event Cards -->
                <div class="flex flex-wrap gap-2 w-full">
                    <div v-for="event in events" :key="event.id" class="ml-2 dark:bg-surface-800 p-6 bg-white shadow-lg rounded-lg w-max sm:w-1/3 relative">
                        <div class="relative">
                            <img :src="event.image" alt="Event Image" class="w-full h-48 object-cover rounded-lg" />
                        </div>
                        <div class="flex flex-row mt-4">
                            <h2 class="text-xl font-semibold mt-4">{{ event.title }}</h2>
                            <button 
                                @click="toggleFavorite(event)" 
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
                        <p class="text-gray-700 dark:text-white font-bold">{{ event.date }}</p>
                        <div class="flex flex-wrap mt-2 space-x-2">
                            <span class="bg-gray-200 dark:text-black text-sm py-1 px-2 rounded">Music</span>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-lg font-bold">RM{{ event.price }}</span>
                            <Button as="router-link" to="/booking" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add custom styles if needed. */
</style>