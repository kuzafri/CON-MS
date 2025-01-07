const Event = require('../models/eventModel');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getFeaturedEvents = async (req, res) => {
    try {
        const events = await Event.aggregate([
            { $sample: { size: 2 } }
        ]);
        console.log('Found events:', events); // Debug log
        res.json(events);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllEvents, getEventById };
