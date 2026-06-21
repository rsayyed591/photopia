const express = require('express'); 
const multer = require('multer');
const jwtMiddleware = require('./jwtMiddleware');
const promisePool = require('../config/db');
const { getUserFiles } = require('../controllers/fileController');
const router = express.Router();

// Configure multer storage settings
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
    },
});


// Route to get files for the logged-in user
router.get('/api/files', jwtMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from JWT

        // Retrieve the file paths for the authenticated user
        const [files] = await promisePool.query('SELECT file_path, uploaded_at FROM user_files WHERE user_id = ?', [userId]);

        res.status(200).json({ files });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// File upload route
router.post('/api/upload', jwtMiddleware, upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const userId = req.user.id;
        let filePath = req.file.path;

        // Replace backslashes with forward slashes
        filePath = filePath.replace(/\\/g, '/');

        await promisePool.query('INSERT INTO user_files (user_id, file_path) VALUES (?, ?)', [userId, filePath]);

        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
