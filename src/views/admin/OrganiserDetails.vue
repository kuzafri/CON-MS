<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Organiser data from route params and query
const organiser = ref({
    id: route.params.id,
    name: route.query.name,
    email: route.query.email,
    phone: route.query.phone,
    // Additional mock data for the detail view
    department: "School of Arts",
    role: "Student Organisation",
    joinDate: "01 January 2024",
    status: "Active",
    eventsOrganized: 15,
    upcomingEvents: 2,
    totalParticipants: 3500,
});

// Mock event history data
const eventHistory = ref([
    {
        id: "R-KL-58/43",
        title: "REBEL 4.0: Because of You",
        date: "13th January 2025",
        status: "Upcoming",
        participants: 1500
    },
    {
        id: "E-002",
        title: "Jazz Night 2024",
        date: "15th December 2024",
        status: "Completed",
        participants: 1000
    },
    {
        id: "E-003",
        title: "Music Workshop",
        date: "10th November 2024",
        status: "Completed",
        participants: 1000
    }
]);

const handleBack = () => {
    router.push('/admin/dashboard');
};
</script>

<template>
    <div class="p-6">
        <!-- Header with Back Button -->
        <div class="flex items-center mb-6">
            <button 
                @click="handleBack"
                class="flex items-center text-blue-600 hover:text-blue-700"
            >
                <span class="mr-2">←</span> Back to Dashboard
            </button>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-12 gap-8">
            <!-- Organiser Profile Card -->
            <div class="col-span-12 xl:col-span-4">
                <div class="card p-6">
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

                <!-- Statistics Card -->
                <div class="card p-6 mt-8">
                    <h3 class="text-xl font-semibold mb-4">Statistics</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Events Organized</p>
                            <p class="text-2xl font-bold">{{ organiser.eventsOrganized }}</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Upcoming Events</p>
                            <p class="text-2xl font-bold">{{ organiser.upcomingEvents }}</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg col-span-2">
                            <p class="text-sm text-gray-600">Total Participants</p>
                            <p class="text-2xl font-bold">{{ organiser.totalParticipants }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Event History -->
            <div class="col-span-12 xl:col-span-8">
                <div class="card p-6">
                    <h3 class="text-xl font-semibold mb-6">Event History</h3>
                    <div class="space-y-4">
                        <div v-for="event in eventHistory" :key="event.id" 
                            class="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 class="font-semibold">{{ event.title }}</h4>
                                <p class="text-sm text-gray-500">{{ event.date }}</p>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="text-right">
                                    <p class="text-sm text-gray-600">Participants</p>
                                    <p class="font-semibold">{{ event.participants }}</p>
                                </div>
                                <span :class="{
                                    'px-3 py-1 rounded-full text-sm': true,
                                    'bg-blue-100 text-blue-800': event.status === 'Upcoming',
                                    'bg-green-100 text-green-800': event.status === 'Completed'
                                }">
                                    {{ event.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>