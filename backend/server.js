// const express = require('express');
// const cors = require('cors'); // Import CORS
// const app = express();

// // CORS configuration to allow requests from frontend (localhost:3000)
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   credentials: true, // Allow cookies or credentials
// }));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Your existing routes here
// const authRoutes = require('./routes/auth'); // Example: importing your auth routes
// app.use('/api/auth', authRoutes);

// // Start the server (Ensure you're listening on the right port)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
