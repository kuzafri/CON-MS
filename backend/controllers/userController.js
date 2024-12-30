const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Register a new user
const registerUser = async (req, res) => {
    console.log('Received registration request:', req.body);
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        console.log('Attempting to save user:', newUser);
        await newUser.save();
        console.log('User saved successfully');
        res.status(201).json({ message: 'User registered successfully!', redirect: 'auth/login' });
    } catch (err) {
        console.error('Registration error:', err);
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
        res.json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getUsers, registerUser, loginUser };
