const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: String,
    time: String,
    description: String,
    price: Number,
    type: String,
    eventID: String,
    status: String,
    organiser: String
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;