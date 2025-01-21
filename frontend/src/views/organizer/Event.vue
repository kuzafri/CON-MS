<script setup>
import { ref } from 'vue';
import { PrimeIcons } from '@primevue/core/api';
import axios from '@/utils/axios';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownValue = ref(null);
const dropdownValues = ref([
    { name: 'Rock', code: 'ROK' },
    { name: 'Pop', code: 'POP' },
    { name: 'Jazz', code: 'JAZ' },
    { name: 'Classical', code: 'CLS' },
    { name: 'Hip-Hop/Rap', code: 'HHR' },
    { name: 'Electronic/Dance', code: 'EDM' },
    { name: 'Country', code: 'CNT' },
    { name: 'Reggae', code: 'REG' },
    { name: 'Blues', code: 'BLU' },
    { name: 'Folk', code: 'FLK' },
    { name: 'Metal', code: 'MTL' },
    { name: 'Punk', code: 'PNK' },
    { name: 'R&B/Soul', code: 'RBS' },
    { name: 'Indie', code: 'IND' },
    { name: 'Alternative', code: 'ALT' },
    { name: 'Latin', code: 'LAT' },
    { name: 'K-Pop', code: 'KPP' },
    { name: 'World Music', code: 'WRM' },
    { name: 'Opera', code: 'OPR' },
    { name: 'Gospel', code: 'GOS' }
]);

// Refs for performers
const performers = ref(['']);
const addPerformer = () => {
    performers.value.push('');
};
const removePerformer = (index) => {
    if (performers.value.length > 1) {
        performers.value.splice(index, 1);
    }
};

const dropdownItem = ref(null);
const concertTitle = ref('');
const calendarValue = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const economyPrice = ref(null);
const standardPrice = ref(null);
const vipPrice = ref(null);
const submitted = ref(false);
const eventPolicies = ref('');
const timeError = ref(''); // Error message for time validation

// Modal visibility state
const showModal = ref(false);

// Function to handle submit
const handleSubmit = async () => {
    submitted.value = true;

    // Validate end time is not earlier than start time
    if (startTime.value && endTime.value && endTime.value <= startTime.value) {
        timeError.value = 'End time must be later than the start time.';
        return;
    } else {
        timeError.value = '';
    }

    // Validate all required fields
    if (
        !concertTitle.value ||
        !calendarValue.value ||
        !startTime.value ||
        !endTime.value ||
        performers.value.some((performer) => !performer) ||
        !dropdownValue.value ||
        !economyPrice.value ||
        !standardPrice.value ||
        !vipPrice.value ||
        !eventPolicies.value
    ) {
        return;
    }

    try {
        const eventData = {
            concertTitle: concertTitle.value,
            calendarValue: calendarValue.value,
            startTime: startTime.value,
            endTime: endTime.value,
            performers: performers.value.filter((p) => p.trim() !== ''),
            genre: dropdownValue.value.name,
            economyPrice: economyPrice.value,
            standardPrice: standardPrice.value,
            vipPrice: vipPrice.value,
            eventPolicies: eventPolicies.value
        };
        const response = await axios.post('/events', eventData);

        if (response.status === 201) {
            showModal.value = true;
            // Reset form after successful submission
            resetForm();
        }
    } catch (error) {
        console.error('Error creating event:', error);
        alert('Failed to create event. Please try again.');
    }
};

// Add a new function to reset the form
const resetForm = () => {
    concertTitle.value = '';
    calendarValue.value = null;
    startTime.value = null;
    endTime.value = null;
    performers.value = [''];
    dropdownValue.value = null;
    economyPrice.value = null;
    standardPrice.value = null;
    vipPrice.value = null;
    eventPolicies.value = '';
    submitted.value = false;
    timeError.value = '';
};

// Function to close the modal
const closeModal = () => {
    showModal.value = false;
};
</script>

<template>
    <Fluid>
        <div class="flex">
            <div class="card flex flex-col gap-4 w-full">
                <div class="font-semibold text-xl">Create New Concert</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="concertTitle">Concert Title</label>
                        <InputText id="concertTitle" type="text" required="true" v-model="concertTitle" autofocus :invalid="submitted && !concertTitle" fluid />
                        <small v-if="submitted && !concertTitle" class="text-red-500">Title is required.</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="date">Date</label>
                        <DatePicker id="calendarValue" required="true" v-model="calendarValue" autofocus :showIcon="true" :showButtonBar="true" :invalid="submitted && !calendarValue"></DatePicker>
                        <small v-if="submitted && !calendarValue" class="text-red-500">Date is required.</small>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="startTime">Start Time</label>
                        <input type="time" id="startTime" v-model="startTime" class="w-full h-8 p-5 border rounded-md border-zinc-300" required />
                        <small v-if="submitted && !startTime" class="text-red-500">Start time is required.</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="lastname2">End Time</label>
                        <input type="time" id="endTime" v-model="endTime" class="w-full h-8 p-5 border rounded-md border-zinc-300" required />
                        <small v-if="submitted && !endTime" class="text-red-500">End time is required.</small>
                        <small v-if="timeError" class="text-red-500">{{ timeError }}</small>
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label>Performer(s)/Band(s)</label>
                    <div v-for="(performer, index) in performers" :key="index" class="flex gap-2 items-center mb-2">
                        <InputText :id="'performer-' + index" v-model="performers[index]" placeholder="Enter performer name" class="flex-1" />
                        <Button v-if="performers.length > 1" icon="pi pi-trash" severity="danger" @click="removePerformer(index)" class="p-button-rounded p-button-text" />
                    </div>
                    <small v-if="submitted && performers.some((performer) => !performer)" class="text-red-500">Performer field are required.</small>
                    <Button icon="pi pi-plus" label="Add Performer" @click="addPerformer" class="p-button-2xl p-button-outlined w-fit" />
                </div>

                <div class="flex flex-col flex-wrap gap-2 w-full">
                    <label for="concertTitle">Genre</label>
                    <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                    <small v-if="submitted && !dropdownValue" class="text-red-500">Genre is required.</small>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="economyPrice">Economy Seat Price (RM)</label>
                        <InputNumber id="economyPrice" type="text" v-model="economyPrice" />
                        <small v-if="submitted && !economyPrice" class="text-red-500">Economy price is required.</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="standardPrice">Standard Seat Price (RM)</label>
                        <InputNumber id="standardPrice" type="text" v-model="standardPrice" />
                        <small v-if="submitted && !standardPrice" class="text-red-500">Standard price is required.</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="vipPrice">VIP Seat Price (RM)</label>
                        <InputNumber id="vipPrice" type="text" v-model="vipPrice" />
                        <small v-if="submitted && !vipPrice" class="text-red-500">VIP price is required.</small>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <label for="eventPolicies">Event Policies</label>
                    <Textarea v-model="eventPolicies" id="eventPolicies" rows="4" placeholder="e.g: safety guideline, COVID-19 safety guideline" />
                    <small v-if="submitted && !eventPolicies" class="text-red-500">Event policies are required.</small>
                </div>

                <Button label="Submit" @click="handleSubmit"></Button>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <h2 class="text-xl font-semibold mb-4">Success</h2>
                <p class="mb-6">Your concert event application has been submitted!</p>
                <p class="mb-6">Please wait for system admin to approve your application</p>
                <Button label="Close" @click="closeModal"></Button>
            </div>
        </div>
    </Fluid>
</template>
