<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppConfigurator from './AppConfigurator.vue';

const route = useRoute();
const router = useRouter();

function handleLogout() {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Navigate to login page
    router.push('/organizer/login');
}

const organiser = ref({
    //use below when have a proper backend
    // id: route.params.id,
    // name: route.query.name,
    // email: route.query.email,
    // phone: route.query.phone,

    id: 'OH461B18UMJSN',
    name: 'USM Jazz Band',
    email: 'usmjazzband@student.usm.my',
    phone: '019-514-0014',
    // Additional mock data for the detail view
    department: 'School of Arts',
    role: 'Student Organisation',
    joinDate: '01 January 2024',
    status: 'Active',
    eventsOrganized: 15,
    upcomingEvents: 2,
    totalParticipants: 3500
});

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));

// Add state for profile modal
const isProfileModalVisible = ref(false);

function toggleProfileModal() {
    isProfileModalVisible.value = !isProfileModalVisible.value;
}
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <a class="flex items-center mx-4" href="#">
                <img :src="logoSrc" alt="logo" class="sm:w-full sm:h-1/3 md:w-1/3 h-8" />
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <!-- <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button> -->
                    <AppConfigurator />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action" @click="toggleProfileModal">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Slide-out Modal -->
    <div v-if="isProfileModalVisible" class="fixed inset-y-0 right-0 w-full sm:w-1/4 bg-gray-100 shadow-lg z-50 transition-transform duration-300 ease-in-out">
        <div class="h-full flex flex-col">
            <!-- Close Button -->
            <div class="p-4 absolute items-end">
                <button @click="toggleProfileModal" class="text-gray-600 hover:text-gray-900">
                    <i class="pi pi-times text-2xl"></i>
                </button>
            </div>

            <div class="card p-6 h-full">
                <div class="flex flex-col items-center mb-6">
                    <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <i class="text-4xl">👤</i>
                    </div>
                    <h2 class="text-2xl font-bold">{{ organiser.name }}</h2>
                    <p class="text-gray-500">{{ organiser.id }}</p>
                </div>

                <div class="space-y-4">
                    <div class="flex justify-between">
                        <span class="font-semibold">Department:</span>
                        <span>{{ organiser.department }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Role:</span>
                        <span>{{ organiser.role }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Email:</span>
                        <span>{{ organiser.email }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Phone:</span>
                        <span>{{ organiser.phone }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Join Date:</span>
                        <span>{{ organiser.joinDate }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">Status:</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {{ organiser.status }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="p-4 border-t bg-white">
                <Button class="w-full transition" label="Log out" @click="handleLogout"> </Button>
            </div>
        </div>
    </div>

    <!-- Overlay -->
    <div v-if="isProfileModalVisible" @click="toggleProfileModal" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
</template>

<style scoped>
/* Slide-in animation for the modal */
.enter-from-right {
    transform: translateX(100%);
}
.enter-active {
    transition: transform 0.3s ease-out;
}
.enter-to {
    transform: translateX(0);
}
</style>
