const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initial
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const dns = require('dns');
dns.resolve('conms.i2dnl.mongodb.net', (err, records) => {
    console.log('DNS Resolution:', err || records);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  family: 4,
  retryWrites: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Routes (organizer)
const eventRoutes = require('./routes/organizerEvent');
app.use('/api', eventRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});