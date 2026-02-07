// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const carRoutes = require('./routes/carRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// View routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cars', (req, res) => {
    res.render('cars');
});

app.get('/bookings', (req, res) => {
    res.render('bookings');
});

// API routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/cars', carRoutes);

// MongoDB connection and server start
mongoose.set('strictQuery', true);
const MONGO_URL = 'mongodb://127.0.0.1:27017/carRental';

async function startServer() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');
        app.listen(PORT, '127.0.0.1', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();
