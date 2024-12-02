<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// const route = useRoute();
// const router = useRouter();

// Define audience data as an array to iterate over
const Audiences = ref([
    {
        bookingId: '1241',
        eventId: 'R-KL-58/42',
        seatNumber: 'Row G - Seat 17',
        ticketPrice: '80',
        bookingStatus: 'success'
    },
    {
        bookingId: '1242',
        eventId: 'R-KL-58/42',
        seatNumber: 'Row H - Seat 10',
        ticketPrice: '80',
        bookingStatus: 'pending'
    },
    {
        bookingId: '1243',
        eventId: 'R-KL-58/42',
        seatNumber: 'Row J - Seat 5',
        ticketPrice: '100',
        bookingStatus: 'success'
    }
]);
</script>

<template>
    <div class="card h-full">
        <div class="space-y-4">
            <div v-for="audience in Audiences" :key="audience.bookingId" class="border border-gray-300 rounded p-4 flex flex-col justify-between h-full">
                <div class="flex justify-between items-center mb-3">
                    <div>
                        <p class="text-base font-extrabold">Booking ID:</p>
                        <p class="text-sm mb-2">{{ audience.bookingId }}</p>
                        <p class="text-base font-extrabold">Event ID:</p>
                        <p class="text-sm">{{ audience.eventId }}</p>
                        <p class="text-base font-extrabold">Seat Number:</p>
                        <p class="text-sm">{{ audience.seatNumber }}</p>
                        <p class="text-base font-extrabold">Ticket Price:</p>
                        <p class="text-sm">RM {{ audience.ticketPrice }}</p>
                        <p class="text-base font-extrabold">Booking Status:</p>
                        <p class="text-sm">{{ audience.bookingStatus }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
