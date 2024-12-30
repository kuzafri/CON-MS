const express = require('express');
const { getUsers, registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// New endpoint to test the connection
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Existing endpoint
router.get('/', getUsers);

// New endpoint for user registration
router.post('/register', registerUser);

// New endpoint for user login
router.post('/login', loginUser);

module.exports = router;
