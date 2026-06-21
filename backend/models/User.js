const promisePool = require('../config/db');

// Find a user by email
async function findUserByEmail(email) {
    const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
}

// Insert a new user
async function createUser(username, email, hashedPassword) {
    const [result] = await promisePool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result.insertId;
}

module.exports = {
    findUserByEmail,
    createUser,
};