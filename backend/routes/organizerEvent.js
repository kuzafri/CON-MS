const express = require('express');
const router = express.Router();
const eventController = require('../controllers/organizerEvent');

// CRUD Endpoints
router.post('/events', eventController.createEvent);
router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

//Update Status
router.patch('/events/:id', eventController.updateEventStatus);

module.exports = router;