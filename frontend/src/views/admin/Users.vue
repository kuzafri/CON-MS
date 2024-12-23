<script setup>
import { ref, computed } from 'vue';

const users = ref([
    // Original Audience users
    {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'Irshad',
        userID: 'CFY-A-2907762-T',
        role: 'Audience',
        email: 'irshad@student.usm.my',
        contact: '019-514 0014',
        lastActive: '2024-09-30 23:59:59',
        status: 'Active',
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/150',
        name: 'Ku Muhammad Zafri',
        userID: 'CFY-A-2907763-T',
        role: 'Audience',
        email: 'zaf@student.usm.my',
        contact: '019-555 1234',
        lastActive: '2024-09-29 14:30:00',
        status: 'Active',
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/150',
        name: 'Muhammad Al Hakim',
        userID: 'CFY-A-2907764-T',
        role: 'Audience',
        email: 'hakim@student.usm.my',
        contact: '019-666 5678',
        lastActive: '2024-09-28 09:15:00',
        status: 'Inactive',
    },
    // Additional Organiser users
    {
        id: 4,
        image: 'https://via.placeholder.com/150',
        name: 'Danish Irfan',
        userID: 'CFY-O-1234567-T',
        role: 'Organiser',
        email: 'danish@usm.my',
        contact: '019-777 8899',
        lastActive: '2024-09-30 22:45:00',
        status: 'Active',
    },
    {
        id: 5,
        image: 'https://via.placeholder.com/150',
        name: 'Prof. Ali Hassan',
        userID: 'CFY-O-1234568-T',
        role: 'Organiser',
        email: 'ali.hassan@usm.my',
        contact: '019-888 9900',
        lastActive: '2024-09-30 20:30:00',
        status: 'Active',
    },
    {
        id: 6,
        image: 'https://via.placeholder.com/150',
        name: 'Dr. Linda Tan',
        userID: 'CFY-O-1234569-T',
        role: 'Organiser',
        email: 'linda.tan@usm.my',
        contact: '019-999 0011',
        lastActive: '2024-09-29 18:15:00',
        status: 'Active',
    },
    {
        id: 7,
        image: 'https://via.placeholder.com/150',
        name: 'Prof. Kamal Ibrahim',
        userID: 'CFY-O-1234570-T',
        role: 'Organiser',
        email: 'kamal.ibrahim@usm.my',
        contact: '019-000 1122',
        lastActive: '2024-09-28 16:00:00',
        status: 'Inactive',
    },
    {
        id: 8,
        image: 'https://via.placeholder.com/150',
        name: 'Dr. Chen Wei',
        userID: 'CFY-O-1234571-T',
        role: 'Organiser',
        email: 'chen.wei@usm.my',
        contact: '019-111 2233',
        lastActive: '2024-09-27 14:45:00',
        status: 'Active',
    }
]);

const loading = ref(false);
const activeTab = ref('Audience');
const searchQuery = ref('');

const filteredUsers = computed(() => {
    return users.value
        .filter(user => user.role === activeTab.value)
        .filter(user => 
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
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

            <div class="flex items-center gap-4">
                <div class="search-bar">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search by name..."
                        class="search-input"
                    />
                    <i class="pi pi-search search-icon"></i>
                </div>
                <!-- <button class="btn btn-primary">+ Create New User</button> -->
            </div>
        </div>

        <DataTable :value="filteredUsers" :loading="loading" :rows="10" paginator>
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
    background-color: var(--surface-ground);
    color: var(--text-color);
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
    background-color: var(--primary-color);
    color: var(--primary-color-text);
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
    color: var(--surface-card);
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