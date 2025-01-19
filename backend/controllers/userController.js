const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().maxTimeMS(5000); // Add timeout to the query
        // console.log(users);
        res.json(users);
      } catch (error) {
        console.error('Query error:', error);
      }
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (!role) {
        return res.status(400).json({ message: 'Role is required!' });
    }

    try {
        // Check if role is valid
        if (!['audience', 'organizer', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
            role 
        });
        await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully!',
            redirect: '/auth/login'
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id,
                role: user.role 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response with token and user data
        res.json({ 
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const submitData = async (req, res) => {
    const { concertData } = req.body;
    try {
        const newConcertBooking = new ConcertBooking({
            userId: req.body.userId,
            seatDetails: concertData.selectedSeats,
            totalPrice: concertData.totalPrice,
            eventDate: concertData.eventDate,
            status: 'pending'
        });

        const savedBooking = await newConcertBooking.save();
        
        res.status(201).json({
            success: true,
            message: 'Submitted',
            data: savedBooking
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error',
            error: error.message
        });
    }
};


module.exports = { getUsers, registerUser, loginUser };
