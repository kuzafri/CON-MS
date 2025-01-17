<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useRouter } from 'vue-router';
const router = useRouter();

import axios from 'axios';

// Register the required Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

// Define the plugin specifically for donut chart
const donutCenterPlugin = {
    id: 'donutCenter',
    afterDraw(chart, args, options) {
        // Only apply to donut chart
        if (chart.config.type !== 'doughnut') return;

        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        const total = chart.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
        
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw total count
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = textColor;
        ctx.fillText(total.toString(), centerX, centerY + 10);

        // Draw "Total Users"
        ctx.font = '12px Arial';
        ctx.fillStyle = textColorSecondary;
        ctx.fillText('Total Users', centerX, centerY - 10);

        ctx.restore();
    }
};

// Register the custom plugin
ChartJS.register(donutCenterPlugin);

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const pieData = ref(null);
const barData = ref(null);
const pieOptions = ref(null);
const barOptions = ref(null);
const legendData = ref([]);

function updateLegendData(data, labels, colors) {
    legendData.value = labels.map((label, index) => ({
        label,
        value: data[index],
        color: colors[index]
    }));
}

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    barData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Events Created',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                data: [750, 550, 350, 250, 750, 950, 450, 550, 750, 750, 250, 150]
            }
        ]
    };

    barOptions.value = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    const pieColors = ['#4169e1', '#b0c4de', '#ffa07a'];
    const pieLabels = ['Organiser', 'USM', 'Others'];
    const pieValues = [150, 500, 205];

    // Pie chart data
    pieData.value = {
        labels: pieLabels,
        datasets: [
            {
                data: pieValues,
                backgroundColor: pieColors,
                hoverBackgroundColor: pieColors,
                borderWidth: 0,
            }
        ]
    };

    // Update legend data
    updateLegendData(pieValues, pieLabels, pieColors);

    // Pie chart options
    pieOptions.value = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        animation: {
            animateRotate: true,
            animateScale: false
        }
    };
}

onMounted(() => {
    setColorOptions();
});

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
);

// Event Creation Request Data
const eventRequests = ref([]);
const sortBy = ref('today');

// Fetch event requests
const fetchEventRequests = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/events');
        eventRequests.value = response.data;
    } catch (error) {
        console.error('Error fetching event requests:', error);
    }
};

const handleViewDetails = (event) => {
    const ticketRates = [
        {
            type: 'VIP',
            price: `RM ${event.platinumPrice}`,
            seats: '250 seat(s)',
            color: 'bg-gray-200'
        },
        {
            type: 'Standard',
            price: `RM ${event.goldPrice}`,
            seats: '500 seat(s)',
            color: 'bg-yellow-400'
        },
        {
            type: 'Economy',
            price: `RM ${event.regularPrice}`,
            seats: '750 seat(s)',
            color: 'bg-blue-500'
        }
    ];

    router.push({
        name: 'EventsDetails',
        params: {
            id: event._id
        },
        query: {
            title: event.concertTitle,
            date: new Date(event.calendarValue).toLocaleDateString(),
            time: `${event.startTime} - ${event.endTime}`,
            audience: `${event.maxAttendees} pax`,
            status: event.status,
            type: event.paymentType || 'Paid Entry',
            submittedBy: event.organizer,
            ticketRates: JSON.stringify(ticketRates)
        }
    });
}

// Handle sort change
const handleSortChange = (event) => {
    sortBy.value = event.target.value;
};

// Organiser Details
const organisers = ref([]);

const fetchOrganisers = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/users');
        organisers.value = response.data
            .filter(user => 
                user.role?.toLowerCase() === 'organizer' || 
                user.role?.toLowerCase() === 'organiser'
            )
            .map(user => ({
                ...user,
                contact: user.contact || '012-3456789' 
            }));
    } catch (error) {
        console.error('Error fetching organisers:', error);
    }
};

const handleViewRequestOrganiser = (organiser) => {
    router.push({
        name: 'OrganiserDetails',
        params: { 
            id: organiser._id
        },
        query: {
            name: organiser.name,
            email: organiser.email,
            phone: organiser.contact || '012-3456789',
            // Including additional details that match OrganiserDetails.vue's expectations
            department: "School of Arts", // Default value
            role: "Student Organisation", // Default value
            joinDate: new Date(organiser.createdAt).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });
};

onMounted(() => {
    fetchEventRequests();
    fetchOrganisers();
});
</script>

<template>
    <div>
        <!-- Title -->
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Dashboard</h1>
            <div>
                <label for="sortBy" class="mr-2 text-sm font-semibold">Sort By:</label>
                <select id="sortBy" class="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
            </div>
        </div>

        <!-- Graph Section -->
        <Fluid class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-4">
                <div class="card flex flex-col items-center">
                    <div class="font-semibold text-xl mb-4">User Demographic</div>
                    <div class="w-full max-w-[150px] pb-2">
                        <Chart type="doughnut" :data="pieData" :options="pieOptions" class="relative"></Chart>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mt-4 text-center">
                        <div v-for="(label, index) in pieData.labels" :key="index" class="flex flex-col items-center">
                            <span class="text-sm font-semibold" :style="{ color: pieData.datasets[0].backgroundColor[index] }">{{ label }}</span>
                            <span class="text-sm font-normal">{{ pieData.datasets[0].data[index] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 xl:col-span-8">
                <div class="card h-[300px]">
                    <div class="font-semibold text-xl mb-4">Event Creation Analytics</div>
                    <div class="h-[calc(100%-2rem)]">
                        <Chart type="bar" :data="barData" :options="barOptions" class="h-full w-full"></Chart>
                    </div>
                </div>
            </div>

            <!-- Event Creation Request Section -->
            <div class="col-span-12 xl:col-span-6">
                <div class="card h-full">
                    <!-- Header Section -->
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="font-semibold text-lg">Event Creation Request</h2>
                        <select 
                            v-model="sortBy"
                            @change="handleSortChange"
                            class="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                            <option value="today">Sort By: Today</option>
                            <option value="week">Sort By: This Week</option>
                            <option value="month">Sort By: This Month</option>
                        </select>
                    </div>

                    <!-- Event Request Cards -->
                    <div class="space-y-4">
                        <div
                            v-for="event in eventRequests"
                            :key="event._id"
                            class="border border-gray-300 rounded p-4 flex flex-col justify-between h-full"
                        >
                            <div class="flex justify-between items-center mb-3">
                                <div class="mb-4">
                                    <p class="text-sm font-semibold">Event ID:</p>
                                    <p class="text-sm mb-2">{{ event._id }}</p>
                                    <p class="text-sm font-semibold">Title:</p>
                                    <p class="text-sm">{{ event.concertTitle }}</p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                        <i class="text-sm text-black">👤</i>
                                    </div>
                                    <p class="text-sm font-semibold">{{ event.organizer }}</p>
                                </div>
                            </div>

                            <div class="flex justify-between text-sm">
                                <div class="flex flex-col items-start">
                                    <p class="font-semibold">Date</p>
                                    <p>{{ new Date(event.calendarValue).toLocaleDateString() }}</p>
                                </div>
                                <div class="flex flex-col items-start">
                                    <p class="font-semibold">Time</p>
                                    <p>{{ event.startTime }} - {{ event.endTime }}</p>
                                </div>
                                <div class="flex flex-col items-start">
                                    <p class="font-semibold">Audience</p>
                                    <p>{{ event.maxAttendees }} pax</p>
                                </div>
                                <div class="flex flex-col items-start">
                                    <p class="font-semibold">Type</p>
                                    <p>{{ event.genre }}</p>
                                </div>
                                <div class="flex justify-end mt-5">
                                    <button
                                        class="text-blue-600 text-sm font-semibold cursor-pointer"
                                        @click="handleViewDetails(event)"
                                    >
                                        View >>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Registered Organisers Section -->
            <div class="col-span-12 xl:col-span-6">
                <div class="card h-full">
                    <!-- Header Section -->
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="font-semibold text-lg">Registered Organisers</h2>
                        <select class="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option value="today">Sort By: Today</option>
                            <option value="week">Sort By: This Week</option>
                            <option value="month">Sort By: This Month</option>
                        </select>
                    </div>

                    <!-- Organisers Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            v-for="organiser in organisers"
                            :key="organiser._id"
                            class="border border-gray-300 rounded p-4 flex flex-col justify-between"
                        >
                            <!-- Organiser Details -->
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <i class="text-gray-600 text-2xl">👤</i>
                                </div>
                                <div>
                                    <p class="text-lg font-bold">{{ organiser.name }}</p>
                                    <p class="text-sm text-gray-400">{{ organiser._id }}</p>
                                </div>
                            </div>
                            <div class="text-sm mt-4">
                                <p>{{ organiser.email }}</p>
                                <div class="flex justify-between items-center">
                                    <p>{{ organiser.contact || 'N/A' }}</p>
                                    <button 
                                        @click="handleViewRequestOrganiser(organiser)"
                                        type="button"
                                        class="text-blue-600 text-sm font-semibold cursor-pointer hover:text-blue-800"
                                    >
                                        View >>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fluid>
    </div>
</template>