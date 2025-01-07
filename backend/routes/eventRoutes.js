const express = require('express');
const router = express.Router();
const { getFeaturedEvents } = require('../controllers/featuredEventController');

router.get('/featured-events', getFeaturedEvents);

module.exports = router;