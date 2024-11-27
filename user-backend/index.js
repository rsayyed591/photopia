const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const fileRoutes = require('./routes/fileRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Express is running!');
});

// Routes
app.use(registerRoute);
app.use(loginRoute);
app.use(fileRoutes); // Include file routes
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
