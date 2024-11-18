<script>
export default {
    name: 'App'
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4 flex items-center">
                <img src="/logo.png" alt="Tickety" class="h-8 mr-6" />
                <h1 class="text-2xl font-bold">Concertify</h1>
            </div>
        </header>

        <div class="flex-1 max-w-7xl mx-auto px-4 py-8">
            <div class="grid grid-cols-1 gap-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold ">Popular Categories</h2>
                    <div class="overflow-x-auto">
                        <div class="flex gap-8 min-w-max ">
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-music text-2xl mb-2"></i>
                                <span>Ballad</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-theater-masks text-2xl mb-2"></i>
                                <span>RnB</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-basketball-ball text-2xl mb-2"></i>
                                <span>Rock</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-glass-cheers text-2xl mb-2"></i>
                                <span>Indie</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-music text-2xl mb-2"></i>
                                <span>Ballad</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-theater-masks text-2xl mb-2"></i>
                                <span>RnB</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-basketball-ball text-2xl mb-2"></i>
                                <span>Rock</span>
                            </a>
                            <a href="#" class="bg-gray-200 rounded-lg p-4 flex flex-col items-center hover:bg-gray-300">
                                <i class="fas fa-glass-cheers text-2xl mb-2"></i>
                                <span>Indie</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <main class="flex-1 max-w-7xl mx-auto px-4 py-8">
            <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
                <div class="col-span-2 bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">Featured Events</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <a href="#" class="bg-gray-200 rounded-lg overflow-hidden hover:bg-gray-300">
                            <img src="/concert.jpeg" alt="Happy Holiday Music Concert" class="w-full h-48 object-cover" />
                            <div class="p-4">
                                <h3 class="text-lg font-semibold">Happy Holiday Music Concert Festival Indonesia Region</h3>
                                <p class="text-gray-600">The Strokes Band</p>
                            </div>
                        </a>
                        <a href="#" class="bg-gray-200 rounded-lg overflow-hidden hover:bg-gray-300">
                            <img src="/concert.png" alt="Suicide Band summer Bali Island" class="w-full h-48 object-cover" />
                            <div class="p-4">
                                <h3 class="text-lg font-semibold">Suicide Band summer Bali Island</h3>
                                <p class="text-gray-600">Suicide Band</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </main>

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
