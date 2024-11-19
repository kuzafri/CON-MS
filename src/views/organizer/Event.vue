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

// New refs for performers
const performers = ref(['']); // Initialize with one empty input

// Function to add new performer input
const addPerformer = () => {
    performers.value.push('');
};

// Function to remove performer input
const removePerformer = (index) => {
    if (performers.value.length > 1) { // Keep at least one input field
        performers.value.splice(index, 1);
    }
};

const dropdownItem = ref(null);
const calendarValue = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const standardPrice = ref(null);
const vipPrice = ref(null);
</script>

<template>
    <Fluid>
        <div class="flex">
            <div class="card flex flex-col gap-4 w-full">
                <div class="font-semibold text-xl">Create New Concert</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="concertTitle">Concert Title</label>
                        <InputText id="concertTitle" type="text" />
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="date">Date</label>
                        <DatePicker :showIcon="true" :showButtonBar="true" v-model="calendarValue"></DatePicker>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="startTime">Start Time</label>
                        <input type="time" id="startTime" v-model="startTime" class="w-full h-8 p-5 border rounded-md border-zinc-300" required />
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="lastname2">End Time</label>
                        <input type="time" id="endTime" v-model="endTime" class="w-full h-8 p-5 border rounded-md border-zinc-300" required />
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
                        <!-- Remove Button -->
                        <Button 
                            v-if="performers.length > 1"
                            icon="pi pi-trash"
                            severity="danger"
                            @click="removePerformer(index)"
                            class="p-button-rounded p-button-text"
                        />
                    </div>
                    <!-- Add Button -->
                    <Button 
                        icon="pi pi-plus"
                        label="Add Performer"
                        @click="addPerformer"
                        class="p-button-rounded p-button-outlined w-fit"
                    />
                </div>

                <div class="flex flex-col flex-wrap gap-2 w-full">
                    <label for="concertTitle">Genre</label>
                    <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="startTime">Starndard Seat Price (RM)</label>
                        <InputNumber id="standardPrice" type="text" v-model="standardPrice"/>
                    </div>
                    <div class="flex flex-col flex-wrap gap-2 w-full">
                        <label for="lastname2">VIP Seat Price (RM)</label>
                        <InputNumber id="vipPrice" type="text" v-model="vipPrice"/>
                    </div>
                </div>


                <div class="flex flex-wrap">
                    <label for="address">Event Policies</label>
                    <Textarea id="address" rows="4" placeholder="e.g: safety guideline, COVID-19 safety guideline" />
                </div>
                
                <Button label="Submit"></Button>
            </div>
        </div>
        
    </Fluid>
</template>
