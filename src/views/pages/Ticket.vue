<script setup>
import { useRoute } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { onMounted, onUnmounted, ref } from 'vue';

const route = useRoute();
const selectedSeats = ref([]);
const totalPrice = ref(0);
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

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
        <header class="bg-surface-0 dark:bg-surface-900 border-b-[1px] border-gray-400 shadow-lg">
            <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <a class="flex items-center mx-4" href="#">
                    <img :src="logoSrc" alt="logo" class="w-full h-8" />
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
                            <a href="/homebook" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/event" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
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
