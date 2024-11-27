const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Signup route
app.post('/signup', async (req, res) => {
    try {
        // Create a new instance of the User model with req.body data
        const user = new User(req.body);

        // Save the user to the database
        await user.save();

        res.send('User added successfully!');
    } catch (error) {
        res.status(400).send('Error saving the user: ' + error.message);
    }
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        console.log('Database connection established...');
        app.listen(3000, () => {
            console.log('Server is successfully listening on port 3000...');
        });
    })
    .catch((error) => {
        console.error('Database cannot be connected:', error.message);
    });
