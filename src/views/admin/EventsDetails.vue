<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';

const { toggleDarkMode, isDarkTheme } = useLayout();

// Props definition
const props = defineProps({
    id: String,
    title: String,
    date: String,
    time: String,
    audience: String,
    type: String,
    submittedBy: String
});

const route = useRoute();
const router = useRouter();

// Event Information
const eventInfo = ref({
    id: route.params.id || '',
    title: route.query.title || '',
    date: route.query.date || '',
    time: route.query.time || '', 
    audience: route.query.audience || '',
    type: route.query.type || '',
    submittedBy: route.query.submittedBy || ''
});

// Seating state
const selectedSeats = ref([]);
const seatPrice = ref(80);

// Computed total price
const totalPrice = computed(() => {
    return selectedSeats.value.length * seatPrice.value;
});

// Generate curved row coordinates with seat groups
const generateCurvedRow = (rowIndex, centerX, startY, radius, spreadAngle) => {
    const seats = [];
    const seatsPerGroup = 12;
    const numGroups = 3;
    const gapBetweenGroups = 4;

    const totalSeats = seatsPerGroup * numGroups;
    const angleStep = spreadAngle / (totalSeats + (numGroups - 2));
    const startAngle = -spreadAngle / 1.8;

    for (let group = 0; group < numGroups; group++) {
        for (let i = 0; i < seatsPerGroup; i++) {
            const seatIndex = group * seatsPerGroup + i;
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

    const mainSection = [];
    for (let row = 0; row < 8; row++) {
        const radius = 460 + row * 40;
        const spreadAngle = Math.PI / 3 + row * 0.02;
        const seats = generateCurvedRow(row, centerX, startY, radius, spreadAngle);
        mainSection.push({ seats, rowLabel: String.fromCharCode(65 + row) });
    }
    sections.push({ rows: mainSection, name: 'Main Floor' });

    return sections;
};

const sections = generateSections();

// Ticket Rates
const ticketRates = ref([
    {
        type: 'VIP',
        price: 'RM 150',
        seats: '250 seat(s)',
        color: 'bg-gray-200'
    },
    {
        type: 'Standard',
        price: 'RM 100',
        seats: '500 seat(s)',
        color: 'bg-yellow-400'
    },
    {
        type: 'Economy',
        price: 'RM 80',
        seats: '750 seat(s)',
        color: 'bg-blue-500'
    }
]);

// Dummy disputes data
const disputes = ref([
    {
        user: 'Lucas Lim Weng Kit',
        date: '21-10-2024',
        time: '13:14:44',
        status: 'Active',
        description: 'Wrong Item Delivered',
        details: 'I ordered a set of Hokkien Mee with drinks but only received a dry set of noodles and condiments without both the broth and drinks.'
    },
    {
        user: 'Dennis Tan Yi Jian',
        date: '21-10-2024',
        time: '13:14:44',
        status: 'Active',
        description: 'Payment Issue'
    }
]);

const handleAcceptRequest = () => {
    alert(`Event request "${eventInfo.value.title}" has been accepted`);
};

const handleDeclineRequest = () => {
    alert(`Event request "${eventInfo.value.title}" has been declined`);
};
</script>

<template>
    <div class="min-h-screen bg-surface-0 dark:bg-surface-900">
        <!-- Header with event status -->
        <div class="bg-white dark:bg-surface-800 shadow">
            <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-xl font-bold text-surface-900 dark:text-white">{{ eventInfo.title }}</h1>
                <div class="flex items-center gap-3">
                    <button 
                        @click="handleAcceptRequest"
                        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Accept Request
                    </button>
                    <button 
                        @click="handleDeclineRequest"
                        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Decline Request
                    </button>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Edit
                    </button>
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100 rounded-full text-sm">
                        {{ eventInfo.type }}
                    </span>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Seating Layout Section -->
                <div class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-10">
                    <h2 class="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Concert Hall Seating</h2>
                    <p class="text-surface-600 dark:text-gray-300 mb-6">Select your seats for the event</p>
                    <div class="relative">
                        <svg viewBox="0 0 800 600" class="w-full">
                            <!-- Stage -->
                            <path d="M250,550 Q400,520 550,550" 
                                fill="none" 
                                stroke="currentColor" 
                                stroke-width="4" 
                                class="text-surface-400 dark:text-surface-500" />
                            <text x="400" y="560" 
                                text-anchor="middle" 
                                class="text-sm fill-current text-surface-900 dark:text-white">
                                STAGE
                            </text>

                            <!-- Seating sections -->
                            <template v-for="(section, sectionIndex) in sections" :key="'section-' + sectionIndex">
                                <g v-for="(row, rowIndex) in section.rows" :key="'row-' + rowIndex">
                                    <g v-for="(seat) in row.seats" :key="seat.id">
                                        <rect
                                            :x="seat.x - 6"
                                            :y="seat.y - 6"
                                            width="12"
                                            height="12"
                                            rx="2"
                                            :class="{
                                                'fill-gray-200': rowIndex < 2, // VIP
                                                'fill-yellow-400': rowIndex >= 2 && rowIndex < 5, // Standard
                                                'fill-blue-500': rowIndex >= 5, // Economy
                                            }"
                                        />
                                    </g>
                                    <!-- Row labels -->
                                    <text :x="50" 
                                        :y="row.seats[0].y" 
                                        class="text-xs fill-current text-surface-900 dark:text-white" 
                                        alignment-baseline="middle">
                                        {{ row.rowLabel }}
                                    </text>
                                </g>
                            </template>
                        </svg>

                        <!-- Updated Legend -->
                        <div class="absolute bottom-1 right-1 bg-surface-0 dark:bg-surface-900 p-3 rounded shadow">
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-white">Economy</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-white">Standard</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-white">VIP</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-6">
                    <!-- General Information -->
                    <div class="bg-[#1e3a8a] rounded-lg shadow-lg p-6">
                        <h2 class="text-white font-semibold mb-4">General</h2>
                        <div class="space-y-3">
                            <div class="bg-blue-900 rounded-lg p-4">
                                <div class="grid gap-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-200">Event ID</span>
                                        <span class="text-white font-medium">{{ eventInfo.id }}</span>
                                    </div>
                                    <div class="border-t border-blue-800 my-2"></div>
                                    <div>
                                        <span class="text-gray-200 block text-sm">Time</span>
                                        <span class="text-white font-medium">{{ eventInfo.time }}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-200 block text-sm">Date</span>
                                        <span class="text-white font-medium">{{ eventInfo.date }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Ticket Rates section -->
                    <div class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-semibold text-surface-900 dark:text-white">Ticket Rate</h2>
                            <button class="text-blue-600 dark:text-blue-400">Edit</button>
                        </div>
                        <div class="flex gap-4 overflow-x-auto pb-2">
                            <div v-for="rate in ticketRates" 
                                :key="rate.type" 
                                class="flex-1 p-4 rounded-lg min-w-[200px]"
                                :class="rate.color">
                                <div class="flex flex-col">
                                    <h3 class="font-semibold text-surface-900">{{ rate.type }}</h3>
                                    <p class="text-sm text-surface-700">{{ rate.seats }}</p>
                                    <p class="font-bold mt-2 text-surface-900">{{ rate.price }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Disputes -->
                    <div class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-lg font-semibold text-surface-900 dark:text-white">Disputes</h2>
                            <button 
                                @click="$router.push('/admin/complaints')" 
                                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                                View More
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div v-for="dispute in disputes" 
                                :key="dispute.user" 
                                class="border-b border-surface-200 dark:border-surface-700 pb-4">
                                <div class="flex justify-between items-center mb-2">
                                    <div class="flex items-center gap-2">
                                        <div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                        <span class="font-medium text-surface-900 dark:text-white">{{ dispute.user }}</span>
                                    </div>
                                    <span class="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-sm">
                                        {{ dispute.status }}
                                    </span>
                                </div>
                                <p class="text-sm text-surface-600 dark:text-gray-400">{{ dispute.date }} | {{ dispute.time }}</p>
                                <p class="mt-2 text-surface-900 dark:text-white">{{ dispute.description }}</p>
                                <p v-if="dispute.details" class="mt-1 text-sm text-surface-600 dark:text-gray-300">{{ dispute.details }}</p>
                                <button v-if="dispute.details" 
                                        class="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                                    Resolve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.seat {
    transition: all 0.2s ease;
}
.seat:hover {
    opacity: 0.8;
}
</style>