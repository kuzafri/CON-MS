<script setup>
import { ref } from 'vue'

// Create a complaint type with its own responses
const createComplaint = (description, concert, name, date) => ({
    id: Math.random().toString(36).substr(2, 9), // Unique identifier
    description,
    concert,
    name,
    date,
    responses: ref([]) // Separate responses for each complaint
})

// Create multiple complaints with unique responses
const complaints = [
    createComplaint(
        'Speaker on the right hall is not working properly', 
        'REBEL 3.0', 
        'v*****H', 
        '12/3/2024'
    ),
    createComplaint(
        'Sound quality was poor during the performance', 
        'REBEL 3.0', 
        'j*****K', 
        '12/3/2024'
    ),
    createComplaint(
        'Uncomfortable seating arrangements', 
        'REBEL 3.0', 
        'm*****L', 
        '12/3/2024'
    )
]

// Reactive input for message
const messageInputs = complaints.map(() => ref(''))

// Method to handle submitting a response for a specific complaint
const submitResponse = (complaintIndex) => {
    const messageInput = messageInputs[complaintIndex]
    
    // Only add non-empty responses
    if (messageInput.value.trim()) {
        complaints[complaintIndex].responses.value.push({
            text: messageInput.value,
            timestamp: new Date().toLocaleString()
        })
        
        // Clear the input after submission
        messageInput.value = ''
    }
}
</script>

<template>
    <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Complaints</h1>
        </div>
    <div v-for="(complaint, complaintIndex) in complaints" :key="complaint.id" class="card mb-4">
        <div class="flex justify-between mb-4">
            <div>
                <p class="font-bold text-xl pb-2">{{ complaint.description }}</p>
                <p>Concert: {{ complaint.concert }} </p>
                <p>{{ complaint.name }}</p>
            </div>
            <div>
                <p>{{ complaint.date }}</p>
            </div>
        </div>

        <!-- Response Display Section -->
        <div v-if="complaint.responses.value.length" class="mb-4 space-y-2">
            <div 
                v-for="(response, index) in complaint.responses.value" 
                :key="index" 
                class="bg-gray-100 p-3 rounded"
            >
                <p>{{ response.text }}</p>
                <p class="text-xs text-gray-500 mt-1">
                    Sent at: {{ response.timestamp }}
                </p>
            </div>
        </div>

        <div class="w-full flex gap-4">
            <textarea 
                v-model="messageInputs[complaintIndex].value"
                placeholder="Your Message" 
                class="w-full p-2 border rounded"
                rows="1"
            />
            <Button 
                @click="submitResponse(complaintIndex)"
            >
                Send
            </Button>
        </div>
    </div>
</template>