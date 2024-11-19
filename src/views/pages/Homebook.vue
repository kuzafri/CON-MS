<script setup>
import { useLayout } from '@/layout/composables/layout';

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <!-- <div class="min-h-screen bg-gray-100 flex flex-col"> -->
    <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col">
        <header class="bg-surface-0 dark:bg-surface-900 border-b-[1px] border-gray-400 shadow-lg">
            <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <a class="flex items-center" href="#">
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">Concertify</span>
                </a>
                <Button
                    class="lg:!hidden"
                    text
                    severity="secondary"
                    rounded
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                >
                    <i class="pi pi-bars !text-2xl"></i>
                </Button>
                <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
                    <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                        <li>
                            <a @click="smoothScroll('#hero')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#events')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Events</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Highlights</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#pricing')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Pricing</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                            <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                        </button>
                        <Button label="Logout" to="/auth/login" rounded></Button>
                    </div>
                </div>
            </div>
        </header>

        <div>
            <div class="flex-1 max-w-7xl mx-auto px-4 pt-8">
                <div class="grid grid-cols-1 gap-8">
                    <div class="bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-6">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Categories</h2>
                        <div class="overflow-x-auto">
                            <div class="flex gap-8 min-w-max">
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-music text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Ballad</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-theater-masks text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">RnB</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-basketball-ball text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Rock</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-glass-cheers text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Indie</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-music text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Ballad</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-theater-masks text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">RnB</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-basketball-ball text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Rock</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-glass-cheers text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Indie</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-music text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Ballad</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-theater-masks text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">RnB</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-basketball-ball text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Rock</span>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <i class="fas fa-glass-cheers text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                    <span class="text-surface-900 dark:text-surface-0">Indie</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main class="flex-1 max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
                    <div class="col-span-2 bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-6">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Featured Events</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                <img src="/concert.jpeg" alt="Happy Holiday Music Concert" class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Happy Holiday Music Concert Festival Indonesia Region</h3>
                                    <p class="text-surface-600 dark:text-surface-400">The Strokes Band</p>
                                    <Button label="Book Now" to="/" rounded class="relative bottom-0 right-0"></Button>
                                </div>
                            </a>
                            <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                <img src="/concert.png" alt="Suicide Band summer Bali Island" class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Suicide Band summer Bali Island</h3>
                                    <p class="text-surface-600 dark:text-surface-400">Suicide Band</p>
                                    <Button label="Book Now" to="/" rounded></Button>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- <footer class="bg-gray-800 text-white py-6">
            <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <p>&copy; 2023 Tickety. All rights reserved.</p>
                <div class="flex space-x-4">
                    <a href="#" class="hover:text-gray-400">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="hover:text-gray-400">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="hover:text-gray-400">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer> -->
    </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>
