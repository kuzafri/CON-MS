const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
    concertTitle: String,
    image: String,
    calendarValue: Date,
    startTime: String,
    endTime: String,
    description: String,
    regularPrice: Number,
    goldPrice: Number,
    platinumPrice: Number,
    paymentType: String,
    eventID: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    organizer: String,
    maxAttendees: Number,
    genre: String
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;