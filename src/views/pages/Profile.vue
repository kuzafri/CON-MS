<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Get admin data from route params and query
const customerUser = ref({
    id: route.params.id,
    username: route.query.username,
    email: route.query.email,
    phone: route.query.phone,
    role: route.query.role,
    // Additional data that could be stored in your system
    creationDate: '01 December 2023',
    status: 'Active',
    lastLogin: '03 December 2024',
    department: 'IT Administration'
});

const handleLogout = () => {
    router.push('/auth/login');
};
</script>

<template>
    <div class="p-6 max-w-6xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6 mt-14">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">User Profile</h1>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-12 gap-8">
            <!-- Profile Card -->
            <div class="col-span-12 md:col-span-4">
                <div class="card p-6 bg-white dark:bg-surface-800 rounded-lg shadow-sm">
                    <div class="flex flex-col items-center mb-6">
                        <div class="w-32 h-32 bg-gray-200 dark:bg-surface-900 rounded-full flex items-center justify-center mb-4 relative group">
                            <i class="text-5xl">👤</i>
                            <button class="absolute inset-0 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm" @click="handleEditProfile">Change Photo</button>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ customerUser.username }}</h2>
                        <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm mt-2">
                            {{ customerUser.role }}
                        </span>
                    </div>

                    <div class="space-y-4 ">
                        <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="font-semibold text-gray-700 dark:text-gray-200">User ID:</span>
                            <span class="text-gray-600 dark:text-gray-300">{{ customerUser.id }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="font-semibold text-gray-700 dark:text-gray-200">Email:</span>
                            <span class="text-gray-600 dark:text-gray-300">{{ customerUser.email }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="font-semibold text-gray-700 dark:text-gray-200">Phone:</span>
                            <span class="text-gray-600 dark:text-gray-300">{{ customerUser.phone }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="font-semibold text-gray-700 dark:text-gray-200">Account Created:</span>
                            <span class="text-gray-600 dark:text-gray-300">{{ customerUser.creationDate }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="font-semibold text-gray-700 dark:text-gray-200">Last Login:</span>
                            <span class="text-gray-600 dark:text-gray-300">{{ customerUser.lastLogin }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span class="font-semibold text-gray-700 dark:text-gray-200">Status:</span>
                            <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                                {{ customerUser.status }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="card p-6 mt-8 bg-white dark:bg-surface-800 rounded-lg shadow-sm">
                    <button @click="handleEditProfile" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-3">Edit Profile</button>
                    <button class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Change Password</button>
                </div>
            </div>

            <!-- Activity Section -->
            <div class="col-span-12 md:col-span-8">
                <div class="card p-6 bg-white dark:bg-surface-800 rounded-lg shadow-sm">
                    <h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Recent Activity</h3>
                    <div class="space-y-4">
                        <div class="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <span>Last login from 192.168.1.1</span>
                                <span class="mx-2">•</span>
                                <span>{{ customerUser.lastLogin }}</span>
                            </div>
                        </div>
                        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <span>Password changed</span>
                                <span class="mx-2">•</span>
                                <span>01 Dec 2024, 02:15 PM</span>
                            </div>
                        </div>
                        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <span>Profile information updated</span>
                                <span class="mx-2">•</span>
                                <span>28 Nov 2024, 11:45 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
