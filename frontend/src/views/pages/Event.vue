<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref } from 'vue';
import { useEvent } from '@/composables/useEvent';
import Button from 'primevue/button';

const { fetchAllEvents, events, loading, error } = useEvent();
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

onMounted(async () => {
    await fetchAllEvents();
});
</script>

<template>
    <div class="min-h-screen bg-surface-0 dark:bg-surface-900">
        <header class="bg-surface-50 dark:bg-surface-800 shadow-sm mt-14">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">All Events</h1>
                <p class="text-surface-600 dark:text-surface-400 mt-2">Discover amazing concerts and events</p>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-8">
            <!-- Loading state -->
            <div v-if="loading" class="text-center py-8">
                <p class="text-surface-600 dark:text-surface-400">Loading events...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="text-center py-8">
                <p class="text-red-600">{{ error }}</p>
            </div>

            <!-- Events grid -->
            <div v-else-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="event in events" :key="event._id" class="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img :src="event.image" :alt="event.concertTitle" class="w-full h-48 object-cover" />
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">{{ event.concertTitle }}</h3>
                        <p class="text-surface-600 dark:text-surface-400 mb-2">{{ event.organizerName }}</p>
                        <p class="text-surface-600 dark:text-surface-400 mb-4">{{ event.venue }}</p>
                        
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-sm text-surface-500 dark:text-surface-400">
                                {{ new Date(event.calendarValue).toLocaleDateString() }} at {{ event.startTime }}
                            </div>
                            <div class="text-lg font-bold text-primary-600 dark:text-primary-400">
                                From RM{{ event.economyPrice }}
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <Button 
                                label="View Details" 
                                as="router-link" 
                                :to="`/eventdetail/${event._id}`" 
                                outlined 
                                class="flex-1"
                            />
                            <Button 
                                label="Book Now" 
                                as="router-link" 
                                :to="`/booking/${event._id}`" 
                                class="flex-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- No events state -->
            <div v-else class="text-center py-8">
                <p class="text-surface-600 dark:text-surface-400">No events found.</p>
            </div>
        </main>
    </div>
</template>

<style scoped>
.transition-shadow {
    transition: box-shadow 0.3s ease;
}
</style>
