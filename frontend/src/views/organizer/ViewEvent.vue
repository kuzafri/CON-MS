<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const events = ref([]);

// Updated function to use axios
const fetchEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/events');
        events.value = response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

onMounted(() => {
    fetchEvents();
});

// Function to determine severity based on status
const getStatusSeverity = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'warn';
        case 'approved':
            return 'success';
        case 'rejected':
            return 'danger';
        default:
            return 'info';
    }
};

const handleViewDetails = (event) => {
    router.push({
        name: 'EventDetails',
        params: {
            id: event._id // MongoDB uses _id
        },
        state: event
    });
};
</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">All Concerts</h1>
    </div>
    <div class="card h-full">
        <div class="space-y-4">
            <!-- Replace static v-for with events array -->
            <div v-for="event in events" :key="event._id" class="border border-gray-300 rounded p-4 flex flex-col justify-between h-full">
                <div class="flex justify-between items-center mb-3">
                    <div class="mb-4">
                        <p class="text-base font-extrabold">Event ID:</p>
                        <p class="text-sm mb-2">{{ event._id }}</p>
                        <p class="text-base font-extrabold">Title:</p>
                        <p class="text-sm">{{ event.concertTitle }}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <Tag :severity="getStatusSeverity(event.status)" :value="event.status" />
                    </div>
                </div>

                <div class="flex justify-between text-sm">
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Date</p>
                        <p>{{ new Date(event.calendarValue).toLocaleDateString() }}</p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Time</p>
                        <p>{{ event.startTime }} - {{ event.endTime }}</p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Genre</p>
                        <p>{{ event.genre }}</p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Economy Price</p>
                        <p>RM {{ event.economyPrice }}</p>
                    </div>
                    <div class="flex justify-end mt-5">
                        <button class="text-blue-600 text-sm font-extrabold cursor-pointer" @click="handleViewDetails(event)">View >></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
