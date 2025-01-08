const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Improved CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Add any other frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})
.then(() => {
    console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/organizerEvent');

app.use('/api/users', userRoutes);
app.use('/api', eventRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ 
//         status: 'error',
//         message: 'Something went wrong!',
//         error: process.env.NODE_ENV === 'development' ? err.message : {}
//     });
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     console.log(`API is available at http://localhost:${PORT}/api`);
// });