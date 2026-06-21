const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/User');
const router = express.Router();
const jwtMiddleware = require('./jwtMiddleware');

// Register route
router.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please Enter all Fields' });
    }

    try {
        // Check if the user already exists
        const user = await findUserByEmail(email);
        if (user.length > 0) {
            return res.status(400).json({ error: 'User Already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in the database
        const userId = await createUser(username, email, hashedPassword);
        
        // If userId is undefined, log an error and stop
        if (!userId) {
            console.error('Failed to create user, userId is undefined.');
            return res.status(500).json({ error: 'Failed to create user' });
        }

        // Log userId to confirm it's valid
        console.log('Created user with ID:', userId);

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in your .env file');
            return res.status(500).json({ error: 'Server Error, JWT_SECRET is missing' });
        }
        
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
        console.log(req.body); // Log the request body
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/api/change-password', jwtMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Please provide old and new passwords' });
    }

    try {
        const userId = req.user.id; // Extract user ID from token
        const [users] = await promisePool.query('SELECT password FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(oldPassword, users[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await promisePool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
