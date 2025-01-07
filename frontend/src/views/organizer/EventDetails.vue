<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

// Add props definition
const props = defineProps({
    id: String
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

// Get data from state or create default object
const EventRequest = ref({
    id: route.params.id,
    title: '',
    date: '',
    time: '',
    audience: '',
    type: '',
    status: 'Pending',
    performers: [],
    genre: '',
    standardSeatPrice: 0,
    goldSeatPrice: 0,
    platinumSeatPrice: 0,
    refundPolicy: '',
    securityPolicy: ''
});

// New refs for editing
const eventDialog = ref(false);
const submitted = ref(false);
const performerInput = ref('');

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
        name: 'EventInventory' // Use the named route
        // params: {
        //     id: EventRequest.value.id
        // },
        // state: EventRequest.value  // Pass full event data in state
    });
};

const handleAudiences = () => {
    console.log('handleAudiences called');
    router.push({
        name: 'EventAudiences' // Use the named route
        // params: {
        //     id: EventRequest.value.id
        // },
        // state: EventRequest.value  // Pass full event data in state
    });
};

const handleBack = () => {
    router.push('/organizer/viewevent');
};

// New edit-related functions
const openEditDialog = () => {
    eventDialog.value = true;
    submitted.value = false;
};

const hideDialog = () => {
    eventDialog.value = false;
    submitted.value = false;
};

const addPerformer = () => {
    if (performerInput.value.trim()) {
        EventRequest.value.performers.push(performerInput.value.trim());
        performerInput.value = '';
    }
};

const removePerformer = (index) => {
    EventRequest.value.performers.splice(index, 1);
};

const saveEvent = () => {
    submitted.value = true;

    // Basic validation for required fields
    if (EventRequest.value.title?.trim() && EventRequest.value.date?.trim() && EventRequest.value.time?.trim()) {
        toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Event Details Updated',
            life: 3000
        });

        eventDialog.value = false;
        submitted.value = false;
    }
};

const fetchEventDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:5001/api/events/${route.params.id}`);
        const event = response.data;

        // Map the backend data to our frontend structure
        EventRequest.value = {
            id: event._id,
            title: event.concertTitle,
            date: new Date(event.calendarValue).toLocaleDateString(),
            time: `${event.startTime} - ${event.endTime}`,
            audience: '1500 pax',
            type: 'Paid Entry',
            status: event.status,
            performers: event.performers,
            genre: event.genre,
            standardSeatPrice: event.standardPrice,
            goldSeatPrice: event.vipPrice,
            platinumSeatPrice: event.economyPrice,
            refundPolicy: event.eventPolicies,
            securityPolicy: event.eventPolicies
        };
    } catch (error) {
        console.error('Error fetching event details:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load event details',
            life: 3000
        });
    }
};

onMounted(() => {
    fetchEventDetails();
});

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
    <div class="p-4">
        <!-- Added padding -->
        <button @click="handleBack" class="flex items-center text-blue-600 hover:text-blue-700 pb-4"><span class="mr-2">←</span> Back to All Concerts</button>

        <div class="card p-6 bg-surface-0 dark:bg-surface-900 dark:text-surface-0 text-shadow rounded">
            <!-- Added background and shadow -->
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">ID: {{ EventRequest.id }}</h2>
                <Tag :severity="getStatusSeverity(EventRequest.status)" :value="EventRequest.status" />
            </div>

            <div class="space-y-4">
                <div class="flex justify-between border-b pb-2">
                    <!-- Added bottom border and padding -->
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
                        <ul v-for="(performer, index) in EventRequest.performers" :key="index">
                            {{
                                performer
                            }}
                        </ul>
                    </div>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Genre:</p>
                    <p class="text-sm">{{ EventRequest.genre }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Standard Seat Price (RM):</p>
                    <p class="text-sm">{{ EventRequest.standardSeatPrice }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Gold Seat Price (RM):</p>
                    <p class="text-sm">{{ EventRequest.goldSeatPrice }}</p>
                </div>
                <div class="flex justify-between border-b pb-2">
                    <p class="text-sm font-semibold">Platinum Seat Price (RM):</p>
                    <p class="text-sm">{{ EventRequest.platinumSeatPrice }}</p>
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
                        <p class="text-sm">{{ EventRequest.refundPolicy }}</p>
                        <p class="text-sm font-bold">Bag Checks & Security:</p>
                        <p class="text-sm">{{ EventRequest.securityPolicy }}</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-end space-x-4 mt-6">
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" @click="openEditDialog">Edit</button>
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" @click="handleInventory">Inventory</button>
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" @click="handleAudiences">View Audience</button>
            </div>
        </div>

        <!-- Edit Dialog -->
        <!-- Edit Dialog -->
        <Dialog v-model:visible="eventDialog" :style="{ width: '600px' }" header="Edit Event Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="title" class="block font-bold mb-3">Concert Title</label>
                        <InputText id="title" v-model.trim="EventRequest.title" required="true" autofocus :invalid="submitted && !EventRequest.title" fluid class="w-full" />
                        <small v-if="submitted && !EventRequest.title" class="text-red-500">Title is required.</small>
                    </div>
                    <div>
                        <label for="genre" class="block font-bold mb-3">Genre</label>
                        <InputText id="genre" v-model="EventRequest.genre" fluid class="w-full" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="date" class="block font-bold mb-3">Date</label>
                        <InputText id="date" v-model="EventRequest.date" fluid class="w-full" />
                    </div>
                    <div>
                        <label for="time" class="block font-bold mb-3">Time</label>
                        <InputText id="time" v-model="EventRequest.time" fluid class="w-full" />
                    </div>
                </div>

                <div>
                    <label class="block font-bold mb-3">Performers</label>
                    <div class="flex mb-3">
                        <InputText v-model="performerInput" placeholder="Add performer" class="w-full mr-2" />
                        <Button label="Add" @click="addPerformer" class="p-button-secondary" />
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Chip v-for="(performer, index) in EventRequest.performers" :key="index" :label="performer" removable @remove="removePerformer(index)" />
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label for="standardSeatPrice" class="block font-bold mb-3">Standard Seat Price (RM)</label>
                        <InputNumber id="standardSeatPrice" v-model="EventRequest.standardSeatPrice" mode="currency" currency="MYR" fluid class="w-full" />
                    </div>
                    <div>
                        <label for="goldSeatPrice" class="block font-bold mb-3">Gold Seat Price (RM)</label>
                        <InputNumber id="goldSeatPrice" v-model="EventRequest.goldSeatPrice" mode="currency" currency="MYR" fluid class="w-full" />
                    </div>
                    <div>
                        <label for="platinumSeatPrice" class="block font-bold mb-3">Platinum Seat Price (RM)</label>
                        <InputNumber id="platinumSeatPrice" v-model="EventRequest.platinumSeatPrice" mode="currency" currency="MYR" fluid class="w-full" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="audience" class="block font-bold mb-3">Audience</label>
                        <InputText id="audience" v-model="EventRequest.audience" fluid class="w-full" />
                    </div>
                    <div>
                        <label for="type" class="block font-bold mb-3">Type of Entry</label>
                        <InputText id="type" v-model="EventRequest.type" fluid class="w-full" />
                    </div>
                </div>

                <div>
                    <label for="refundPolicy" class="block font-bold mb-3">Refund Policy</label>
                    <Textarea id="refundPolicy" v-model="EventRequest.refundPolicy" rows="3" class="w-full" />
                </div>

                <div>
                    <label for="securityPolicy" class="block font-bold mb-3">Security Policy</label>
                    <Textarea id="securityPolicy" v-model="EventRequest.securityPolicy" rows="3" class="w-full" />
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveEvent" />
            </template>
        </Dialog>
    </div>
</template>
