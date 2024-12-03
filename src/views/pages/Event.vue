<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, onUnmounted, ref } from 'vue';

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
        price: 235
    },
    {
        id: 2,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 320
    },
    {
        id: 3,
        image: 'concert.png',
        title: 'Thriller',
        date: '24/5/2025',
        description: 'Dewan Tuanku Syed Putra, USM',
        price: 450
    }
]);
let scrollInterval = null;

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
       
        <div class="container mx-auto p-6">
            <div class="flex flex-col md:flex-row space-x-4">
                <!-- Sidebar -->
                <div class="sm:w-auto bg-gray-50 p-4 rounded-lg">
                    <h2 class="text-lg font-semibold mb-4">Locations</h2>
                    <button class="bg-gray-200 text-sm py-1 px-4 rounded w-full" @click="clearFilters">Clear filters</button>
                    <div class="mt-6">
                        <h2 class="text-lg font-semibold mb-2">Stay in the loop</h2>
                        <input v-model="email" type="email" placeholder="your@email.com" class="border w-full p-2 rounded mb-2" />
                        <button class="bg-blue-500 text-white px-4 py-2 rounded w-full" @click="subscribe">Create alerts</button>
                    </div>
                </div>

                <!-- Event Cards -->
                <div class="flex flex-col md:flex-row gap-2">
                    <div v-for="event in events" :key="event.id" class="p-6 mx-auto bg-white shadow-lg rounded-lg">
                        <div class="relative">
                            <img :src="event.image" alt="Event Image" class="w-full h-48 object-cover rounded-lg" />
                            <!-- <div class="absolute top-2 left-2 bg-white rounded-full p-2 shadow">
                <i class="text-xl text-blue-500 material-icons">music_note</i>
              </div> -->
                        </div>
                        <h2 class="text-xl font-semibold mt-4">{{ event.title }}</h2>
                        <p class="text-gray-500">{{ event.description }}</p>
                        <p class="text-gray-700 font-bold">{{ event.date }}</p>
                        <div class="flex flex-wrap mt-2 space-x-2">
                            <span class="bg-gray-200 text-sm py-1 px-2 rounded">Music</span>
                            <!-- <span class="bg-gray-200 text-sm py-1 px-2 rounded">Min 1 year</span> -->
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
