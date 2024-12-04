<script setup>
import { ref } from 'vue';

const feedbackType = ref('');
const feedbackDescription = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');

function submitFeedback() {
    const feedbackData = {
        feedbackType: feedbackType.value,
        feedbackDescription: feedbackDescription.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
    };

    console.log('Feedback submitted:', feedbackData);

    // Here you can add API logic or any action you want upon form submission
    alert('Thank you for your feedback!');
}

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);
</script>

<template>
    <div class="dark:bg-surface-900 min-h-screen flex items-center justify-center py-10">
        <div class="bg-white shadow-md rounded-lg max-w-lg w-full p-8">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Feedback Form</h1>
            <p class="text-gray-600 mb-6">We would love to hear your thoughts, suggestions, concerns, or problems with anything so we can improve!</p>

            <!-- Feedback Type -->
            <div class="mb-4">
                <p class="text-gray-800 font-semibold mb-2">Feedback Type</p>
                <div class="flex space-x-4">
                    <label class="flex items-center">
                        <input type="radio" name="feedbackType" value="Comments" v-model="feedbackType" class="form-radio text-blue-600 focus:ring-blue-400" />
                        <span class="ml-2 text-gray-700">Comments</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="feedbackType" value="Suggestions" v-model="feedbackType" class="form-radio text-blue-600 focus:ring-blue-400" />
                        <span class="ml-2 text-gray-700">Suggestions</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="feedbackType" value="Questions" v-model="feedbackType" class="form-radio text-blue-600 focus:ring-blue-400" />
                        <span class="ml-2 text-gray-700">Questions</span>
                    </label>
                </div>
            </div>

            <!-- Event -->
            <div class="flex flex-wrap gap-2 w-full text-black mb-4">
                <label for="event">Choose Event</label>
                <Select id="select" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One" class="w-full"></Select>
            </div>

            <!-- Feedback Description -->
            <div class="mb-4">
                <label for="feedbackDescription" class="block text-gray-800 font-semibold mb-2">Describe Your Feedback:</label>
                <Textarea
                    id="feedbackDescription"
                    v-model="feedbackDescription"
                    rows="4"
                    class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Write your feedback here..."
                />
            </div>

            <!-- Name -->
            <div class="flex space-x-4 mb-4">
                <div class="w-1/2">
                    <label for="firstName" class="block text-gray-800 font-semibold mb-2">First Name</label>
                    <InputText id="firstName" type="text" v-model="firstName" class="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="First Name" />
                </div>
                <div class="w-1/2">
                    <label for="lastName" class="block text-gray-800 font-semibold mb-2">Last Name</label>
                    <InputText id="lastName" type="text" v-model="lastName" class="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Last Name" />
                </div>
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label for="email" class="block text-gray-800 font-semibold mb-2">E-mail</label>
                <InputText id="email" type="email" v-model="email" class="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="example@example.com" />
            </div>

            <!-- Submit Button -->
            <div class="text-center">
                <button @click="submitFeedback" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select {
    background-color: white;
}
</style>
