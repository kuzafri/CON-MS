<script>
import axios from 'axios';

export default {
  name: 'FeaturedEvents',
  
  data() {
    return {
      events: [],
      loading: true,
      error: null
    };
  },

  methods: {
    async fetchFeaturedEvents() {
      try {
        const response = await axios.get('/api/events/featured');
        this.events = response.data;
      } catch (error) {
        console.error('Error fetching featured events:', error);
        this.error = 'Failed to fetch featured events';
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },

  mounted() {
    this.fetchFeaturedEvents();
  }
};
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div v-if="loading" class="col-span-2 bg-surface-100 dark:bg-surface-800 rounded-lg p-4 text-center">
        <p class="text-surface-600 dark:text-surface-400">Loading featured events...</p>
      </div>
  
      <div v-else-if="error" class="col-span-2 bg-surface-100 dark:bg-surface-800 rounded-lg p-4 text-center">
        <p class="text-red-500">{{ error }}</p>
      </div>
  
      <template v-else>
        <router-link 
          v-for="event in events" 
          :key="event._id"
          :to="{ name: 'EventDetail', params: { id: event._id }}"
          class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700"
        >
          <img 
            :src="event.image || '/concert.png'" 
            :alt="event.title"
            class="w-full h-48 object-cover" 
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">
              {{ event.title }}
            </h3>
            <p class="text-surface-600 dark:text-surface-400">DTSP USM</p>
            <div class="flex flex-row mt-4">
              <div class="font-bold">
                <span class="text-sm">Starting from </span>
                RM{{ event.price }}
              </div>
              <div class="bottom-0 right-0 ml-auto">
                <router-link 
                  :to="{ name: 'Booking', params: { id: event._id }}" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  @click.stop
                >
                  Book Now
                </router-link>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-surface-600 dark:text-surface-400">
                {{ formatDate(event.date) }} | {{ event.startTime }}
              </p>
              <p class="text-surface-600 dark:text-surface-400">
                {{ event.genre }}
              </p>
            </div>
          </div>
        </router-link>
  
        <div 
          v-if="events.length === 0" 
          class="col-span-2 bg-surface-100 dark:bg-surface-800 rounded-lg p-4 text-center"
        >
          <p class="text-surface-600 dark:text-surface-400">No featured events available</p>
        </div>
      </template>
    </div>
  </template>
  
