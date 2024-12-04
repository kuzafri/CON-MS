<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const customerUser = ref({
    username: 'User',
    email: 'user@example.com'
});

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));
</script>

<template>
    <div class="layout-topbar border-b-[1px] border-black-900 dark:border-white-900">
        <div class="layout-topbar-logo-container">
            <a class="flex items-center mx-4 sm:w-1/2" href="#">
                <img :src="logoSrc" alt="logo" class="w-full h-8" />
            </a>
        </div>

        <div class="layout-topbar-actions ml-auto">
            <!-- Hamburger Menu (visible only on small devices) -->
            <div class="relative md:hidden right-0 flex mt-1">
                <button
                    @click="toggleMenu"
                    class="layout-topbar-action p-2"
                    v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-scalein',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-fadeout',
                        hideOnOutsideClick: true
                    }"
                >
                    <i class="pi pi-bars text-xl"></i>
                </button>

                <!-- Mobile Navigation Menu -->
                <div class="hidden absolute left-0 top-full mt-2 w-48 bg-white dark:bg-surface-900 rounded-lg shadow-lg z-50">
                    <div class="py-2">
                        <router-link to="/homebook" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <i class="pi pi-home mr-2"></i>
                            <span>Home</span>
                        </router-link>
                        <router-link to="/event" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <i class="pi pi-calendar mr-2"></i>
                            <span>Events</span>
                        </router-link>
                        <router-link to="/ticket" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <i class="pi pi-ticket mr-2"></i>
                            <span>My Ticket</span>
                        </router-link>
                        <router-link to="/favourite" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <i class="pi pi-heart mr-2"></i>
                            <span>Favourite</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Desktop Navigation (hidden on small devices) -->
            <ul class="hidden md:flex list-none p-0 m-0 items-center select-none gap-8">
                <li>
                    <router-link to="/homebook" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl flex items-center">
                        <i class="pi pi-home mr-2"></i>
                        <span>Home</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/event" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl flex items-center">
                        <i class="pi pi-calendar mr-2"></i>
                        <span>Events</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/ticket" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl flex items-center">
                        <i class="pi pi-ticket mr-2"></i>
                        <span>My Ticket</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/favourite" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl flex items-center">
                        <i class="pi pi-heart mr-2"></i>
                        <span>Favourite</span>
                    </router-link>
                </li>
            </ul>
            <!-- Dark Mode Toggle -->
            <button type="button" class="layout-topbar-action lg:mt-3 mt-1" @click="toggleDarkMode">
                <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
            </button>

            <!-- Profile section -->
            <div class="relative lg:mt-3 mt-1">
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
                <div class="hidden absolute right-0 top-full mt-2 w-64 bg-white dark:bg-surface-800 rounded-lg shadow-lg z-50">
                    <div class="p-4">
                        <!-- User Info -->
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <i class="pi pi-user text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-800 dark:text-white">{{ customerUser.username }}</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-300">{{ customerUser.email }}</p>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="space-y-2">
                            <router-link to="/profile" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <i class="pi pi-user-edit mr-2"></i>
                                <span>View Profile</span>
                            </router-link>
                            <button @click="handleLogout" class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
