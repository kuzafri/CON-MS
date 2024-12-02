<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, ref } from 'vue';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));
const categoriesContainer = ref(null);
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

onMounted(() => {
    startAutoScroll();
});

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>

<template>
    <!-- <div class="min-h-screen bg-gray-100 flex flex-col"> -->
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col">
        <header class="bg-surface-0 dark:bg-surface-900 border-b-[1px] border-gray-400 shadow-lg">
            <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <a class="flex items-center mx-4" href="#">
                    <img :src="logoSrc" alt="logo" class="w-full h-8" />
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
                            <a href="/homebook" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/event" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Events</span>
                            </a>
                        </li>
                        <li>
                            <a href="/ticket" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>My Ticket</span>
                            </a>
                        </li>
                        <li>
                            <a href="/favourite" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Favourite</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                            <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                        </button>
                        <Button label="Logout" as="router-link" to="/auth/login" rounded></Button>
                    </div>
                </div>
            </div>
        </header>

        <div class="hero-section relative flex flex-col items-center justify-center text-center h-[50vh] text-white">
            <h1 class="relative text-4xl md:text-6xl font-thin mb-6 text-white">Discover concert <br class="md:none" />around you.</h1>
            <div class="relative w-full max-w-xl flex items-center gap-4">
                <div class="mx-auto flex">
                    <input type="text" placeholder="Search for Events Nearby..." class="max-w-xl glass-search w-[50vw] px-6 py-3 text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    <button class="px-6 py-3 sm:mr-0 left-0 rounded-full">Search</button>
                </div>
            </div>
        </div>

        <div>
            <div class="flex-1 max-w-7xl mx-auto px-4 pt-8">
                <div class="grid grid-cols-1 gap-8">
                    <div class="bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-6 border-surface-0">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Categories</h2>
                        <div ref="categoriesContainer" class="overflow-x-auto scrollbar-hide" @mouseenter="stopAutoScroll" @mouseleave="startAutoScroll">
                            <div class="flex gap-4 md:gap-8 min-w-max pb-4">
                                <a
                                    v-for="(category, index) in ['Ballad', 'RnB', 'Rock', 'Indie', 'Pop', 'Jazz', 'Classical', 'Electronic', 'K-Pop', 'Hip-Hop', 'Malay Pop', 'Chill', 'Folk', 'Punk', 'Instrumental', 'Afro', 'Classical']"
                                    :key="index"
                                    href="#"
                                    class="bg-surface-100 dark:bg-surface-800 rounded-lg p-3 md:p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700 min-w-[100px] md:min-w-[120px]"
                                >
                                    <i class="fas fa-music text-xl md:text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-sm md:text-base text-surface-900 dark:text-surface-0">{{ category }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
                    <div class="col-span-2 bg-surface-0 dark:bg-surface-900 rounded-lg shadow md:p-6 sm:p-3">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Featured Events</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                <img src="/concert.jpeg" alt="Happy Holiday Music Concert" class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Malam Citra Budaya</h3>
                                    <p class="text-surface-600 dark:text-surface-400">MPP USM</p>
                                    <div class="flex flex-row mt-4">
                                        <div class="font-bold"><span class="text-sm">Starting from </span>RM50</div>
                                        <div class="bottom-0 right-0 ml-auto flex sm:flex-row">
                                            <Button label="See Detail" as="router-link" to="/eventdetail" rounded class="seedetail flex mr-4"></Button>
                                            <Button label="Book Now" as="router-link" to="/booking" rounded></Button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                <img src="/concert.png" alt="Suicide Band summer Bali Island" class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">REBEL 3.0: Because of you</h3>
                                    <p class="text-surface-600 dark:text-surface-400">USM Jazz Band</p>
                                    <div class="flex flex-row mt-4">
                                        <div class="font-bold"><span class="text-sm">Starting from </span>RM80</div>
                                        <div class="bottom-0 right-0 ml-auto">
                                            <Button label="See Detail" as="router-link" to="/eventdetail" rounded class="seedetail mr-4"></Button>
                                            <Button label="Book Now" as="router-link" to="/booking" rounded></Button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Add smooth scrolling */
.overflow-x-auto {
    scroll-behavior: smooth;
}

.seedetail {
    background-color: rgb(226, 226, 226);
    border-color: rgba(162, 162, 162, 0);
    color: rgb(96, 96, 96);
    /* display: flex; */
}

.hero-section {
    background: linear-gradient(135deg, #61d1bf, #8ac4ff, #eec8ff, #ffc6a3);
    background-size: 200% 200%; /* For a soft transition effect */
    animation: gradient-animation 10s ease infinite; /* Optional animation */
}
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.glass-search {
    background: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
    border: 1px solid rgba(255, 255, 255, 0.4); /* Subtle border for better visibility */
    backdrop-filter: blur(10px); /* Creates the frosted glass effect */
    -webkit-backdrop-filter: blur(10px); /* Safari support */
    border-radius: 50px; /* Rounded corners */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
    color: #fff;
}

/* Premium Gradient Title */
.text-gradient {
    background-clip: text;
    text-fill-color: transparent; /* For cross-browser support */
    font-weight: bold;
    letter-spacing: 1px;
}

/* Hover effect for search button */
button:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
}
</style>
