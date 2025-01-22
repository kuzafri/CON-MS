<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, ref } from 'vue';

const bookingDetails = ref(null);
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));

const qrModalEnlarge = ref(false);
const currentQrCodeSrc = ref('');

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date)) return 'Date not available';
        
        // Format date as dd/mm/yyyy
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Date not available';
    }
}

function openQrCodeModal(qrCodeSrc) {
    currentQrCodeSrc.value = qrCodeSrc;
    qrModalEnlarge.value = true;
}

function closeQrCodeModal() {
    qrModalEnlarge.value = false;
}

function generateTicketId() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

onMounted(() => {
    // Retrieve ticket details from localStorage
    const ticketDetails = localStorage.getItem('ticketDetails');
    if (ticketDetails) {
        bookingDetails.value = JSON.parse(ticketDetails);
        console.log('Loaded booking details:', bookingDetails.value); // Debug log
    }
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col">
        <div class="min-h-screen flex flex-col items-center justify-center mt-14">
            <!-- Desktop View -->
            <div class="hidden md:flex flex-wrap justify-center gap-6 max-w-screen-lg mx-auto">
                <div v-for="seat in bookingDetails?.seats" :key="seat.seatId" class="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative m-4 flex-shrink-0">
                    <!-- Left Piano Design -->
                    <div class="absolute left-0 top-0 h-full w-8 bg-gray-900">
                        <div v-for="i in 10" :key="i" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-900'" class="h-6"></div>
                    </div>

                    <!-- Ticket Content -->
                    <div class="ml-10">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-3xl font-bold text-gray-800">{{ bookingDetails?.eventDetails?.concertTitle }}</h2>
                                <p class="text-gray-600">
                                    {{ formatDate(bookingDetails?.eventDetails?.date) }}
                                    {{ bookingDetails?.eventDetails?.startTime }}
                                </p>
                                <p class="text-gray-600">{{ bookingDetails?.eventDetails?.venue }}</p>
                                <p class="text-gray-600 mt-4">
                                    Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}
                                    <span class="ml-2 px-2 py-1 bg-gray-100 rounded-full text-sm">{{ seat.tier }}</span>
                                </p>
                            </div>
                            <div class="text-right">
                                <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Confirmed
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-6 flex justify-between items-end">
                            <div class="bg-gray-100 p-4 rounded-lg cursor-pointer" @click="openQrCodeModal('/qrcode.png')">
                                <img class="w-16 h-16" src="/qrcode.png" alt="QR Code" />
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-gray-900">RM {{ seat.price }}</div>
                                <div class="bg-gray-200 px-4 py-1 text-black rounded-full inline-block mt-2">
                                    Ticket ID: <strong>#{{ generateTicketId() }}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile View -->
            <div v-for="seat in bookingDetails?.seats" :key="seat.seatId" class="flex md:hidden w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex-col m-4">
                <!-- Status Badge -->
                <div class="flex justify-end mb-4">
                    <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Confirmed
                    </div>
                </div>

                <!-- QR Code Section -->
                <div class="flex justify-center">
                    <div class="bg-gray-100 p-4 rounded-full cursor-pointer" @click="openQrCodeModal('/qrcode.png')">
                        <img class="w-16 h-16" src="/qrcode.png" alt="QR Code" />
                    </div>
                </div>

                <!-- Ticket Details -->
                <div class="mt-4">
                    <p class="text-gray-500 text-sm">Ticket {{ bookingDetails?.seats.indexOf(seat) + 1 }} of {{ bookingDetails?.seats.length }}</p>
                    <h2 class="text-xl font-bold mt-2">{{ bookingDetails?.eventDetails?.concertTitle }}</h2>
                    <p class="text-sm text-gray-600">
                        Ticket / Seat: <strong>Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}</strong>
                        <span class="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">{{ seat.tier }}</span>
                    </p>
                    <div class="mt-2">
                        <div class="bg-gray-200 px-4 py-1 text-black rounded-full inline-block">
                            Ticket ID: <strong>#{{ generateTicketId() }}</strong>
                        </div>
                    </div>
                </div>

                <!-- Date and Location -->
                <div class="mt-6 grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Date & Time</p>
                        <p class="text-gray-700 text-sm font-medium">
                            {{ formatDate(bookingDetails?.eventDetails?.date) }}
                        </p>
                        <p class="text-gray-700 text-sm font-medium">
                            {{ bookingDetails?.eventDetails?.startTime }}
                        </p>
                        <a href="#" class="text-blue-500 text-sm mt-1 block">Add to calendar</a>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Location</p>
                        <p class="text-gray-700 text-sm font-medium">{{ bookingDetails?.eventDetails?.venue }}</p>
                        <a href="#" class="text-blue-500 text-sm mt-1 block">See map</a>
                    </div>
                </div>
            </div>

            <!-- QR Code Modal -->
            <div v-if="qrModalEnlarge" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="closeQrCodeModal">
                <img :src="currentQrCodeSrc" alt="QR Code" class="w-80 h-80 object-contain bg-white rounded-lg p-4" />
            </div>
        </div>

        <router-link class="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" to="/complaint">🛠️ Complaint</router-link>
    </div>
</template>

<style scoped>
.seat {
    transition: fill 0.2s ease;
}
</style>
