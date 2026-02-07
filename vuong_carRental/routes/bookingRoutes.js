const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Routes for bookings
router.route('/')
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking);

// Routes for individual booking by ID
router.route('/:bookingId')
    .put(bookingController.updateBooking)
    .delete(bookingController.deleteBooking);

module.exports = router;
