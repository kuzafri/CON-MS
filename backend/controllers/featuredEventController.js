const Event = require('../models/eventModel');

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