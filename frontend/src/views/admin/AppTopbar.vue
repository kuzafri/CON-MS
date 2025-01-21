<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppConfigurator from './AppConfigurator.vue';

const router = useRouter();
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

// Admin user data
const adminUser = ref({
    username: 'Shad',
    id: 'ADM123456',
    email: 'admin@concertify.com',
    phone: '+60 12-345-6789',
    role: 'System Administrator'
});

const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to admin login page
    router.push('/admin/auth/login');
};

const handleViewProfile = () => {
    console.log('handleViewProfile called');
    router.push({
        name: 'AdminProfile',
        params: {
            id: adminUser.value.id
        },
        query: {
            username: adminUser.value.username,
            email: adminUser.value.email,
            phone: adminUser.value.phone,
            role: adminUser.value.role
        }
    });
};

const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));
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
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>

            <!-- Profile section -->
            <div class="relative">
                <button
                    v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-scalein',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-fadeout',
                        hideOnOutsideClick: true
                    }"
                    type="button"
                    class="layout-topbar-action"
                >
                    <i class="pi pi-user"></i>
                </button>

                <!-- Profile Popup Menu -->
                <div class="hidden absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50">
                    <div class="p-4">
                        <!-- User Info -->
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <i class="pi pi-user text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-800 dark:text-white">{{ adminUser.username }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-300">{{ adminUser.email }}</p>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="space-y-2">
                            <button @click="handleViewProfile" class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                <i class="pi pi-user-edit mr-2"></i>
                                View Profile
                            </button>
                            <button 
                                @click="handleLogout" 
                                class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <i class="pi pi-power-off mr-2"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
