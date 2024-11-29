<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
                label: 'Registered Users',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                data: [750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750]
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
    const pieValues = [100, 300, 105];

    // Pie chart data
    pieData.value = {
        labels: pieLabels,
        datasets: [
            {
                data: pieValues,
                backgroundColor: pieColors,
                hoverBackgroundColor: pieColors,
                borderWidth: 0
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
const EventRequest = ref({
    id: 'R-KL-58/42',
    title: 'REBEL 3.0: Because of You',
    date: '13th January 2025',
    time: '3:00 PM - 4:00 PM',
    audience: '1500 pax',
    type: 'Paid Entry',
    submittedBy: 'USM Jazz Band'
});

const Organiser = ref({
    name: 'USM Jazz Band',
    id: 'OH461B18UMJSN',
    email: 'usmjazzband@student.usm.my',
    phone: '019-514-0014'
});
</script>

<template>
    <div class="card h-full">
    <div class="space-y-4">
        <div v-for="i in 4" :key="i" class="border border-gray-300 rounded p-4 flex flex-col justify-between h-full">
            <div class="flex justify-between items-center mb-3">
                <div class="mb-4">
                    <p class="text-base font-extrabold">Event ID:</p>
                    <p class="text-sm mb-2">{{ EventRequest.id }}</p>
                    <p class="text-base font-extrabold">Title:</p>
                    <p class="text-sm">{{ EventRequest.title }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <i class="text-sm text-black">👤</i>
                    </div>
                    <p class="text-base font-extrabold">{{ EventRequest.submittedBy }}</p>
                </div>
            </div>

            <div class="flex justify-between text-sm">
                <div class="flex flex-col items-start">
                    <p class="text-base font-extrabold">Date</p>
                    <p>{{ EventRequest.date }}</p>
                </div>
                <div class="flex flex-col items-start">
                    <p class="text-base font-extrabold">Time</p>
                    <p>{{ EventRequest.time }}</p>
                </div>
                <div class="flex flex-col items-start">
                    <p class="text-base font-extrabold">Audience</p>
                    <p>{{ EventRequest.audience }}</p>
                </div>
                <div class="flex flex-col items-start">
                    <p class="text-base font-extrabold">Type</p>
                    <p>{{ EventRequest.type }}</p>
                </div>
                <div class="flex justify-end mt-5">
                    <a href="#" class="text-blue-600 text-base font-extrabold">View &gt;&gt;</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
