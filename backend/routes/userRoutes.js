const express = require('express');
const { getUsers, registerUser, loginUser } = require('../controllers/userController');
const { protectRoute, authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', protectRoute(['admin']), getUsers); // Only admin can get all users
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Role-specific routes
router.get('/admin-data', protectRoute(['admin']), (req, res) => {
    res.json({ message: 'Admin data accessed' });
});
router.get('/organizer-data', protectRoute(['organizer']), (req, res) => {
    res.json({ message: 'Organizer data accessed' });
});
router.get('/audience-data', protectRoute(['audience']), (req, res) => {
    res.json({ message: 'Audience data accessed' });
});

module.exports = router;
