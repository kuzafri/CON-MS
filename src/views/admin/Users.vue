<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const loading = ref(true);
const activeTab = ref('Audience'); // Default active tab

onMounted(() => {
    // Dummy data for users
    users.value = [
        {
            id: 1,
            image: 'https://via.placeholder.com/150',
            name: 'Irshad Bin Abdul Razak',
            userID: 'CFY-A-2907762-T',
            role: 'Audience',
            email: 'irshadrazak@student.usm.my',
            contact: '019-514 0014',
            lastActive: '2024-09-30 23:59:59',
            status: 'Active',
        },
        ...Array(9).fill({
            id: 1,
            image: 'https://via.placeholder.com/150',
            name: 'Irshad Bin Abdul Razak',
            userID: 'CFY-A-2907762-T',
            role: 'Audience',
            email: 'irshadrazak@student.usm.my',
            contact: '019-514 0014',
            lastActive: '2024-09-30 23:59:59',
            status: 'Active',
        }),
    ];
    loading.value = false;
});

function getStatusClass(status) {
    switch (status) {
        case 'Active':
            return 'badge-success';
        case 'Inactive':
            return 'badge-secondary';
        default:
            return 'badge-warning';
    }
}
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-4">
            <!-- Title and Tabs -->
            <div class="flex items-center gap-4">
                <h2 class="text-2xl font-bold">Users</h2>
                <div class="flex items-center gap-2">
                    <button
                        class="btn"
                        :class="{ 'btn-primary': activeTab === 'Audience' }"
                        @click="activeTab = 'Audience'"
                    >
                        Audience
                    </button>
                    <button
                        class="btn"
                        :class="{ 'btn-primary': activeTab === 'Organiser' }"
                        @click="activeTab = 'Organiser'"
                    >
                        Organiser
                    </button>
                </div>
            </div>

            <!-- Search Bar and Create Button -->
            <div class="flex items-center gap-4">
                <div class="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        class="search-input"
                    />
                    <i class="pi pi-search search-icon"></i>
                </div>
                <button class="btn btn-primary">+ Create New User</button>
            </div>
        </div>

        <DataTable :value="users" :loading="loading" :rows="10" paginator>
            <Column field="image" header="#">
                <template #body="slotProps">
                    <img
                        :src="slotProps.data.image"
                        alt="User Avatar"
                        class="w-12 h-12 rounded-full object-cover"
                    />
                </template>
            </Column>
            <Column field="name" header="Name" sortable />
            <Column field="userID" header="User ID" sortable />
            <Column field="role" header="Role" sortable />
            <Column field="email" header="E-mail" sortable />
            <Column field="contact" header="Contact Number" sortable />
            <Column field="lastActive" header="Last Active" sortable />
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <span :class="`badge ${getStatusClass(slotProps.data.status)}`">
                        {{ slotProps.data.status }}
                    </span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
.card {
    padding: 1rem;
    background-color: var(--surface-card);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
}

.flex {
    display: flex;
}

.gap-2 {
    gap: 0.5rem;
}

.gap-4 {
    gap: 1rem;
}

.btn {
    padding: 0.5rem 1rem;
    background-color: var(--surface-ground); /* Inactive button color */
    color: var(--text-color); /* Inactive text color */
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.btn:hover {
    background-color: var(--primary-color-hover);
    color: var(--primary-color-text);
}

.btn-primary {
    background-color: var(--primary-color); /* Active button color */
    color: var(--primary-color-text); /* Active text color */
    border: 1px solid var(--primary-color);
    font-weight: bold;
}

.btn-primary:hover {
    background-color: var(--primary-color-hover);
}

.search-bar {
    display: flex;
    align-items: center;
    position: relative;
}

.search-input {
    padding: 0.5rem 2rem 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 250px;
}

.search-icon {
    position: absolute;
    right: 0.5rem;
    color: #aaa;
    cursor: pointer;
}

.badge {
    display: inline-block;
    padding: 0.25em 0.5em;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.375rem;
    color: var(--surface-card); /* Ensure the text is visible */
}

.badge-success {
    background-color: #28a745;
    color: #fff;
}

.badge-secondary {
    background-color: #6c757d;
    color: #fff;
}

.badge-warning {
    background-color: #ffc107;
    color: #212529;
}

.w-12 {
    width: 3rem;
    height: 3rem;
}

.rounded-full {
    border-radius: 9999px;
}

.object-cover {
    object-fit: cover;
}
</style>
