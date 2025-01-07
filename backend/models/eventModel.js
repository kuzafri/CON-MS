const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: Date,
    description: String,
    venue: String,
    price: Number,
    openingTime: String,
    artistCount: Number,
    rundown: [{
        artist: String,
        country: String,
        time: String
    }]
});

module.exports = mongoose.model('Event', eventSchema);
