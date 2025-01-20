<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '@/utils/axios';

const users = ref([]);
const loading = ref(false);
const activeTab = ref('Audience');
const searchQuery = ref('');

// Fetch users when component mounts
onMounted(async () => {
    try {
        loading.value = true;
        const { data } = await axios.get('/users');
        // Transform data to ensure all users have a role and normalize role names
        users.value = data.map(user => ({
            id: user._id,
            image: user.image || 'https://via.placeholder.com/150',
            name: user.name,
            userID: user._id,
            // Normalize role names and set default to 'Audience'
            role: normalizeRole(user.role || 'Audience'),
            email: user.email,
            contact: user.contact || 'N/A',
            lastActive: user.lastActive || user.updatedAt || user.createdAt,
            status: user.status || 'Active',
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        loading.value = false;
    }
});

// Function to normalize role names
function normalizeRole(role) {
    const roleMap = {
        'audience': 'Audience',
        'organizer': 'Organiser',
        'organiser': 'Organiser',
        'admin': 'Admin'
    };
    return roleMap[role.toLowerCase()] || 'Audience';
}

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
                    <button
                        class="btn"
                        :class="{ 'btn-primary': activeTab === 'Admin' }"
                        @click="activeTab = 'Admin'"
                    >
                        Admin
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