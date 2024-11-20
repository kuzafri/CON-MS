<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref } from 'vue';

const categoriesContainer = ref(null);
let scrollInterval = null;

const startAutoScroll = () => {
    if (!categoriesContainer.value) return;

    scrollInterval = setInterval(() => {
        const container = categoriesContainer.value;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0;
        } else {
            container.scrollLeft += 1;
        }
    }, 30);
};

const stopAutoScroll = () => {
    if (scrollInterval) {
        clearInterval(scrollInterval);
    }
};

onMounted(() => {
    startAutoScroll();
});

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
                                <span to="/">Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#events')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/events">Events</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/ticket">My Ticket</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#pricing')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span to="/favourite">Favourite</span>
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
            <div class="flex-1 max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
                    <div class="col-span-2 bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-6">
                        <h2 class="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Featured Events</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                <img src="/concert.jpeg" alt="Happy Holiday Music Concert" class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Happy Holiday Music Concert Festival Indonesia Region</h3>
                                    <p class="text-surface-600 dark:text-surface-400">The Strokes Band</p>
                                    <div class="flex flex-row mt-4">
                                        <div class="font-bold"><span class="text-sm">Starting from </span>RM450</div>
                                        <Button label="Book Now" to="/" rounded class="bottom-0 right-0 ml-auto"></Button>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                <img src="/concert.png" alt="Suicide Band summer Bali Island" class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Suicide Band summer Bali Island</h3>
                                    <p class="text-surface-600 dark:text-surface-400">Suicide Band</p>
                                    <div class="flex flex-row mt-4">
                                        <div class="font-bold"><span class="text-sm">Starting from </span>RM450</div>
                                        <Button label="Book Now" to="/" rounded class="bottom-0 right-0 ml-auto"></Button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>

<style scoped>

</style>
