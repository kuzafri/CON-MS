const express = require('express');
const { getUsers, registerUser, loginUser } = require('../controllers/userController');
const { protectRoute } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/test', (req, res) => {
    res.json({ message: 'API works' });
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);

// Protected routes
// Comment these out for now until you have the controllers ready
/*
router.get('/admin-data', protectRoute(['admin']), adminController.getData);
router.get('/organizer-data', protectRoute(['organizer']), organizerController.getData);
router.get('/audience-data', protectRoute(['audience']), audienceController.getData);
*/

module.exports = router;
