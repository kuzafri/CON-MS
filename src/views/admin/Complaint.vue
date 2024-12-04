<script setup>
import { ref, computed } from 'vue';

const disputes = ref([
    {
        user: 'Lucas Lim Weng Kit',
        date: '21-10-2024',
        time: '13:14:44',
        status: 'Active',
        description: 'Wrong Item Delivered',
        details: 'I ordered a set of Hokkien Mee with drinks but only received a dry set of noodles and condiments without both the broth and drinks.'
    },
    {
        user: 'Dennis Tan Yi Jian',
        date: '21-10-2024',
        time: '13:14:44',
        status: 'Active',
        description: 'Payment Issue'
    },
    {
        user: 'Dennis Tan Yi Jian',
        date: '21-10-2024',
        time: '13:14:44',
        status: 'Active',
        description: 'Payment Issue'
    }
]);

const filteredDisputes = computed(() => {
    return disputes.value;
});

const handleResolveDispute = (index) => {
    disputes.value[index].status = 'Resolved';
};

defineExpose({
    disputes,
    handleResolveDispute
});
</script>

<template>
    <div class="min-h-screen bg-surface-0 dark:bg-surface-900 p-6">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white dark:bg-surface-800 rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-surface-900 dark:text-white">Complaints Management</h1>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        New Complaint
                    </button>
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
                            <div class="flex gap-3">
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