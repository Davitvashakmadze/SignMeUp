const express = require('express');
const connectDB = require('./config/db'); // Path to your db.js
const app = express();

// Connect to MongoDB
connectDB();

// Middleware and routes setup
app.use(express.json()); // Body parser to parse JSON requests

// Import routes
const authRoutes = require('./routes/auth'); // Path to your auth.js

// Use routes
app.use('/api/auth', authRoutes); // Prefix for auth routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
