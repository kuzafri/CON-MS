<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const selectedSeats = ref([]);
const totalPrice = ref(0);

// Add handlePayment function
const handlePayment = () => {
    router.push({
        path: '/ticket',
        query: {
            seats: route.query.seats, // Pass through the seats data
            totalPrice: route.query.totalPrice // Pass through the total price
        }
    });
};

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
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex justify-center items-center p-6 mt-14">
        <div class="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
            <h2 class="text-3xl font-extrabold text-gray-800 text-center">Select Payment Method</h2>

            <!-- Order Summary -->
            <div class="mt-8 bg-gray-100 rounded-xl shadow p-6 mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                <div class="space-y-4">
                    <div class="flex items-center">
                        <img src="/concert.png" alt="Concert Logo" class="mr-4 w-16 h-16 object-cover" />
                        <div>
                            <p class="text-gray-600 font-semibold">REBEL 3.0: Because of you</p>
                            <p class="text-gray-500">Wed 2025-01-13 3.00 PM - 4.00 PM</p>
                        </div>
                    </div>

                    <div class="border-t border-gray-300 pt-4">
                        <p class="text-gray-700 font-semibold mb-2">Selected Seats:</p>
                        <div class="space-y-2">
                            <div v-for="seat in selectedSeats" :key="seat.id" class="flex justify-between text-sm">
                                <span class="text-gray-600">Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}</span>
                                <span class="text-gray-800 font-semibold">RM {{ seat.price }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-300 pt-4 space-y-2">
                        <div class="flex justify-between">
                            <p class="text-gray-600">Number of Seats:</p>
                            <p class="text-gray-800 font-semibold">{{ selectedSeats.length }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-gray-600">Price per Seat:</p>
                            <p class="text-gray-800 font-semibold">RM 80.00</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-gray-600">Booking Fee:</p>
                            <p class="text-gray-800 font-semibold">RM 5.00</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-gray-600 font-bold">Total:</p>
                            <p class="text-gray-800 font-bold">RM {{ totalPrice + 5 }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Payment Method Card -->
                <div class="bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50 rounded-xl shadow p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Credit Card</h3>
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <img src="https://via.placeholder.com/40" alt="VISA" class="mr-4" />
                            <p class="text-gray-600">Current Balance: <span class="font-semibold">RM5,750.20</span></p>
                        </div>
                        <div class="flex items-center">
                            <img src="https://via.placeholder.com/40" alt="Mastercard" class="mr-4" />
                            <p class="text-gray-600">Current Balance: <span class="font-semibold">RM44,570.80</span></p>
                        </div>
                        <button class="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg">Add New</button>
                    </div>
                </div>

                <!-- Pay with Credit Card Form -->
                <div class="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Pay using credit card</h3>
                    <div class="flex items-center mb-4">
                        <img src="https://via.placeholder.com/40" alt="VISA" class="mr-4" />
                        <p class="text-gray-600">VISA</p>
                    </div>
                    <div class="space-y-4">
                        <input type="text" placeholder="2324 5566 6677 7898" class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="text" placeholder="CVV" class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg">Save Card</button>
                        <button @click="handlePayment" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg">Pay</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    font-family: 'Inter', sans-serif;
}
</style>
