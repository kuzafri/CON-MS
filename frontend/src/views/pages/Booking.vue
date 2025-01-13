<script setup>
import { computed, ref, onMounted } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter, useRoute } from 'vue-router';
import { useEvent } from '@/composables/useEvent';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const router = useRouter();
const route = useRoute();
const { event, loading, error, fetchEventById } = useEvent();
const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));

// State
const selectedSeats = ref([]);
const seatPrices = computed(() => ({
    VIP: event.value?.vipPrice || 0,
    Standard: event.value?.standardPrice || 0,
    Economy: event.value?.economyPrice || 0
}));

// Computed total price
const totalPrice = computed(() => {
    return selectedSeats.value.reduce((total, seat) => {
        return total + seatPrices.value[seat.tier];
    }, 0);
});

const generateCurvedRow = (rowIndex, centerX, startY, radius, spreadAngle) => {
    const seats = [];
    const seatsPerGroup = 12;
    const numGroups = 3;
    const gapBetweenGroups = 4;

    let tier = rowIndex < 2 ? 'VIP' : rowIndex < 5 ? 'Standard' : 'Economy';

    const totalSeats = seatsPerGroup * numGroups;
    const angleStep = spreadAngle / (totalSeats + gapBetweenGroups * (numGroups - 1));
    const startAngle = -spreadAngle / 2.48;

    for (let group = 0; group < numGroups; group++) {
        for (let i = 0; i < seatsPerGroup; i++) {
            const seatIndex = group * seatsPerGroup + i;
            const angle = startAngle + seatIndex * angleStep + group * gapBetweenGroups * (Math.PI / 180);
            const x = centerX + radius * Math.sin(angle);
            const y = startY - radius * Math.cos(angle);

            seats.push({
                x,
                y,
                id: `row-${rowIndex}-seat-${seatIndex}`,
                isReserved: Math.random() < 0.6,
                group: group + 1,
                tier
            });
        }
    }
    return seats;
};

const generateSections = () => {
    const sections = [];
    const centerX = 400;
    const startY = 800;

    const mainSection = [];
    for (let row = 0; row < 8; row++) {
        const radius = 440 + row * 40; //increas spacing between rows
        const spreadAngle = Math.PI / 2 + row * 0.02; //untuk adjust spread angle
        const seats = generateCurvedRow(row, centerX, startY, radius, spreadAngle);
        mainSection.push({ seats, rowLabel: String.fromCharCode(65 + row) });
    }
    sections.push({ rows: mainSection, name: 'Main Floor' });

    return sections;
};

const sections = generateSections();

const handleSeatClick = (seat) => {
    if (seat.isReserved) return;

    const seatIndex = selectedSeats.value.findIndex((s) => s.id === seat.id);
    if (seatIndex === -1) {
        selectedSeats.value.push({
            id: seat.id,
            rowLabel: seat.rowLabel,
            seatNumber: seat.seatNumber,
            group: seat.group,
            tier: seat.tier,
            price: seatPrices.value[seat.tier]
        });
    } else {
        selectedSeats.value.splice(seatIndex, 1);
    }
};

const isSeatSelected = (seatId) => {
    return selectedSeats.value.some((s) => s.id === seatId);
};

const proceedToCheckout = () => {
    router.push({
        path: '/payment',
        query: {
            seats: JSON.stringify(selectedSeats.value), //price each seat
            totalPrice: totalPrice.value
        }
    });
};

const viewBox = ref('0 0 800 600');
const isPanning = ref(false);
const startPan = ref({ x: 0, y: 0 });
const currentTransform = ref({ x: 0, y: 0, scale: 1 });

const handleMouseDown = (event) => {
    isPanning.value = true;
    startPan.value = {
        x: event.clientX - currentTransform.value.x,
        y: event.clientY - currentTransform.value.y
    };
};

const handleMouseMove = (event) => {
    if (!isPanning.value) return;

    const newX = event.clientX - startPan.value.x;
    const newY = event.clientY - startPan.value.y;

    // Add boundaries to prevent excessive panning
    const maxPan = 400 * currentTransform.value.scale;
    currentTransform.value.x = Math.max(Math.min(newX, maxPan), -maxPan);
    currentTransform.value.y = Math.max(Math.min(newY, maxPan), -maxPan);
};

const handleMouseUp = () => {
    isPanning.value = false;
};

const handleWheel = (event) => {
    event.preventDefault();
    const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
    const newScale = currentTransform.value.scale * scaleFactor;

    // Limit zoom scale between 0.5 and 3
    if (newScale >= 0.5 && newScale <= 3) {
        currentTransform.value.scale = newScale;
    }
};

// Computed style for the transform
const svgTransform = computed(() => {
    const { x, y, scale } = currentTransform.value;
    return `translate(${x}px, ${y}px) scale(${scale})`;
});

const handleSubmit = async () => {
    try {
        const response = await fetch('/api/submit-concert-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUserId,
                concertData: {
                    selectedSeats: selectedSeats,
                    totalPrice: totalPrice,
                    eventDate: new Date('2025-01-13 15:00:00')
                }
            })
        });

        const result = await response.json();
        if (result.success) {
            alert('Success');
        } else {
            alert('Error:' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error');
    }
};

onMounted(async () => {
    await fetchEventById(route.params.id);
});
</script>

<template>
    <div class="min-h-screen bg-surface-0 dark:bg-surface-900">
        <header class="bg-surface-50 dark:bg-surface-800 shadow-sm mt-14">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <!-- Show loading state -->
                <div v-if="loading" class="text-center py-4">
                    <p class="text-surface-600 dark:text-surface-400">Loading event details...</p>
                </div>

                <!-- Show error state -->
                <div v-else-if="error" class="text-center py-4">
                    <p class="text-red-600">{{ error }}</p>
                </div>

                <!-- Show event details -->
                <div v-else-if="event" class="flex items-center">
                    <img :src="event.image || '/concert.png'" :alt="event.concertTitle" class="h-8" />
                    <div class="ml-6">
                        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ event.concertTitle }}</h1>
                        <p class="text-surface-600 dark:text-surface-400">{{ new Date(event.calendarValue).toLocaleDateString() }} {{ event.startTime }}</p>
                        <p class="text-surface-600 dark:text-surface-400">{{ event.venue || 'Dewan Tuanku Syed Putra, USM' }}</p>
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

                <div class="gap-8 flex lg:flex-row flex-col">
                    <!-- Seating Map -->
                    <div class="bg-surface-50 lg:w-2/3 dark:bg-surface-800 rounded-lg shadow-lg p-10">
                        <div class="relative overflow-hidden" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" @mouseleave="handleMouseUp" @wheel="handleWheel">
                            <svg viewBox="0 0 950 600" class="w-full cursor-move transform-gpu" :style="{ transform: svgTransform }">
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
                                                    'fill-orange-400 cursor-pointer hover:fill-orange-700': !seat.isReserved && !isSeatSelected(seat.id) && seat.tier === 'VIP',
                                                    'fill-yellow-400 cursor-pointer hover:fill-yellow-700': !seat.isReserved && !isSeatSelected(seat.id) && seat.tier === 'Standard',
                                                    'fill-green-400 cursor-pointer hover:fill-green-700': !seat.isReserved && !isSeatSelected(seat.id) && seat.tier === 'Economy',
                                                    'fill-red-500': isSeatSelected(seat.id),
                                                    'fill-surface-400 cursor-not-allowed': seat.isReserved
                                                }"
                                            />
                                        </g>
                                        <!-- Row labels -->
                                        <text :x="7" :y="row.seats[0].y" text-anchor="end" class="text-xs fill-current text-surface-900 dark:text-surface-0" alignment-baseline="middle">
                                            {{ row.rowLabel }}
                                        </text>
                                    </g>
                                </template>
                            </svg>
                        </div>

                        <div class="bottom-1 right-1 bg-surface-0 dark:bg-surface-900 p-3 rounded shadow z-10">
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-orange-400 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-surface-0">VIP (RM{{ seatPrices.VIP }})</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-surface-0">Standard (RM{{ seatPrices.Standard }})</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-green-500 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-surface-0">Economy (RM{{ seatPrices.Economy }})</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-red-500 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-surface-0">Selected</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-surface-400 rounded mr-2"></div>
                                <span class="text-surface-900 dark:text-surface-0">Reserved</span>
                            </div>
                        </div>
                    </div>

                    <!-- Selected Seats Info -->
                    <div class="bg-surface-50 lg:w-1/3 dark:bg-surface-800 rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Selected Seats</h2>

                        <div v-if="selectedSeats.length === 0" class="text-surface-600 dark:text-surface-400">No seats selected</div>

                        <template v-else>
                            <div v-for="seat in selectedSeats" :key="seat.id" class="flex justify-between items-center mb-2 p-2 bg-surface-100 dark:bg-surface-700 rounded">
                                <span class="text-surface-900 dark:text-surface-0">
                                    Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}
                                    <span class="text-xs ml-2">({{ seat.tier }})</span>
                                </span>
                                <div class="flex items-center">
                                    <span class="font-medium text-primary-600 dark:text-primary-400 mr-4"> RM{{ seatPrices[seat.tier] }} </span>
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

                                <Button
                                    to="/payment"
                                    as="router-link"
                                    @click="proceedToCheckout"
                                    :disabled="selectedSeats.length === 0"
                                    class="w-full bg-primary-600 text-white py-3 rounded-lg font-medium disabled:bg-surface-400 disabled:cursor-not-allowed hover:bg-primary-700 dark:disabled:bg-surface-600"
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.seat {
    transition: fill 0.2s ease;
}

img {
    transition: opacity 0.3s ease-in-out;
}

/* Add these new styles */
.transform-gpu {
    transform-origin: center;
    transition: transform 0.1s ease-out;
    will-change: transform;
}

.overflow-hidden {
    overflow: hidden;
}
</style>
