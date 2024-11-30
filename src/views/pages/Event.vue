<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, onUnmounted, ref } from 'vue';

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
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col">
        <header class="bg-surface-0 dark:bg-surface-900 border-b-[1px] border-gray-400 shadow-lg">
            <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <a class="flex items-center" href="#">
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">Concertify</span>
                </a>
                <Button
                    class="lg:!hidden"
                    text
                    severity="secondary"
                    rounded
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                >
                    <i class="pi pi-bars !text-2xl"></i>
                </Button>
                <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
                    <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                        <li>
                            <a @click="smoothScroll('#hero')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/">Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#events')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/events">Events</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/ticket">My Ticket</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#pricing')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/favourite">Favourite</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                            <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                        </button>
                        <Button label="Logout" to="/auth/login" rounded></Button>
                    </div>
                </div>
            </div>
        </header>
        <div class="container mx-auto p-6">
            <div class="flex space-x-4">
                <!-- Sidebar -->
                <aside class="w-1/4 bg-gray-50 p-4 rounded-lg">
                    <h2 class="text-lg font-semibold mb-4">Locations</h2>
                    <button class="bg-gray-200 text-sm py-1 px-4 rounded w-full" @click="clearFilters">Clear filters</button>
                    <div class="mt-6">
                        <h2 class="text-lg font-semibold mb-2">Stay in the loop</h2>
                        <input v-model="email" type="email" placeholder="your@email.com" class="border w-full p-2 rounded mb-2" />
                        <button class="bg-blue-500 text-white px-4 py-2 rounded w-full" @click="subscribe">Create alerts</button>
                    </div>
                </aside>

                <!-- Event Cards -->
                <div class="flex-1 grid grid-cols-3 gap-6">
                    <div v-for="event in events" :key="event.id" class="p-6 bg-white shadow-lg rounded-lg">
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
