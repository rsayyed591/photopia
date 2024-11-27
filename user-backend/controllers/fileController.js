const promisePool = require('../config/db');

async function getUserFiles(req, res) {
    const userId = req.user.id; // From the verified JWT

    try {
        const [files] = await promisePool.query('SELECT * FROM user_files WHERE user_id = ?', [userId]);
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch files' });
    }
}

module.exports = { getUserFiles };
