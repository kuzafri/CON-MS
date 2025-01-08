const Event = require('../models/eventModel');

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .select('_id concertTitle calendarValue startTime genre regularPrice image');
        res.json(events);
    } catch (err) {
        console.error('Error:', err);
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

exports.getFeaturedEvents = async (req, res) => {
    try {
      const events = await Event.find({ status: 'featured' });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


module.exports = { getAllEvents, getEventById, getFeaturedEvents };