<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// Event Creation Request Data
const EventRequest = ref({
    id: 'R-KL-58/42',
    title: 'REBEL 3.0: Because of You',
    date: '13th January 2025',
    time: '3:00 PM - 4:00 PM',
    audience: '1500 pax',
    type: 'Paid Entry',
    status: 'Pending'
});

const Organiser = ref({
    name: 'USM Jazz Band',
    id: 'OH461B18UMJSN',
    email: 'usmjazzband@student.usm.my',
    phone: '019-514-0014'
});

// Function to determine severity based on status
const getStatusSeverity = (status) => {
    switch (status) {
        case 'Pending':
            return 'warn';
        case 'Approved':
            return 'success';
        case 'Rejected':
            return 'danger';
        default:
            return 'info';
    }
};

const handleViewDetails = () => {
    console.log('handleViewDetails called');
    router.push({
        name: 'EventDetails',  // Use the named route
        params: {
            id: EventRequest.value.id
        },
        state: EventRequest.value  // Pass full event data in state
    });
};

</script>

<template>
    <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">All Concerts</h1>
        </div>
    <div class="card h-full">
        <div class="space-y-4">
            <div v-for="i in 4" :key="i" class="border border-gray-300 rounded p-4 flex flex-col justify-between h-full">
                <div class="flex justify-between items-center mb-3">
                    <div class="mb-4">
                        <p class="text-base font-extrabold">Event ID:</p>
                        <p class="text-sm mb-2">{{ EventRequest.id }}</p>
                        <p class="text-base font-extrabold">Title:</p>
                        <p class="text-sm">{{ EventRequest.title }}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <Tag :severity="getStatusSeverity(EventRequest.status)" :value="EventRequest.status" />
                    </div>
                </div>

                <div class="flex justify-between text-sm">
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Date</p>
                        <p>{{ EventRequest.date }}</p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Time</p>
                        <p>{{ EventRequest.time }}</p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Audience</p>
                        <p>{{ EventRequest.audience }}</p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-base font-extrabold">Type</p>
                        <p>{{ EventRequest.type }}</p>
                    </div>
                    <div class="flex justify-end mt-5">
                        <button class="text-blue-600 text-sm font-extrabold cursor-pointer" @click="handleViewDetails">View >></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
