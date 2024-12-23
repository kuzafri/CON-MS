<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Get the passed disputes data from the route
const passedDisputes = computed(() => {
    if (route.query.disputes) {
        return JSON.parse(route.query.disputes);
    }
    return [];
});

// Get event information from the route
const eventInfo = computed(() => ({
    title: route.query.eventTitle || '',
    id: route.query.eventId || ''
}));

// Initialize disputes with passed data or default data
const disputes = ref([]);

onMounted(() => {
    // If we have disputes data passed from eventdetails.vue, use it
    if (passedDisputes.value.length > 0) {
        disputes.value = passedDisputes.value.map(dispute => ({
            ...dispute,
            responses: dispute.responses || []
        }));
    } else {
        // Fallback to default disputes if no data was passed
        disputes.value = [
            {
                user: 'Lucas Lim Weng Kit',
                date: '21-10-2024',
                time: '13:14:44',
                status: 'Active',
                description: 'Wrong Item Delivered',
                details: 'I ordered a set of Hokkien Mee with drinks but only received a dry set of noodles and condiments without both the broth and drinks.',
                responses: [
                    {
                        text: "We apologize for the inconvenience. We'll look into this right away.",
                        timestamp: '21-10-2024 13:20:00'
                    }
                ]
            },
            {
                user: 'Dennis Tan Yi Jian',
                date: '21-10-2024',
                time: '13:14:44',
                status: 'Active',
                description: 'Payment Issue',
                responses: []
            }
        ];
    }
});

// Changed to simpler reactive structure
const messageInputs = ref([]);

onMounted(() => {
    // Initialize messageInputs based on disputes length
    messageInputs.value = new Array(disputes.value.length).fill('');
});

const filteredDisputes = computed(() => {
    return disputes.value;
});

const handleResolveDispute = (index) => {
    disputes.value[index].status = 'Resolved';
};

const submitResponse = (index) => {
    if (!messageInputs.value[index].trim()) return;
    
    const newResponse = {
        text: messageInputs.value[index],
        timestamp: new Date().toLocaleString()
    };
    
    disputes.value[index].responses.push(newResponse);
    messageInputs.value[index] = '';
};

defineExpose({
    disputes,
    handleResolveDispute,
    submitResponse
});
</script>

<template>
    <div class="min-h-screen bg-surface-0 dark:bg-surface-900 p-6">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white dark:bg-surface-800 rounded-lg shadow-lg p-6">
                <!-- Added Event Information -->
                <div v-if="eventInfo.title" class="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <h2 class="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        Event: {{ eventInfo.title }}
                    </h2>
                    <p class="text-sm text-blue-700 dark:text-blue-200">
                        ID: {{ eventInfo.id }}
                    </p>
                </div>

                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-surface-900 dark:text-white">Complaints Management</h1>
                </div>

                <!-- Filters -->
                <div class="flex gap-4 mb-6">
                    <div class="flex-1">
                        <input 
                            type="text" 
                            placeholder="Search complaints..."
                            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-700 dark:text-white"
                        >
                    </div>
                    <select class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-surface-700 dark:text-white">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                <!-- Complaints List -->
                <div class="space-y-4">
                    <div v-for="(dispute, index) in disputes" 
                        :key="index"
                        class="bg-surface-50 dark:bg-surface-700 rounded-lg p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                    <span class="text-lg font-semibold">{{ dispute.user.charAt(0) }}</span>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-surface-900 dark:text-white">{{ dispute.user }}</h3>
                                    <p class="text-sm text-surface-600 dark:text-gray-300">{{ dispute.date }} | {{ dispute.time }}</p>
                                </div>
                            </div>
                            <span :class="{
                                'px-3 py-1 rounded-full text-sm': true,
                                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100': dispute.status === 'Active',
                                'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100': dispute.status === 'Resolved'
                            }">
                                {{ dispute.status }}
                            </span>
                        </div>
                        <div class="ml-13">
                            <h4 class="font-medium text-surface-900 dark:text-white mb-2">{{ dispute.description }}</h4>
                            <p v-if="dispute.details" class="text-surface-600 dark:text-gray-300 mb-4">{{ dispute.details }}</p>
                            
                            <!-- Response Display Section -->
                            <div v-if="dispute.responses.length" class="mb-4 space-y-2">
                                <div 
                                    v-for="(response, responseIndex) in dispute.responses" 
                                    :key="responseIndex" 
                                    class="bg-gray-100 dark:bg-surface-600 p-3 rounded"
                                >
                                    <p class="text-surface-900 dark:text-white">{{ response.text }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-300 mt-1">
                                        Sent at: {{ response.timestamp }}
                                    </p>
                                </div>
                            </div>

                            <!-- Response Input Section -->
                            <div class="w-full flex gap-4 mt-4">
                                <textarea 
                                    v-model="messageInputs[index]"
                                    placeholder="Your Message" 
                                    class="w-full p-2 border rounded dark:bg-surface-600 dark:border-gray-600 dark:text-white"
                                    rows="1"
                                />
                                <button 
                                    @click="submitResponse(index)"
                                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Send
                                </button>
                            </div>

                            <div class="flex gap-3 mt-4">
                                <button 
                                    v-if="dispute.status === 'Active'"
                                    @click="handleResolveDispute(index)"
                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Resolve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>