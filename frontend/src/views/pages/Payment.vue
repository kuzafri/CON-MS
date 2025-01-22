<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookingDetails = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchBookingDetails = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${route.query.bookingId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch booking details');
        }

        const data = await response.json();
        bookingDetails.value = data;
        loading.value = false;
    } catch (err) {
        console.error('Error fetching booking details:', err);
        error.value = 'Failed to load booking details';
        loading.value = false;
    }
};

const handlePayment = async () => {
    try {
        // Update booking status
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${route.query.bookingId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                status: 'confirmed',
                paymentStatus: 'paid'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update booking status');
        }

        // Store ticket details for the next page
        const ticketDetails = {
            bookingId: bookingDetails.value._id,
            seats: bookingDetails.value.seatDetails,
            eventDetails: {
                ...bookingDetails.value.eventDetails,
                date: new Date(bookingDetails.value.eventDetails.date).toISOString() // Ensure proper date format
            },
            totalPrice: Number(route.query.totalPrice) + 5 // Include booking fee
        };
        console.log('Storing ticket details:', ticketDetails); // Debug log
        localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));

        // Redirect to ticket page
        router.push({
            path: '/ticket'
        });
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
    }
};

onMounted(() => {
    if (route.query.bookingId) {
        fetchBookingDetails();
    } else {
        // Redirect to home if no booking ID
        router.push('/');
    }
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex justify-center items-center p-6 mt-14">
        <div class="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            </div>

            <!-- Content -->
            <template v-else>
                <!-- Order Summary -->
                <div class="bg-gray-100 rounded-xl shadow p-6 mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <img src="/concert.png" alt="Concert Logo" class="mr-4 w-16 h-16 object-cover" />
                            <div>
                                <p class="text-gray-600 font-semibold">{{ bookingDetails?.eventDetails?.concertTitle }}</p>
                                <p class="text-gray-500">
                                    {{ new Date(bookingDetails?.eventDetails?.date).toLocaleDateString() }}
                                    {{ bookingDetails?.eventDetails?.startTime }}
                                </p>
                                <p class="text-gray-500">{{ bookingDetails?.eventDetails?.venue }}</p>
                            </div>
                        </div>

                        <div class="border-t border-gray-300 pt-4">
                            <p class="text-gray-700 font-semibold mb-2">Selected Seats:</p>
                            <div class="space-y-2">
                                <div v-for="seat in bookingDetails?.seatDetails" :key="seat.seatId" class="flex justify-between text-sm">
                                    <span class="text-gray-600">
                                        Row {{ seat.rowLabel }} - Seat {{ seat.seatNumber }}
                                        <span class="text-xs ml-2">({{ seat.tier }})</span>
                                    </span>
                                    <span class="text-gray-800 font-semibold">RM {{ seat.price }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-300 pt-4 space-y-2">
                            <div class="flex justify-between">
                                <p class="text-gray-600">Number of Seats:</p>
                                <p class="text-gray-800 font-semibold">{{ bookingDetails?.seatDetails?.length }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-600">Subtotal:</p>
                                <p class="text-gray-800 font-semibold">RM {{ bookingDetails?.totalPrice }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-600">Booking Fee:</p>
                                <p class="text-gray-800 font-semibold">RM 5.00</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-600 font-bold">Total:</p>
                                <p class="text-gray-800 font-bold">RM {{ Number(bookingDetails?.totalPrice) + 5 }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Methods -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Payment Method Card -->
                    <div class="bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50 rounded-xl shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Credit Card</h3>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <img src="/visa.png" alt="VISA" class="mr-4 h-8" />
                                <p class="text-gray-600">Current Balance: <span class="font-semibold">RM5,750.20</span></p>
                            </div>
                            <div class="flex items-center">
                                <img src="/mastercard.png" alt="Mastercard" class="mr-4 h-8" />
                                <p class="text-gray-600">Current Balance: <span class="font-semibold">RM44,570.80</span></p>
                            </div>
                            <button class="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg">Add New</button>
                        </div>
                    </div>

                    <!-- Pay with Credit Card Form -->
                    <div class="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow p-6">
                        <div class="flex items-center mb-4">
                            <img src="/visa.png" alt="VISA" class="mr-4 h-8" />
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
            </template>
        </div>
    </div>
</template>

<style>
body {
    font-family: 'Inter', sans-serif;
}
</style>
