<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const selectedSeats = ref([]);
const totalPrice = ref(0);

const qrModalEnlarge = ref(false);
const currentQrCodeSrc = ref('');

function closeQrCodeModal() {
    qrModalEnlarge.value = false;
}

function openQrCodeModal(qrCodeSrc) {
    currentQrCodeSrc.value = qrCodeSrc;
    qrModalEnlarge.value = true;
}

// Add props definition
const props = defineProps({
    id: String
});

const route = useRoute();
const router = useRouter();

const EventRequest = ref({
    id: props.id || route.params.id
});

// Audience data
const Audiences = ref([
    {
        name: 'Al Hakim',
        bookingId: '1241',
        eventId: 'R-KL-58/42',
        seatNumber: 'Row G - Seat 17',
        ticketPrice: '80',
        bookingStatus: 'success'
    },
    {
        name: 'Zaf',
        bookingId: '1242',
        eventId: 'R-KL-58/42',
        seatNumber: 'Row H - Seat 10',
        ticketPrice: '80',
        bookingStatus: 'pending'
    },
    {
        name: 'Shad',
        bookingId: '1243',
        eventId: 'R-KL-58/42',
        seatNumber: 'Row J - Seat 5',
        ticketPrice: '100',
        bookingStatus: 'success'
    }
]);

// Modal state
const isModalVisible = ref(false);
const selectedTicket = ref(null);

// Method to show modal
const showETicket = (ticket) => {
    selectedTicket.value = ticket;
    isModalVisible.value = true;
};

// Method to hide modal
const hideModal = () => {
    isModalVisible.value = false;
};

// Use this when have proper backend
onMounted(() => {
    // Get seat data from route query
    if (route.query.seats) {
        selectedSeats.value = JSON.parse(route.query.seats);
    }
    if (route.query.totalPrice) {
        totalPrice.value = Number(route.query.totalPrice);
    }
});

const handleBack = () => {
    // Encode the ID to properly handle special characters like '/'
    const encodedId = encodeURIComponent(EventRequest.value.id);
    router.push(`/organizer/viewevent/event-details/${encodedId}`);
};
</script>

<template>
    <div class="p-4">
        <button @click="handleBack" class="flex items-center text-blue-600 hover:text-blue-700 pb-4"><span class="mr-2">←</span> Back to Event Details</button>
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Audiences</h1>
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText placeholder="Search..." />
            </IconField>
        </div>
        <div class="card h-full">
            <div class="space-y-4">
                <div v-for="audience in Audiences" :key="audience.bookingId" class="border border-gray-300 rounded p-4 flex flex-col justify-between h-full">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="flex items-center gap-4">
                                <p class="text-base font-extrabold">Name:</p>
                                <p class="text-sm font-semibold mb-2">{{ audience.name }}</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <p class="text-base font-extrabold">Booking ID:</p>
                                <p class="text-sm font-semibold mb-2">{{ audience.bookingId }}</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <p class="text-base font-extrabold">Event ID:</p>
                                <p class="text-sm">{{ audience.eventId }}</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <p class="text-base font-extrabold">Seat Number:</p>
                                <p class="text-sm">{{ audience.seatNumber }}</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <p class="text-base font-extrabold">Ticket Price:</p>
                                <p class="text-sm">RM {{ audience.ticketPrice }}</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <p class="text-base font-extrabold">Booking Status:</p>
                                <p class="text-sm">{{ audience.bookingStatus }}</p>
                            </div>
                        </div>
                        <div>
                            <Button label="View E-Ticket" raised @click="showETicket(audience)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for E-Ticket -->
        <div v-if="isModalVisible" @click.self="hideModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <!-- Modal Content for Desktop -->
            <div class="hidden md:flex flex-wrap justify-center gap-6 max-w-screen-lg mx-auto">
                <div class="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative m-4 flex-shrink-0">
                    <!-- Left Piano Design -->
                    <div class="absolute left-0 top-0 h-full w-8 bg-gray-900">
                        <div v-for="i in 10" :key="i" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-900'" class="h-6"></div>
                    </div>

                    <!-- Ticket Content -->
                    <div class="ml-10">
                        <h2 class="text-3xl font-bold text-gray-800">REBEL 3.0: Because of you</h2>
                        <p class="text-gray-600">Wed 2025-01-13 3.00 PM - 4.00 PM</p>
                        <p class="text-gray-600">Dewan Tuanku Syed Putra, USM</p>
                        <p class="text-gray-600">{{ selectedTicket?.seatNumber }}</p>
                        <div class="text-right text-2xl font-bold text-gray-900 mt-4">RM{{ selectedTicket?.ticketPrice }}</div>
                        <div class="text-right mt-2">
                            <div class="bg-gray-200 px-4 py-1 text-black rounded-full inline-block">
                                Ticket ID: <strong>#{{ Math.random().toString(36).substr(2, 6).toUpperCase() }}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile View -->
            <div class="flex md:hidden w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex-col m-4">
                <!-- QR Code Section -->
                <div class="flex justify-center">
                    <div class="bg-gray-100 p-4 rounded-full" @click="openQrCodeModal('/qrcode.png')">
                        <img class="w-16 h-16" src="/qrcode.png" alt="QR Code" />
                    </div>
                </div>

                <!-- Ticket Details -->
                <div class="mt-4">
                    <p class="text-gray-500 text-sm">Ticket 1 of 1</p>
                    <h2 class="text-xl font-bold mt-2">REBEL 3.0: Because of you</h2>
                    <p class="text-sm text-gray-600">
                        Ticket / Seat: <strong>{{ selectedTicket?.seatNumber }}</strong>
                    </p>
                    <p class="font-bold text-lg mt-4">Event</p>
                    <p class="text-gray-700 text-base">
                        Tickets for USM Jazz Band's 26th Annual Charity Concert are now available for purchase, shadowed by the intriguing theme of 𝗧𝗛𝗥𝗜𝗟𝗟𝗘𝗥, offering you the chance to experience a pulse-pounding melodic adventure.
                    </p>
                </div>

                <!-- Date and Location -->
                <div class="mt-6 grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Date</p>
                        <p class="text-gray-700 text-sm font-medium">Wed, Jan 13</p>
                        <p class="text-gray-700 text-sm font-medium">3:00 pm</p>
                        <a href="#" class="text-blue-500 text-sm mt-1 block">Add to calendar</a>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Location</p>
                        <p class="text-gray-700 text-sm font-medium">Dewan Tuanku Syed Putra, USM</p>
                        <a href="#" class="text-blue-500 text-sm mt-1 block">See map</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- QR Code Enlargement Modal -->
        <div v-if="qrModalEnlarge" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="closeQrCodeModal">
            <img :src="currentQrCodeSrc" alt="QR Code" class="w-80 h-80 object-contain bg-white rounded-lg p-4" />
        </div>
    </div>
</template>
