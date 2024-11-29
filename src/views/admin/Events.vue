<script setup>
import { ref, onMounted } from 'vue';

const events = ref([]);
const loading = ref(true);

onMounted(() => {
    // Simulate fetching data with dummy event requests
    events.value = [
        {
            id: 1,
            poster: 'https://via.placeholder.com/150',
            eventID: '#280924-PLT-B04-A0087',
            title: 'REBEL 3.0: Because of You',
            organiser: 'USM Jazz Band',
            dateTime: '2025-01-13 3:00 PM - 4:00 PM',
            type: 'Paid Entry',
            createdAt: '2024-09-30 23:59:59',
            status: 'Pending',
        },
        // Repeat data to simulate multiple rows
        ...Array(9).fill({
            id: 1,
            poster: 'https://via.placeholder.com/150',
            eventID: '#280924-PLT-B04-A0087',
            title: 'REBEL 3.0: Because of You',
            organiser: 'USM Jazz Band',
            dateTime: '2025-01-13 3:00 PM - 4:00 PM',
            type: 'Paid Entry',
            createdAt: '2024-09-30 23:59:59',
            status: 'Pending',
        }),
    ];
    loading.value = false;
});

function getStatusClass(status) {
    switch (status) {
        case 'Pending':
            return 'badge-warning';
        case 'Approved':
            return 'badge-success';
        case 'Rejected':
            return 'badge-danger';
        default:
            return 'badge-secondary';
    }
}
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Events</h2>
            <button class="btn btn-primary">+ Create New Entry</button>
        </div>

        <DataTable :value="events" :loading="loading" :rows="10" paginator sortField="eventID" sortOrder="1">
            <Column field="poster" header="#">
                <template #body="slotProps">
                    <img
                        :src="slotProps.data.poster"
                        alt="Event Poster"
                        class="w-12 h-12 object-cover"
                    />
                </template>
            </Column>
            <Column field="eventID" header="Event ID" sortable>
                <template #body="slotProps">
                    <a
                        href="#"
                        @click.prevent="console.log(slotProps.data.eventID)"
                        class="text-blue-600 hover:underline truncate-ellipsis"
                    >
                        {{ slotProps.data.eventID }}
                    </a>
                </template>
            </Column>
            <Column field="title" header="Title" sortable>
                <template #body="slotProps">
                    <span class="truncate-ellipsis">{{ slotProps.data.title }}</span>
                </template>
            </Column>
            <Column field="organiser" header="Organiser" sortable>
                <template #body="slotProps">
                    <span class="truncate-ellipsis">{{ slotProps.data.organiser }}</span>
                </template>
            </Column>
            <Column field="dateTime" header="Date & Time" sortable />
            <Column field="type" header="Type" sortable>
                <template #body="slotProps">
                    <span class="truncate-ellipsis">{{ slotProps.data.type }}</span>
                </template>
            </Column>
            <Column field="createdAt" header="Created At" sortable />
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <span :class="`badge ${getStatusClass(slotProps.data.status)}`">{{ slotProps.data.status }}</span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
.card {
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.5em;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.375rem;
}

.badge-warning {
    background-color: #ffc107;
    color: #212529;
}

.badge-success {
    background-color: #28a745;
    color: #fff;
}

.badge-danger {
    background-color: #dc3545;
    color: #fff;
}

.badge-secondary {
    background-color: #6c757d;
    color: #fff;
}

.truncate-ellipsis {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}
</style>
