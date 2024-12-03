<script setup>
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, computed } from 'vue';

const route = useRoute();
const selectedSeats = ref([]);
const totalPrice = ref(0);
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));

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
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col">
        
        <div class="min-h-screen flex flex-col md:flex-row items-center justify-center">
            <!-- Desktop View -->
            <div v-for="seat in selectedSeats" :key="seat.id" class="hidden md:flex max-w-lg w-full bg-white rounded-lg shadow-lg p-6 relative m-4">
                <!-- Left Piano Design -->
                <div class="absolute left-0 top-0 h-full w-8 bg-gray-900">
                    <div v-for="i in 10" :key="i" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-900'" class="h-6"></div>
                </div>

                <!-- Ticket Content -->
                <div class="ml-10">
                    <h2 class="text-3xl font-bold text-gray-800">REBEL 3.0: Because of you</h2>
                    <p class="text-gray-600">Wed 2025-01-13 3.00 PM - 4.00 PM</p>
                    <p class="text-gray-600">Dewan Tuanku Syed Putra, USM</p>
                    <p class="text-gray-600">Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}</p>
                    <div class="text-right text-2xl font-bold text-gray-900 mt-4">RM80</div>
                    <div class="text-right mt-2">
                        <div class="bg-gray-200 px-4 py-1 rounded-full inline-block">
                            Ticket ID: <strong>#{{ Math.random().toString(36).substr(2, 6).toUpperCase() }}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile View -->
            <div v-for="seat in selectedSeats" :key="seat.id" class="flex md:hidden w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex-col m-4">
                <!-- QR Code Section -->
                <div class="flex justify-center">
                    <div class="bg-gray-100 p-4 rounded-full">
                        <img class="w-16 h-16" src="/qrcode.png" alt="QR Code" />
                    </div>
                </div>

                <!-- Ticket Details -->
                <div class="mt-4">
                    <p class="text-gray-500 text-sm">Ticket {{ selectedSeats.indexOf(seat) + 1 }} of {{ selectedSeats.length }}</p>
                    <h2 class="text-xl font-bold mt-2">REBEL 3.0: Because of you</h2>
                    <p class="text-sm text-gray-600">
                        Ticket / Seat: <strong>Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}</strong>
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
    </div>
</template>

<style scoped></style>
