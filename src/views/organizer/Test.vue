<script setup>
import { ref } from 'vue';
import { PrimeIcons } from '@primevue/core/api';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownValue = ref(null);
const dropdownValues = ref([
    { name: 'Rock', code: 'ROK' },
    { name: 'Pop', code: 'POP' },
    // ... other genres
]);

const performers = ref(['']);
const calendarValue = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const standardPrice = ref(null);
const vipPrice = ref(null);
const concertTitle = ref('');
const policies = ref('');

// Validation state
const errors = ref({
    concertTitle: '',
    calendarValue: '',
    startTime: '',
    endTime: '',
    performers: '',
    dropdownValue: '',
    standardPrice: '',
    vipPrice: '',
    policies: ''
});

// Modal visibility state
const showModal = ref(false);

const validateForm = () => {
    // Reset errors
    Object.keys(errors.value).forEach(key => (errors.value[key] = ''));

    let isValid = true;

    if (!concertTitle.value.trim()) {
        errors.value.concertTitle = 'Concert title is required';
        isValid = false;
    }
    if (!calendarValue.value) {
        errors.value.calendarValue = 'Date is required';
        isValid = false;
    }
    if (!startTime.value) {
        errors.value.startTime = 'Start time is required';
        isValid = false;
    }
    if (!endTime.value) {
        errors.value.endTime = 'End time is required';
        isValid = false;
    }
    if (startTime.value && endTime.value && endTime.value <= startTime.value) {
        errors.value.endTime = 'End time must be later than start time';
        isValid = false;
    }
    if (performers.value.some(performer => !performer.trim())) {
        errors.value.performers = 'All performers must be filled';
        isValid = false;
    }
    if (!dropdownValue.value) {
        errors.value.dropdownValue = 'Genre is required';
        isValid = false;
    }
    if (!standardPrice.value) {
        errors.value.standardPrice = 'Standard seat price is required';
        isValid = false;
    }
    if (!vipPrice.value) {
        errors.value.vipPrice = 'VIP seat price is required';
        isValid = false;
    }
    if (!policies.value.trim()) {
        errors.value.policies = 'Event policies are required';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = () => {
    if (validateForm()) {
        showModal.value = true;
    }
};

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
                        <InputText id="concertTitle" type="text" v-model="concertTitle" />
                        <small class="text-red-500">{{ errors.concertTitle }}</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="date">Date</label>
                        <DatePicker :showIcon="true" :showButtonBar="true" v-model="calendarValue"></DatePicker>
                        <small class="text-red-500">{{ errors.calendarValue }}</small>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="startTime">Start Time</label>
                        <input 
                            type="time" 
                            id="startTime" 
                            v-model="startTime" 
                            class="w-full h-8 p-5 border rounded-md border-zinc-300" 
                        />
                        <small class="text-red-500">{{ errors.startTime }}</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="endTime">End Time</label>
                        <input 
                            type="time" 
                            id="endTime" 
                            v-model="endTime" 
                            class="w-full h-8 p-5 border rounded-md border-zinc-300" 
                        />
                        <small class="text-red-500">{{ errors.endTime }}</small>
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <label>Performer(s)/Band(s)</label>
                    <div v-for="(performer, index) in performers" :key="index" class="flex gap-2 items-center mb-2">
                        <InputText 
                            :id="'performer-' + index"
                            v-model="performers[index]"
                            placeholder="Enter performer name"
                            class="flex-1"
                        />
                        <Button 
                            v-if="performers.length > 1"
                            icon="pi pi-trash"
                            severity="danger"
                            @click="performers.splice(index, 1)"
                            class="p-button-rounded p-button-text"
                        />
                    </div>
                    <Button 
                        icon="pi pi-plus"
                        label="Add Performer"
                        @click="performers.push('')"
                        class="p-button-rounded p-button-outlined w-fit"
                    />
                    <small class="text-red-500">{{ errors.performers }}</small>
                </div>

                <div class="flex flex-col flex-wrap gap-2 w-full">
                    <label for="concertTitle">Genre</label>
                    <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                    <small class="text-red-500">{{ errors.dropdownValue }}</small>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="standardPrice">Standard Seat Price (RM)</label>
                        <InputNumber id="standardPrice" type="text" v-model="standardPrice"/>
                        <small class="text-red-500">{{ errors.standardPrice }}</small>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="vipPrice">VIP Seat Price (RM)</label>
                        <InputNumber id="vipPrice" type="text" v-model="vipPrice"/>
                        <small class="text-red-500">{{ errors.vipPrice }}</small>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <label for="policies">Event Policies</label>
                    <Textarea id="policies" rows="4" placeholder="e.g: safety guideline, COVID-19 safety guideline" v-model="policies" />
                    <small class="text-red-500">{{ errors.policies }}</small>
                </div>
                
                <Button label="Submit" @click="handleSubmit"></Button>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96 ">
                <h2 class="text-xl font-semibold mb-4">Success</h2>
                <p class="mb-6">Your concert event application has been submitted!</p>
                <p class="mb-6">Please wait for system admin to approve your application</p>
                <Button label="Close" @click="closeModal"></Button>
            </div>
        </div>
    </Fluid>
</template>
