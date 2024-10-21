const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: newUser._id, username, email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});




// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            // Return an error if the user does not exist
            return res.status(400).json({ success: false, message: "Invalid credentials (email not found)" });
        }

        // Compare the input password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Return an error if the password does not match
            return res.status(400).json({ success: false, message: "Invalid credentials (password mismatch)" });
        }

        // Successful login, return success response
        return res.status(200).json({ success: true, message: "Login successful", user });
    } catch (error) {
        // Handle any server errors
        console.error("Server error: ", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;

