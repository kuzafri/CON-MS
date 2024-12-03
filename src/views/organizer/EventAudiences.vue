<script setup>
// import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, computed } from 'vue';

const route = useRoute();
const selectedSeats = ref([]);
const totalPrice = ref(0);

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
const selectedTicket = ref({});

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

</script>

<template>
    <div class="p-4">
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
    </div>

    <!-- Modal for E-Ticket -->
    <div v-if="isModalVisible" @click.self="hideModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="flex flex-col md:flex-row items-center justify-center bg-white rounded shadow-md max-w-md w-full">
            <!-- Desktop View -->
                <!-- Left Piano Design -->
                <div class="left-0 top-0 h-full w-8 bg-gray-900">
                    <div v-for="i in 10" :key="i" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-900'" class="h-6"></div>
                </div>

                <!-- Ticket Content -->
                <div class="ml-10">
                    <h2 class="text-3xl font-bold text-gray-800">REBEL 3.0: Because of you</h2>
                    <p class="text-gray-600">Wed 2025-01-13 3.00 PM - 4.00 PM</p>
                    <p class="text-gray-600">Dewan Tuanku Syed Putra, USM</p>
                    <p class="text-gray-600">Row A - Seat 36</p>
                    <div class="text-right text-2xl font-bold text-gray-900 mt-4">RM80</div>
                    <div class="text-right mt-2">
                        <div class="bg-gray-200 px-4 py-1 rounded-full inline-block">
                            Ticket ID: <strong>#N71XIG</strong>
                        </div>
                    </div>
                </div>

            <!-- Mobile View -->
            <div v-for="seat in selectedSeats" :key="seat.id" class="flex md:hidden w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex-col m-4">
                <!-- QR Code Section -->
                <div class="flex justify-center">
                    <div class="bg-gray-100 p-4 rounded-full">
                        <!-- <img class="w-16 h-16" src="/qrcode.png" alt="QR Code" /> -->
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>
