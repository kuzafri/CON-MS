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
    status: 'Pending'
});

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

const handleInventory = () => {
    console.log('handleInventory called');
    router.push({
        name: 'EventInventory',  // Use the named route
        // params: {
        //     id: EventRequest.value.id
        // },
        // state: EventRequest.value  // Pass full event data in state
    });
};

const handleAudiences = () => {
    console.log('handleAudiences called');
    router.push({
        name: 'EventAudiences',  // Use the named route
        // params: {
        //     id: EventRequest.value.id
        // },
        // state: EventRequest.value  // Pass full event data in state
    });
};

const handleBack = () => {
    router.push('/organizer/viewevent');
};

// For debugging
// console.log('Props:', props);
// console.log('Route params:', route.params);
// console.log('EventRequest:', EventRequest.value);

// function handleAccept() {
//     alert(`You have accepted the request for event: ${EventRequest.value.title}`);
// }

// function handleDecline() {
//     alert(`You have declined the request for event: ${EventRequest.value.title}`);
// }

</script>

<template>
    <div class="p-4">  <!-- Added padding -->
        <button 
                @click="handleBack"
                class="flex items-center text-blue-600 hover:text-blue-700 pb-4"
            >
                <span class="mr-2">←</span> Back to All Concerts
            </button>

        <div class="card p-6 bg-white shadow rounded">  <!-- Added background and shadow -->
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">ID: {{ EventRequest.id }}</h2>
                <Tag :severity="getStatusSeverity(EventRequest.status)" :value="EventRequest.status" />
            </div>
            
            <div class="space-y-4">
                <div class="flex justify-between border-b pb-2">  <!-- Added bottom border and padding -->
                    <p class="text-sm font-semibold">Concert Title:</p>
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
                    <p class="text-sm font-semibold">Performer(s)/Band(s):</p>
                    <div class="text-sm flex flex-col">
                        <ul>Taylor Swift</ul>
                        <ul>Beyonce</ul>
                        <ul>Justin Bieber</ul>
                        <ul>Harry Styles</ul>
                        <ul>Eminem</ul>
                        <ul>Drake</ul>
                        <ul>Post Malone</ul>
                    </div>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Genre:</p>
                    <p class="text-sm">Rock</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Standard Seat Price (RM):</p>
                    <p class="text-sm">80</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Gold Seat Price (RM):</p>
                    <p class="text-sm">120</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Platinum Seat Price (RM):</p>
                    <p class="text-sm">190</p>
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
                    <p class="text-sm font-semibold">Event Policies:</p>
                    <div class="w-1/4 text-right">
                        <p class="text-sm font-bold">Refunds and Cancellations:</p>
                        <p class="text-sm">No ticket refund 2 weeks before the event date.</p>
                        <p class="text-sm font-bold">Bag Checks & Security:</p>
                        <p class="text-sm">Bag check at the entrance to avoid any weapons or drugs enter the concert.</p>
                    </div>
                    
                </div>
            </div>

            <div class="flex justify-end space-x-4 mt-6">
                <button
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    @click="handleAccept"
                >
                    Edit
                </button>
                <button
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    @click="handleInventory"
                >
                    Inventory
                </button>
                <button
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    @click="handleAudiences"
                >
                    View Audience
                </button>
                
            </div>
        </div>
    </div>
</template>