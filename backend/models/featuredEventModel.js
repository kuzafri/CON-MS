const mongoose = require('mongoose');

const featuredEventSchema = new mongoose.Schema({
    title: String,
    venue: String,
    image: String,
    price: Number,
    isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('FeaturedEvent', featuredEventSchema);
