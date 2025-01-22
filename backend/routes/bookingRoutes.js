const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', authenticate, bookingController.createBooking);

// Get user's bookings
router.get('/user', authenticate, bookingController.getUserBookings);

// Get booking by ID
router.get('/:id', authenticate, bookingController.getBookingById);

// Update booking status
router.patch('/:id/status', authenticate, bookingController.updateBookingStatus);

module.exports = router; 