const mongoose = require('mongoose');

const ConcertBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seatDetails: [{
        seatNumber: String,
        rowLabel: String,
        tier: String,
        price: Number
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ConcertBooking = mongoose.model('ConcertBooking', ConcertBookingSchema);
