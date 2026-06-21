const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const promisePool = require('../config/db');
const router = express.Router();

// Login route
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please Enter all Fields" });
    }

    try {
        // Check if JWT_SECRET is loaded correctly
        console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Debugging line

        const [user] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (user.length === 0) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        // Check if JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in your .env file');
            return res.status(500).json({ error: 'Server Error, JWT_SECRET is missing' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router;
