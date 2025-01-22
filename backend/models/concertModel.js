const mongoose = require('mongoose');

const ConcertBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    eventDetails: {
        concertTitle: String,
        venue: String,
        date: Date,
        startTime: String,
        organizerId: mongoose.Schema.Types.ObjectId,
        organizerName: String
    },
    seatDetails: [{
        seatId: String,
        seatNumber: String,
        rowLabel: String,
        tier: {
            type: String,
            enum: ['VIP', 'Standard', 'Economy']
        },
        price: Number,
        group: Number
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    }
});

const ConcertBooking = mongoose.model('ConcertBooking', ConcertBookingSchema);

module.exports = ConcertBooking;
