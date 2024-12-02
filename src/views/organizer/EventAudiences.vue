<script setup>
import { ref } from 'vue';

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
    <div v-if="isModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 class="text-xl font-bold mb-4">E-Ticket</h2>
            <p><strong>Booking ID:</strong> {{ selectedTicket.bookingId }}</p>
            <p><strong>Event ID:</strong> {{ selectedTicket.eventId }}</p>
            <p><strong>Seat Number:</strong> {{ selectedTicket.seatNumber }}</p>
            <p><strong>Ticket Price:</strong> RM {{ selectedTicket.ticketPrice }}</p>
            <p><strong>Booking Status:</strong> {{ selectedTicket.bookingStatus }}</p>
            <Button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" @click="hideModal" label="Close" />
        </div>
    </div>
</template>
