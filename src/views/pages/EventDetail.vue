<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, onUnmounted, ref } from 'vue';

// Target event date
const eventDate = new Date('2024-12-25T00:00:00'); // Replace with your event date
const activeTab = ref('about');

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let countdownInterval = null;

const updateCountdown = () => {
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff <= 0) {
        clearInterval(countdownInterval);
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        return;
    }

    days.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((timeDiff / (1000 * 60)) % 60);
    seconds.value = Math.floor((timeDiff / 1000) % 60);
};

onMounted(() => {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});

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

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <!-- <div class="min-h-screen bg-gray-100 flex flex-col"> -->
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
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#events')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Events</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>My Ticket</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#pricing')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
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

        <div>
            <div class="flex-1 max-w-7xl mx-auto px-4 mt-4">
                <div class="max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden bg-surface-0 dark:bg-surface-900">
                    <!-- Event Header -->
                    <div>
                        <img src="/concert.png" alt="Hammersonic Festival" class="w-full h-56 object-cover" />
                    </div>
                    <div class="p-4">
                        <!-- Event Details -->
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Hammersonic Festival 2020</h1>
                        <p class="text-gray-600 dark:text-gray-300">
                            <span class="block">Carnaval Beach Ancol, Jakarta, Indonesia</span>
                            <span>May 16-17, 2020 | Open Gate at 10:00 AM</span>
                        </p>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">100+ Artists</p>
                    </div>

                    <div class="mt-8 flex flex-col items-center">
                        <div class="text-4xl font-bold text-primary dark:text-primary">Event Countdown</div>
                        <div class="flex md:space-x-8 sm:space-x-2 gap-6 mt-4 text-center md:text-2xl font-semibold text-surface-900 dark:text-surface-0">
                            <div>
                                <div class="text-8xl">{{ days }}</div>
                                <div class="text-gray-500">Days</div>
                            </div>
                            <div>
                                <div class="text-8xl">{{ hours }}</div>
                                <div class="text-gray-500">Hours</div>
                            </div>
                            <div>
                                <div class="text-8xl">{{ minutes }}</div>
                                <div class="text-gray-500">Minutes</div>
                            </div>
                            <div>
                                <div class="text-8xl">{{ seconds }}</div>
                                <div class="text-gray-500">Seconds</div>
                            </div>
                        </div>
                    </div>

                    <!-- Tabs -->
                    <div class="p-4">
                        <div class="flex space-x-4 border-b">
                            <button
                                @click="activeTab = 'about'"
                                :class="{
                                    'border-b-2 border-primary text-primary dark:text-primary': activeTab === 'about'
                                }"
                                class="py-2 px-4 font-medium text-gray-600 dark:text-gray-300 focus:outline-none"
                            >
                                <i :class="['pi', 'pi-info-circle', { 'text-primary dark:text-primary': activeTab === 'about', 'text-gray-500 dark:text-gray-400': activeTab !== 'about' }]"></i>
                                About
                            </button>
                            <button
                                @click="activeTab = 'buyTicket'"
                                :class="{
                                    'border-b-2 border-primary text-primary dark:text-primary': activeTab === 'buyTicket'
                                }"
                                class="py-2 px-4 font-medium text-gray-600 dark:text-gray-300 focus:outline-none"
                            >
                                <i :class="['pi', 'pi-ticket', { 'text-primary dark:text-primary': activeTab === 'buyTicket', 'text-gray-500 dark:text-gray-400': activeTab !== 'buyTicket' }]"></i>
                                Buy Ticket
                            </button>
                        </div>
                        <div v-if="activeTab === 'about'" class="mt-4">
                            <p class="text-gray-600 dark:text-gray-300">
                                Hammersonic Festival is a metal and rock international festival, held annually in Jakarta, Indonesia since 2012. It is the biggest metal and rock festival in Southeast Asia and even in Asia Pacific.
                            </p>
                        </div>
                        <div v-if="activeTab === 'buyTicket'" class="mt-4 relative">
                            <!-- <p class="text-gray-600 dark:text-gray-300">Ticket purchase functionality coming soon!</p> -->
                            <Button class="right-0 absolute" label="Book Now" as="router-link" to="/booking" rounded></Button>
                        </div>
                    </div>

                    <!-- Rundown -->
                    <div class="p-4">
                        <h2 class="text-lg font-bold text-gray-800 dark:text-white">Rundown</h2>
                        <ul class="mt-2 space-y-2">
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Underside (Nepal)</span>
                                <span>12:15 PM</span>
                            </li>
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Restraint (Malaysia)</span>
                                <span>12:45 PM</span>
                            </li>
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Overthrown (Singapore)</span>
                                <span>01:15 PM</span>
                            </li>
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Dark Mirror Ov Tragedy (South Korea)</span>
                                <span>01:45 PM</span>
                            </li>
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Solemn (Taiwan)</span>
                                <span>02:15 PM</span>
                            </li>
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Uncured (USA)</span>
                                <span>02:45 PM</span>
                            </li>
                            <li class="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Stillbirth (USA)</span>
                                <span>03:15 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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

.countdown div {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
