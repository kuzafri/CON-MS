<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const pieData = ref(null);
const barData = ref(null);
const pieOptions = ref(null);
const barOptions = ref(null);

onMounted(() => {
    setColorOptions();
});

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Bar chart data and options remain the same
    barData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'hi',
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
                labels: {
                    fontColor: textColor
                }
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

    // Updated pie chart data
    pieData.value = {
        labels: ['Organiser', 'USM', 'Others'],
        datasets: [
            {
                data: [100, 300, 105],
                backgroundColor: ['#4169e1', '#b0c4de', '#ffa07a'],
                hoverBackgroundColor: ['#4169e1', '#b0c4de', '#ffa07a'],
                borderWidth: 0,
            }
        ]
    };

    // Updated pie chart options
    pieOptions.value = {
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 14,
                        weight: 'normal'
                    },
                    generateLabels: function(chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, index) => {
                                const dataset = data.datasets[0];
                                const value = dataset.data[index];
                                return {
                                    text: label,
                                    fillStyle: dataset.backgroundColor[index],
                                    strokeStyle: dataset.backgroundColor[index],
                                    lineWidth: 0,
                                    pointStyle: 'circle',
                                    index: index
                                };
                            });
                        }
                        return [];
                    }
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: false
        },
        // Custom plugins for center text and legend numbers
        plugins: [
            {
                id: 'centerText',
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    const width = chart.width;
                    const height = chart.height;
                    
                    ctx.restore();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    // Calculate total
                    const total = chart.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
                    
                    // Draw "Total Users"
                    ctx.font = '14px sans-serif';
                    ctx.fillStyle = textColor;
                    ctx.fillText('Total Users', width / 2, height / 2 - 15);
                    
                    // Draw total number
                    ctx.font = 'bold 24px sans-serif';
                    ctx.fillText(total.toString(), width / 2, height / 2 + 15);
                    
                    ctx.save();
                }
            },
            {
                id: 'legendNumbers',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    const legendItems = chart.legend.legendItems;
                    const dataset = chart.data.datasets[0];
                    
                    ctx.textAlign = 'center';
                    ctx.font = '14px sans-serif';
                    ctx.fillStyle = textColor;
                    
                    legendItems.forEach((item, i) => {
                        const x = item.x + item.width / 2;
                        const y = item.y + 30; // Position below legend item
                        ctx.fillText(dataset.data[i].toString(), x, y);
                    });
                }
            }
        ]
    };
}

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
);
</script>

<template>
    <Fluid class="grid grid-cols-12 gap-8">
        <div class="col-span-12 xl:col-span-4">
            <div class="card flex flex-col items-center">
                <div class="font-semibold text-xl mb-4">User Demographic</div>
                <div class="w-full max-w-[300px] pb-2">
                    <Chart type="doughnut" :data="pieData" :options="pieOptions"></Chart>
                </div>
            </div>
        </div>
        <div class="col-span-12 xl:col-span-8">
            <div class="card h-[400px]">
                <div class="font-semibold text-xl mb-4">Event Creation Analytics</div>
                <div class="h-[calc(100%-2rem)]">
                    <Chart 
                        type="bar" 
                        :data="barData" 
                        :options="barOptions"
                        class="h-full w-full"
                    ></Chart>
                </div>
            </div>
        </div>
    </Fluid>
</template>