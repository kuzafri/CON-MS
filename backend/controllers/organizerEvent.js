const Event = require('../models/organizerEvent');

// Create a new event
exports.createEvent = async (req, res) => {
    const {
        concertTitle, calendarValue, startTime, endTime,
        performers, genre, economyPrice, standardPrice, vipPrice, eventPolicies
    } = req.body;

    if (!concertTitle || !calendarValue || !startTime || !endTime || !performers.length || !genre || !economyPrice || !standardPrice || !vipPrice || !eventPolicies) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // No need to compare dates here since frontend already validates this

    try {
        const event = new Event({
            concertTitle,
            calendarValue: new Date(calendarValue),
            startTime,
            endTime,
            performers,
            genre,
            economyPrice,
            standardPrice,
            vipPrice,
            eventPolicies,
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully!', event });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch events.' });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch the event.' });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the event.' });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete the event.' });
    }
};