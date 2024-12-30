<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, ref } from 'vue';

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}

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

const logoSrc = computed(() => (isDarkTheme.value ? '/logo_dark.png' : '/logo_light.png'));
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>
<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="py-4 px-4 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <div class="layout-topbar-logo-container">
                    <a class="flex items-center mx-4 sm:w-1/2" href="#">
                        <img :src="logoSrc" alt="logo" class="sm:w-full sm:h-1/3 md:w-1/4 h-6" />
                    </a>
                </div>
                <!-- <Button
                    class="lg:!hidden"
                    text
                    severity="secondary"
                    rounded
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                >
                    <i class="pi pi-bars !text-2xl"></i>
                </Button> -->
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>

                <Button label="Login" text as="router-link" to="/auth/login" rounded></Button>
                <Button label="Register" text as="router-link" to="/auth/register" rounded></Button>
            </div>

            <div class="hero-section relative flex flex-col items-center justify-center text-center h-[50vh] text-white">
                <h1 class="relative text-4xl md:text-6xl font-thin mb-6 text-white">Discover concert <br class="md:none" />around you.</h1>
                <div class="relative w-full max-w-xl flex items-center gap-4">
                    <div class="mx-auto flex">
                        <input type="text" placeholder="Search for Events Nearby..." class="max-w-xl glass-search w-[50vw] px-6 py-3 text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                        <button class="px-6 py-3 sm:mr-0 left-0 rounded-full">Search</button>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex-1 max-w-7xl mx-auto px-4 pt-8">
                    <div class="grid grid-cols-1 gap-8">
                        <div class="bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-6 border-surface-0">
                            <h2 class="text-3xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Categories</h2>
                            <div ref="categoriesContainer" class="overflow-x-auto scrollbar-hide" @mouseenter="stopAutoScroll" @mouseleave="startAutoScroll">
                                <div class="flex gap-4 md:gap-8 min-w-max pb-4">
                                    <a
                                        v-for="(category, index) in ['Ballad', 'RnB', 'Rock', 'Indie', 'Pop', 'Jazz', 'Classical', 'Electronic', 'K-Pop', 'Hip-Hop', 'Malay Pop', 'Chill', 'Folk', 'Punk', 'Instrumental', 'Afro', 'Classical']"
                                        :key="index"
                                        href="#"
                                        class="bg-surface-100 dark:bg-surface-800 rounded-lg p-3 md:p-4 flex flex-col items-center hover:bg-surface-200 dark:hover:bg-surface-700 min-w-[100px] md:min-w-[120px]"
                                    >
                                        <i class="fas fa-music text-xl md:text-2xl mb-2 text-surface-900 dark:text-surface-0"></i>
                                        <span class="text-sm md:text-base text-surface-900 dark:text-surface-0">{{ category }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1 max-w-7xl mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
                        <div class="col-span-2 bg-surface-0 dark:bg-surface-900 rounded-lg shadow md:p-6 sm:p-3">
                            <h2 class="text-3xl font-semibold mb-4 text-surface-900 dark:text-surface-0">Featured Events</h2>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <img src="/concert.jpeg" alt="Happy Holiday Music Concert" class="w-full h-48 object-cover" />
                                    <div class="p-4">
                                        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">Malam Citra Budaya</h3>
                                        <p class="text-surface-600 dark:text-surface-400">MPP USM</p>
                                        <div class="flex flex-row mt-4">
                                            <div class="font-bold"><span class="text-sm">Starting from </span>RM50</div>
                                            <div class="bottom-0 right-0 ml-auto flex sm:flex-row">
                                                <Button label="See Detail" as="router-link" to="/eventdetail" rounded class="seedetail flex mr-4"></Button>
                                                <Button label="Book Now" as="router-link" to="/booking" rounded></Button>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" class="bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden hover:bg-surface-200 dark:hover:bg-surface-700">
                                    <img src="/concert.png" alt="Suicide Band summer Bali Island" class="w-full h-48 object-cover" />
                                    <div class="p-4">
                                        <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">REBEL 3.0: Because of you</h3>
                                        <p class="text-surface-600 dark:text-surface-400">USM Jazz Band</p>
                                        <div class="flex flex-row mt-4">
                                            <div class="font-bold"><span class="text-sm">Starting from </span>RM80</div>
                                            <div class="bottom-0 right-0 ml-auto">
                                                <Button label="See Detail" as="router-link" to="/eventdetail" rounded class="seedetail mr-4"></Button>
                                                <Button label="Book Now" as="router-link" to="/booking" rounded></Button>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1 max-w-7xl mx-auto px-4">
                    <div class="grid grid-cols-12 gap-4 justify-center">
                        <div class="col-span-12 mt-20">
                            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-3xl">Our Previous Event</div>
                            <!-- <span class="text-muted-color text-xl">Take my money and give my ticket!</span> -->
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-yellow-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-users !text-2xl text-yellow-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Taylor Swift</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-yellow-700"></i>
                                        Thriller Jazz Band</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-cyan-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-palette !text-2xl text-cyan-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Joji</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-cyan-700"></i>
                                        REBEL 2.0 : All The Things She Said
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-indigo-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-map !text-2xl text-indigo-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Dato Siti Nur Haliza</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-indigo-700"></i>
                                        Recovery : Annual Concert</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(145, 210, 204, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-slate-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-id-card !text-2xl text-slate-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">The Beatles</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-slate-700"></i>
                                        Lunch Busk : Eat And Sing</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2), rgba(160, 210, 250, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-orange-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-star !text-2xl text-orange-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Keshi</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-orange-700"></i>
                                        Jeep Jazz Trio</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-pink-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-moon !text-2xl text-pink-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Bernadya</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-pink-700"></i>
                                        Stadium Nasional, Indonesia</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-teal-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-shopping-cart !text-2xl text-teal-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">ASTN</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-teal-700"></i>
                                        After Hours Jam</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <!-- <div class="flex items-center justify-center bg-blue-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-globe !text-2xl text-blue-700"></i>
                                </div> -->
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Hijjaz</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-blue-700"></i>
                                        Music Rewind Jam</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg-4 mt-6 lg:mt-0">
                            <div
                                style="
                                    height: 160px;
                                    padding: 2px;
                                    border-radius: 10px;
                                    background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2));
                                "
                            >
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                    <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Cigarette After Sad</div>
                                    <span class="text-surface-600 dark:text-surface-200">
                                        <i class="pi pi-fw pi-step-forward-alt !text-2xl text-indigo-700"></i>
                                        One Night Romance</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1 max-w-7xl mx-auto px-4 mb-24">
                    <div class="grid grid-cols-12 gap-4 justify-center">
                        <div class="col-span-12 mt-20">
                            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-3xl">Tour Dates</div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-100 dark:bg-surface-800 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">Saturday<br /><span class="mx-2 font-bold text-3xl">03</span><br />June</div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-0 dark:bg-surface-900 border-1 border-surface-800 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Sunday<br /><span class="mx-2 font-bold text-3xl">04</span><br />
                                    June
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-100 dark:bg-surface-800 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Tuesday<br /><span class="mx-2 font-bold text-3xl">09</span><br />
                                    June
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Friday<br /><span class="mx-2 font-bold text-3xl">03</span><br />
                                    April
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-100 dark:bg-surface-800 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Monday<br /><span class="mx-2 font-bold text-3xl">28</span><br />
                                    June
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Saturday<br /><span class="mx-2 font-bold text-3xl">17</span><br />
                                    May
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-100 dark:bg-surface-800 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Monday<br /><span class="mx-2 font-bold text-3xl">16</span><br />
                                    September
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>

                        <div class="col-span-9 md:col-span-6 lg:col-span-3 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0 bg-surface-0 dark:bg-surface-900 rounded-lg shadow p-4">
                            <div class="flex items-center justify-between">
                                <div class="text-surface-900 dark:text-surface-0 font-semibold text-xl text-center">
                                    Saturday<br /><span class="mx-2 font-bold text-3xl">11</span><br />
                                    March
                                </div>
                                <div class="text-surface-600 dark:text-surface-400">DTSP<br />USM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Add smooth scrolling */
.overflow-x-auto {
    scroll-behavior: smooth;
}

.seedetail {
    background-color: rgb(226, 226, 226);
    border-color: rgba(162, 162, 162, 0);
    color: rgb(96, 96, 96);
    /* display: flex; */
}

.hero-section {
    background: linear-gradient(135deg, #61d1bf, #8ac4ff, #eec8ff, #ffc6a3);
    background-size: 200% 200%; /* For a soft transition effect */
    animation: gradient-animation 10s ease infinite; /* Optional animation */
}
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.glass-search {
    background: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
    border: 1px solid rgba(255, 255, 255, 0.4); /* Subtle border for better visibility */
    backdrop-filter: blur(10px); /* Creates the frosted glass effect */
    -webkit-backdrop-filter: blur(10px); /* Safari support */
    border-radius: 50px; /* Rounded corners */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
    color: #fff;
}

/* Premium Gradient Title */
.text-gradient {
    background-clip: text;
    text-fill-color: transparent; /* For cross-browser support */
    font-weight: bold;
    letter-spacing: 1px;
}

/* Hover effect for search button */
button:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
}
</style>
