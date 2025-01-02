const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    concertTitle: { type: String, required: true },
    calendarValue: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    performers: { type: [String], required: true },
    genre: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    goldPrice: { type: Number, required: true },
    platinumPrice: { type: Number, required: true },
    eventPolicies: { type: String, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
