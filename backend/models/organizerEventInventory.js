const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Venue Equipments', 'Audio-Visual Equipments', 'Musical Instruments', 'Safety Equipements']
    },
    quantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('EventInventory', inventoryItemSchema);
