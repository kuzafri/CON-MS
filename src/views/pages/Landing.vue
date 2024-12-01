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
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
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
                        <Button label="Login" text as="router-link" to="/auth/login" rounded></Button>
                        <Button label="Register" to="/auth/login" rounded></Button>
                    </div>
                </div>
            </div>

            <div
                id="hero"
                class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
                style="background: linear-gradient(0deg, rgba(34, 54, 233, 0.2), rgba(12, 55, 96, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
            >
                <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                    <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span class="font-light block">Feel the Rhythm</span>Live the Moment</h1>
                    <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Book your ticket with us!</p>
                    <Button label="More Event" as="router-link" to="/" rounded class="!text-xl mt-8 !px-4"></Button>
                </div>
                <div class="flex justify-center md:justify-end">
                    <img src="/concert3.png" alt="Hero Image" class="w-3/12 md:w-auto" />
                </div>
            </div>

            <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                <div class="grid grid-cols-12 gap-4 justify-center">
                    <div class="col-span-12 text-center mt-20 mb-6">
                        <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Our Previous Event</div>
                        <span class="text-muted-color text-2xl">Take my money and give my ticket!</span>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-yellow-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-users !text-2xl text-yellow-700"></i>
                                </div> -->
                                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Taylor Swift</h5>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-yellow-700"></i>
                                    Manila, Philipine</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-cyan-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-palette !text-2xl text-cyan-700"></i>
                                </div> -->
                                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Joji</h5>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-cyan-700"></i>
                                    Penang, Malaysia</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-indigo-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-map !text-2xl text-indigo-700"></i>
                                </div> -->
                                <h5 class="mb-2 text-surface-900 dark:text-surface-0">Dato Siti Nur Haliza</h5>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-indigo-700"></i>
                                    Kuala Lumpur, Malaysia</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(145, 210, 204, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-slate-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-id-card !text-2xl text-slate-700"></i>
                                </div> -->
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">The Beatles</div>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-slate-700"></i>
                                    Expo Hall, Singapore</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(187, 199, 205, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(145, 226, 237, 0.2), rgba(160, 210, 250, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-orange-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-star !text-2xl text-orange-700"></i>
                                </div> -->
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Keshi</div>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-orange-700"></i>
                                    Mexico City, Mexico.</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-pink-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-moon !text-2xl text-pink-700"></i>
                                </div> -->
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Bernadya</div>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-pink-700"></i>
                                    Stadium Nasional, Indonesia</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(187, 199, 205, 0.2), rgba(145, 210, 204, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-teal-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-shopping-cart !text-2xl text-teal-700"></i>
                                </div> -->
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">ASTN</div>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-teal-700"></i>
                                    Melbourne, Australia</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(251, 199, 145, 0.2), rgba(160, 210, 250, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <!-- <div class="flex items-center justify-center bg-blue-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                                    <i class="pi pi-fw pi-globe !text-2xl text-blue-700"></i>
                                </div> -->
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Hijjaz</div>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-blue-700"></i>
                                    London, UK</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg-4 mt-6 lg:mt-0">
                        <div
                            style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))"
                        >
                            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                                <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Cigarette After Sad</div>
                                <span class="text-surface-600 dark:text-surface-200">
                                    <i class="pi pi-fw pi-map-marker !text-2xl text-indigo-700"></i>
                                    Kenya, Africa</span
                                >
                            </div>
                        </div>
                    </div>

                    <div
                        class="col-span-12 mt-20 mb-20 p-2 md:p-20"
                        style="border-radius: 20px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)"
                    >
                        <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                            <div class="text-gray-900 mb-2 text-3xl font-semibold">Manager Sam</div>
                            <span class="text-gray-600 text-2xl">Joji's Music Manager</span>
                            <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">"This is the best Concert Management System I have ever deal with. Smooth flow. Nice interface. Really recommended!"</p>
                            <img src="/joji.webp" class="mt-6 w-24" alt="Company logo" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="highlights" class="py-6 px-6 lg:px-20 mx-0 my-12 lg:mx-20">
                <div class="text-center">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Book Anywhere</div>
                    <span class="text-muted-color text-2xl">Anywhere. Anytime. </span>
                </div>

                <div class="grid grid-cols-12 gap-4 mt-20 pb-2 md:pb-20">
                    <div class="flex justify-center col-span-12 lg:col-span-6 bg-purple-100 p-0 order-1 lg:order-none" style="border-radius: 8px">
                        <img src="/phone_mockup.png" class="w-11/12" alt="mockup mobile" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 my-auto flex flex-col lg:items-end text-center lg:text-right gap-4">
                        <div class="flex items-center justify-center bg-purple-200 self-center lg:self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-mobile !text-4xl text-purple-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Book Through Our System</div>
                        <span class="text-surface-700 dark:text-surface-100 text-2xl leading-normal ml-0 md:ml-2" style="max-width: 650px">Book through our system and enjoy effortless check in. Get up to 30% for next ticket purchase. </span>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4 my-20 pt-2 md:pt-20">
                    <div class="col-span-12 lg:col-span-6 my-auto flex flex-col text-center lg:text-left lg:items-start gap-4">
                        <div class="flex items-center justify-center bg-yellow-200 self-center lg:self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-desktop !text-3xl text-yellow-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Smartphone. Laptop. Anytime. Anywhere</div>
                        <span class="text-surface-700 dark:text-surface-100 text-2xl leading-normal mr-0 md:mr-2" style="max-width: 650px"
                            >Access through our website through your smartphone or even with your working laptop. You now don't have to wait to book.</span
                        >
                    </div>

                    <div class="flex justify-end order-1 sm:order-2 col-span-12 lg:col-span-6 bg-yellow-100 p-0" style="border-radius: 8px">
                        <img src="/demo/images/landing/mockup-desktop.svg" class="w-11/12" alt="mockup" />
                    </div>
                </div>
            </div>

            <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
                <div class="text-center mb-6">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Ticket Pricing</div>
                    <span class="text-muted-color text-2xl">Choose your desire price</span>
                </div>

                <div class="grid grid-cols-12 gap-4 justify-between mt-20 md:mt-0">
                    <div class="col-span-12 lg:col-span-4 p-0 md:p-4">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">Economy</div>
                            <img src="/demo/images/landing/free.svg" class="w-10/12 mx-auto" alt="Economy" />
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">RM145</span>
                                    <!-- <span class="text-surface-600 dark:text-surface-200">per month</span> -->
                                </div>
                                <Button label="Get Started" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Standing</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Near to fence</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-times text-xl text-red-500 mr-2"></i>
                                    <span class="text-xl leading-normal">No refund</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-times text-xl text-red-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Express lane</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">VIP</div>
                            <img src="/demo/images/landing/startup.svg" class="w-10/12 mx-auto" alt="startup" />
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">RM360</span>
                                    <!-- <span class="text-surface-600 dark:text-surface-200">per month</span> -->
                                </div>
                                <Button label="Get Started" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Plastic Seat</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Near to fence</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Refundable</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Express lane Available</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">VVIP</div>
                            <img src="/demo/images/landing/enterprise.svg" class="w-10/12 mx-auto" alt="enterprise" />
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">RM785</span>
                                    <!-- <span class="text-surface-600 dark:text-surface-200">per month</span> -->
                                </div>
                                <Button label="Get Started" class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cushion Seat</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Near to fence</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Refundable</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Express lane Available</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="py-6 px-6 mx-0 mt-20 lg:mx-20">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-2">
                        Concertify
                    </div>

                    <div class="col-span-12 md:col-span-10">
                        <div class="grid grid-cols-12 gap-8 text-center md:text-left">
                            <div class="col-span-12 md:col-span-3">
                                <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Company</h4>
                            </div>

                            <div class="col-span-12 md:col-span-3">
                                <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Resources</h4>
                            </div>

                            <div class="col-span-12 md:col-span-3">
                                <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Community</h4>
                            </div>

                            <div class="col-span-12 md:col-span-3">
                                <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Legal</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
