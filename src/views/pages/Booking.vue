<script>
export default {
    name: 'SeatSelection',
    data() {
        return {
            seatMap: this.generateSeatMap(),
            selectedSeats: [],
            seatPrice: 80
        };
    },
    computed: {
        totalPrice() {
            return this.selectedSeats.length * this.seatPrice;
        }
    },
    methods: {
        generateSeatMap() {
            const sections = [];
            for (let s = 0; s < 3; s++) {
                const rows = [];
                for (let r = 0; r < 5; r++) {
                    const seats = [];
                    const numSeats = 10; // seats per row
                    for (let i = 0; i < numSeats; i++) {
                        seats.push({
                            id: `${s}-${r}-${i}`,
                            isSelected: false,
                            isReserved: Math.random() < 0.2 // 20% chance of being reserved
                        });
                    }
                    rows.push({ seats });
                }
                sections.push({ rows });
            }
            return sections;
        },
        calculateSeatX(sectionIndex, rowIndex, seatIndex) {
            // Implement seat X position calculation based on your layout
            const baseX = 100 + sectionIndex * 200;
            return baseX + seatIndex * 25;
        },
        calculateSeatY(sectionIndex, rowIndex) {
            // Implement seat Y position calculation based on your layout
            return 100 + rowIndex * 30;
        },
        selectSeat(sectionIndex, rowIndex, seatIndex) {
            const seat = this.seatMap[sectionIndex].rows[rowIndex].seats[seatIndex];
            if (seat.isReserved) return;

            seat.isSelected = !seat.isSelected;
            if (seat.isSelected) {
                this.selectedSeats.push({
                    id: seat.id,
                    section: sectionIndex + 1,
                    row: String.fromCharCode(65 + rowIndex),
                    number: seatIndex + 1
                });
            } else {
                const index = this.selectedSeats.findIndex((s) => s.id === seat.id);
                if (index !== -1) {
                    this.selectedSeats.splice(index, 1);
                }
            }
        },
        deselectSeat(seat) {
            const [sectionIndex, rowIndex, seatIndex] = seat.id.split('-').map(Number);
            this.seatMap[sectionIndex].rows[rowIndex].seats[seatIndex].isSelected = false;
            const index = this.selectedSeats.findIndex((s) => s.id === seat.id);
            if (index !== -1) {
                this.selectedSeats.splice(index, 1);
            }
        },
        proceedToCheckout() {
            // Implement checkout logic
            console.log('Proceeding to checkout with seats:', this.selectedSeats);
        }
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex items-center">
                    <img src="/concert.png" alt="CONMs" class="h-8" />
                    <div class="ml-6">
                        <h1 class="text-2xl font-bold">REBEL 3.0: Because of you</h1>
                        <p class="text-gray-600">Wed 2025-01-13 3.00 PM - 4.00 PM</p>
                        <p class="text-gray-600">Dewan Tuanku Syed Putra, USM</p>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Seating Map -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="relative">
                        <!-- SVG Seating Map -->
                        <svg viewBox="0 0 600 500" class="w-full">
                            <!-- Stage -->
                            <rect x="200" y="450" width="200" height="40" class="fill-gray-800" />
                            <text x="300" y="475" text-anchor="middle" class="fill-white">STAGE</text>

                            <!-- Generate seats programmatically -->
                            <g v-for="(section, sectionIndex) in seatMap" :key="sectionIndex">
                                <g v-for="(row, rowIndex) in section.rows" :key="`${sectionIndex}-${rowIndex}`">
                                    <rect
                                        v-for="(seat, seatIndex) in row.seats"
                                        :key="`${sectionIndex}-${rowIndex}-${seatIndex}`"
                                        :x="calculateSeatX(sectionIndex, rowIndex, seatIndex)"
                                        :y="calculateSeatY(sectionIndex, rowIndex)"
                                        width="20"
                                        height="20"
                                        :class="{
                                            'fill-blue-400 cursor-pointer hover:fill-blue-600': !seat.isSelected && !seat.isReserved,
                                            'fill-green-500': seat.isSelected,
                                            'fill-gray-400': seat.isReserved
                                        }"
                                        @click="selectSeat(sectionIndex, rowIndex, seatIndex)"
                                    />
                                </g>
                            </g>
                        </svg>

                        <!-- Legend -->
                        <div class="absolute top-4 right-4 bg-white p-4 rounded shadow">
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-blue-400 mr-2"></div>
                                <span>Available</span>
                            </div>
                            <div class="flex items-center mb-2">
                                <div class="w-4 h-4 bg-green-500 mr-2"></div>
                                <span>Selected</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 bg-gray-400 mr-2"></div>
                                <span>Reserved</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Selected Seats Info -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold mb-4">Selected Seats</h2>
                        <div v-if="selectedSeats.length === 0" class="text-gray-500">No seats selected</div>
                        <div v-else>
                            <div v-for="seat in selectedSeats" :key="seat.id" class="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded">
                                <div>
                                    <span class="font-medium">Section {{ seat.section }}</span>
                                    <span class="text-gray-600"> - Row {{ seat.row }}, Seat {{ seat.number }}</span>
                                </div>
                                <div class="flex items-center">
                                    <span class="font-medium text-blue-600 mr-4">$80</span>
                                    <button @click="deselectSeat(seat)" class="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Total -->
                    <div class="border-t pt-4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-lg font-medium">Total</span>
                            <span class="text-xl font-bold text-blue-600">${{ totalPrice }}</span>
                        </div>
                        <button @click="proceedToCheckout" :disabled="selectedSeats.length === 0" class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>


<style>
.seat {
    transition: fill 0.2s ease;
}
</style>
