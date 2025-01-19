<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useEvent } from '@/composables/useEvent';
const route = useRoute();
const { event, loading, error, fetchEventById } = useEvent();

// Update eventDate to use the actual event date from the API
const eventDate = ref(new Date());
const activeTab = ref('about');

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let countdownInterval = null;

const updateCountdown = () => {
    const now = new Date();
    const timeDiff = eventDate.value - now;

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

onMounted(async () => {
    // Start countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // Fetch event data
    await fetchEventById(route.params.id);

    // Update countdown date when event data is loaded
    if (event.value) {
        eventDate.value = new Date(event.value.calendarValue);
    }
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
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col mt-14">
        <div>
            <div class="flex-1 max-w-7xl mx-auto px-4 mt-4">
                <!-- Show loading state -->
                <div v-if="loading" class="text-center py-8">
                    <p class="text-gray-600 dark:text-gray-300">Loading event details...</p>
                </div>

                <!-- Show error state -->
                <div v-else-if="error" class="text-center py-8">
                    <p class="text-red-600">{{ error }}</p>
                </div>

                <!-- Show event details -->
                <div v-else-if="event" class="max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden bg-surface-0 dark:bg-surface-900">
                    <div>
                        <img :src="event.image || '/concert.png'" :alt="event.concertTitle" class="w-full h-56 object-cover" />
                    </div>
                    <div class="p-4">
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ event.concertTitle }}</h1>
                        <p class="text-gray-600 dark:text-gray-300">
                            <span class="block">{{ event.venue || 'DTSP USM' }}</span>
                            <span>{{ new Date(event.calendarValue).toLocaleDateString() }} | Open Gate at {{ event.startTime }}</span>
                        </p>
                        <p class="mt-2 text-gray-600 dark:text-gray-300">{{ event.performers?.length || 0 }}+ Artists</p>
                    </div>

                    <div class="mt-8 flex flex-col items-center">
                        <div class="text-4xl font-bold text-primary dark:text-primary">Event Countdown</div>
                        <div class="flex flex-wrap justify-center gap-4 text-center">
                            <div class="flex-1 min-w-[80px] p-2 bg-white/10 rounded-md shadow-md">
                                <div class="text-6xl sm:text-8xl">{{ days }}</div>
                                <div class="text-gray-500">Days</div>
                            </div>
                            <div class="flex-1 min-w-[80px] p-2 bg-white/10 rounded-md shadow-md">
                                <div class="text-6xl sm:text-8xl">{{ hours }}</div>
                                <div class="text-gray-500">Hours</div>
                            </div>
                            <div class="flex-1 min-w-[80px] p-3 bg-white/10 rounded-md shadow-md">
                                <div class="text-6xl sm:text-8xl">{{ minutes }}</div>
                                <div class="text-gray-500">Minutes</div>
                            </div>
                            <div class="flex-1 min-w-[80px] p-3 bg-white/10 rounded-md shadow-md">
                                <div class="text-6xl sm:text-8xl">{{ seconds }}</div>
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
                                {{ event.description || 'No description available.' }}
                            </p>
                            <div class="mt-4">
                                <h3 class="font-semibold text-gray-800 dark:text-white">Genre:</h3>
                                <p class="text-gray-600 dark:text-gray-300">{{ event.genre }}</p>
                            </div>
                            <div class="mt-4">
                                <h3 class="font-semibold text-gray-800 dark:text-white">Performers:</h3>
                                <ul class="list-disc pl-5">
                                    <li v-for="performer in event.performers" :key="performer" class="text-gray-600 dark:text-gray-300">
                                        {{ performer }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div v-if="activeTab === 'buyTicket'" class="mt-4 relative">
                            <div class="mb-8">
                                <h3 class="font-semibold text-gray-800 dark:text-white mb-2">Ticket Prices:</h3>
                                <ul class="space-y-2">
                                    <li class="text-gray-600 dark:text-gray-300">Regular: RM{{ event.regularPrice }}</li>
                                    <li class="text-gray-600 dark:text-gray-300">Economy: RM{{ event.economyPrice }}</li>
                                    <li class="text-gray-600 dark:text-gray-300">VIP: RM{{ event.vipPrice }}</li>
                                </ul>
                            </div>
                            <Button class="button_buy right-0 absolute" label="Book Now" as="router-link" :to="{ name: 'Booking', params: { id: event._id } }" rounded></Button>
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

.countdown {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem; /* Adjust spacing between items */
}
.countdown div {
    padding: 0.5rem;
    flex: 1 1 calc(25% - 1rem); /* Adjusts to 25% of the container width minus the gap */
    min-width: 80px; /* Ensures a minimum size */
    text-align: center;
}

.button_buy {
    position: absolute;
    right: 0px;
}

@media (max-width: 768px) {
    .countdown div {
        flex: 1 1 50%; /* Two items per row on smaller screens */
    }
}

@media (max-width: 480px) {
    .countdown div {
        flex: 1 1 100%; /* One item per row on very small screens */
    }
}
</style>
