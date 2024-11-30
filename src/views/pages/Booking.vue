<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

// State
const selectedSeats = ref([]);
const seatPrice = ref(80);

// Computed total price
const totalPrice = computed(() => {
    return selectedSeats.value.length * seatPrice.value;
});

// Generate curved row coordinates with seat groups
const generateCurvedRow = (rowIndex, centerX, startY, radius, spreadAngle) => {
    const seats = [];
    const seatsPerGroup = 12; // Each section has 12 seats
    const numGroups = 3; // Three distinct groups of seats
    const gapBetweenGroups = 4; // Gap between groups in pixels

    // Calculate total seats and angle steps
    const totalSeats = seatsPerGroup * numGroups;
    const angleStep = spreadAngle / (totalSeats + (numGroups - 2)); // Account for gaps
    const startAngle = -spreadAngle / 1.8;

    // Generate seats for each group
    for (let group = 0; group < numGroups; group++) {
        for (let i = 0; i < seatsPerGroup; i++) {
            const seatIndex = group * seatsPerGroup + i;
            // Add gap between groups by adjusting the angle
            const gapOffset = group * (gapBetweenGroups * (Math.PI / 180));
            const angle = startAngle + seatIndex * angleStep + gapOffset;

            const x = centerX + radius * Math.sin(angle);
            const y = startY - radius * Math.cos(angle);
            seats.push({
                x,
                y,
                id: `row-${rowIndex}-seat-${seatIndex}`,
                isReserved: Math.random() < 0.6,
                group: group + 1
            });
        }
    }
    return seats;
};

// Generate seating sections
const generateSections = () => {
    const sections = [];
    const centerX = 400;
    const startY = 800;

    // Main floor section
    const mainSection = [];
    for (let row = 0; row < 8; row++) {
        const radius = 460 + row * 40; // Increased spacing between rows
        const spreadAngle = Math.PI / 3 + row * 0.02; // Adjusted spread angle
        const seats = generateCurvedRow(row, centerX, startY, radius, spreadAngle);
        mainSection.push({ seats, rowLabel: String.fromCharCode(65 + row) });
    }
    sections.push({ rows: mainSection, name: 'Main Floor' });

    return sections;
};

const sections = generateSections();

// Handle seat selection
const handleSeatClick = (seat) => {
    if (seat.isReserved) return;

    const seatIndex = selectedSeats.value.findIndex((s) => s.id === seat.id);
    if (seatIndex === -1) {
        selectedSeats.value.push({
            id: seat.id,
            rowLabel: seat.rowLabel,
            seatNumber: seat.seatNumber,
            group: seat.group
        });
    } else {
        selectedSeats.value.splice(seatIndex, 1);
    }
};

const isSeatSelected = (seatId) => {
    return selectedSeats.value.some((s) => s.id === seatId);
};

const proceedToCheckout = () => {
    console.log('Proceeding to checkout with seats:', selectedSeats.value);
};
</script>

<template>
    <div class="min-h-screen bg-surface-0 dark:bg-surface-900">
        <!-- Header with dark mode support -->
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
                            <a href="/" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/events" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
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
                        <Button label="Logout" to="/auth/login" rounded></Button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Event Info Header -->
        <header class="bg-surface-50 dark:bg-surface-800 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center">
                    <img src="/concert.png" alt="CONMs" class="h-8" />
                    <div class="ml-6">
                        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">REBEL 3.0: Because of you</h1>
                        <p class="text-surface-600 dark:text-surface-400">Wed 2025-01-13 3.00 PM - 4.00 PM</p>
                        <p class="text-surface-600 dark:text-surface-400">Dewan Tuanku Syed Putra, USM</p>
                    </div>
                </div>
            </div>
        </header>
        <div class="min-h-screen bg-surface-0 dark:bg-surface-900 p-4">
            <div class="max-w-7xl mx-auto">
                <!-- Event Info -->
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Concert Hall Seating</h1>
                    <p class="text-surface-600 dark:text-surface-400">Select your seats for the event</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Seating Map -->
                    <div class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-10">
                        <div class="relative">
                            <svg viewBox="0 0 800 600" class="w-full">
                                <!-- Stage -->
                                <path d="M250,550 Q400,520 550,550" fill="none" stroke="currentColor" stroke-width="4" class="text-surface-400 dark:text-surface-500" />
                                <text x="400" y="560" text-anchor="middle" class="text-sm fill-current text-surface-900 dark:text-surface-0">STAGE</text>

                                <!-- Seating sections -->
                                <template v-for="(section, sectionIndex) in sections" :key="'section-' + sectionIndex">
                                    <g v-for="(row, rowIndex) in section.rows" :key="'row-' + rowIndex">
                                        <g v-for="(seat, seatIndex) in row.seats" :key="seat.id">
                                            <rect
                                                :x="seat.x - 6"
                                                :y="seat.y - 6"
                                                width="12"
                                                height="12"
                                                rx="2"
                                                @click="handleSeatClick({ ...seat, rowLabel: row.rowLabel, seatNumber: seatIndex + 1 })"
                                                :class="{
                                                    'fill-primary-500 cursor-pointer hover:fill-primary-600': !seat.isReserved && !isSeatSelected(seat.id),
                                                    'fill-red-500': isSeatSelected(seat.id),
                                                    'fill-surface-400 cursor-not-allowed': seat.isReserved
                                                }"
                                            />
                                        </g>
                                        <!-- Row labels -->
                                        <text :x="50" :y="row.seats[0].y" class="text-xs fill-current text-surface-900 dark:text-surface-0" alignment-baseline="middle">
                                            {{ row.rowLabel }}
                                        </text>
                                    </g>
                                </template>
                            </svg>

                            <!-- Legend -->
                            <div class="absolute bottom-1 right-1 bg-surface-0 dark:bg-surface-900 p-3 rounded shadow">
                                <div class="flex items-center mb-2">
                                    <div class="w-4 h-4 bg-primary-500 rounded mr-2"></div>
                                    <span class="text-surface-900 dark:text-surface-0">Available</span>
                                </div>
                                <div class="flex items-center mb-2">
                                    <div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
                                    <span class="text-surface-900 dark:text-surface-0">Selected</span>
                                </div>
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-surface-400 rounded mr-2"></div>
                                    <span class="text-surface-900 dark:text-surface-0">Reserved</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Selected Seats Info -->
                    <div class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Selected Seats</h2>

                        <div v-if="selectedSeats.length === 0" class="text-surface-600 dark:text-surface-400">No seats selected</div>

                        <template v-else>
                            <div v-for="seat in selectedSeats" :key="seat.id" class="flex justify-between items-center mb-2 p-2 bg-surface-100 dark:bg-surface-700 rounded">
                                <span class="text-surface-900 dark:text-surface-0"> Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }} </span>
                                <div class="flex items-center">
                                    <span class="font-medium text-primary-600 dark:text-primary-400 mr-4">RM{{ seatPrice }} </span>
                                    <button @click="handleSeatClick(seat)" class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Total -->
                            <div class="border-t border-surface-200 dark:border-surface-600 mt-4 pt-4">
                                <div class="flex justify-between items-center mb-4">
                                    <span class="text-lg font-medium text-surface-900 dark:text-surface-0">Total</span>
                                    <span class="text-xl font-bold text-primary-600 dark:text-primary-400"> RM {{ totalPrice }} </span>
                                </div>

                                <button
                                    @click="proceedToCheckout"
                                    :disabled="selectedSeats.length === 0"
                                    class="w-full bg-primary-600 text-white py-3 rounded-lg font-medium disabled:bg-surface-400 disabled:cursor-not-allowed hover:bg-primary-700 dark:disabled:bg-surface-600"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.seat {
    transition: fill 0.2s ease;
}
</style>
