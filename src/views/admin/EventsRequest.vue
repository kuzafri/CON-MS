<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Add props definition
const props = defineProps({
  id: String
});

const route = useRoute();
const router = useRouter();

// Get data from state or create default object
const EventRequest = ref({
    id: props.id || route.params.id,
    title: 'REBEL 3.0: Because of You',
    date: '13th January 2025',
    time: '3:00 PM - 4:00 PM',
    audience: '1500 pax',
    type: 'Paid Entry',
    submittedBy: 'USM Jazz Band'
});

// For debugging
console.log('Props:', props);
console.log('Route params:', route.params);
console.log('EventRequest:', EventRequest.value);

function handleAccept() {
    alert(`You have accepted the request for event: ${EventRequest.value.title}`);
}

function handleDecline() {
    alert(`You have declined the request for event: ${EventRequest.value.title}`);
}

</script>

<template>
    <div class="p-4">  <!-- Added padding -->
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Event Request Details</h1>
        </div>

        <div class="card p-6 bg-white shadow rounded">  <!-- Added background and shadow -->
            <h2 class="text-xl font-semibold mb-4">ID: {{ EventRequest.id }}</h2>
            <div class="space-y-4">
                <div class="flex justify-between border-b pb-2">  <!-- Added bottom border and padding -->
                    <p class="text-sm font-semibold">Event Name:</p>
                    <p class="text-sm">{{ EventRequest.title }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Date:</p>
                    <p class="text-sm">{{ EventRequest.date }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Time:</p>
                    <p class="text-sm">{{ EventRequest.time }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Audience:</p>
                    <p class="text-sm">{{ EventRequest.audience }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Type of Entry:</p>
                    <p class="text-sm">{{ EventRequest.type }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Submitted By:</p>
                    <p class="text-sm">{{ EventRequest.submittedBy }}</p>
                </div>
            </div>

            <div class="flex justify-end space-x-4 mt-6">
                <button
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    @click="handleAccept"
                >
                    Accept Request
                </button>
                <button
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    @click="handleDecline"
                >
                    Decline Request
                </button>
            </div>
        </div>
    </div>
</template>