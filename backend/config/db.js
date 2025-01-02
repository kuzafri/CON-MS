const mongoose = require('mongoose');

// Connection options
const options = {
  serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
  socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
  family: 4                       // Use IPv4, skip trying IPv6
};

// Connect with options and proper error handling
mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});