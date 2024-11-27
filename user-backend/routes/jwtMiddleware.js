const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const jwtMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access Denied' });

    console.log("Token received:", token); // Log the token to check if it is correctly received

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: 'Invalid Token' });
    }
};


module.exports = jwtMiddleware;
