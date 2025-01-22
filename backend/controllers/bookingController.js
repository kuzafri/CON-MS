const ConcertBooking = require('../models/concertModel');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const {
            eventId,
            eventDetails,
            seats,
            totalPrice,
        } = req.body;

        const newBooking = new ConcertBooking({
            userId: req.user.id, // From auth middleware
            eventId,
            eventDetails,
            seatDetails: seats.map(seat => ({
                seatId: seat.seatId,
                seatNumber: seat.seatNumber,
                rowLabel: seat.rowLabel,
                tier: seat.tier,
                price: seat.price,
                group: seat.group
            })),
            totalPrice,
            bookingDate: new Date(),
            status: 'pending',
            paymentStatus: 'pending'
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            bookingId: savedBooking._id,
            message: 'Booking created successfully'
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message
        });
    }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await ConcertBooking.find({ userId: req.user.id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await ConcertBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        
        // Check if the booking belongs to the requesting user
        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this booking'
            });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const booking = await ConcertBooking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if the booking belongs to the requesting user
        if (booking.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this booking'
            });
        }

        // Update both status fields
        booking.status = status;
        booking.paymentStatus = paymentStatus;
        await booking.save();

        res.json({
            success: true,
            message: 'Booking status updated successfully',
            booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update booking status',
            error: error.message
        });
    }
}; 