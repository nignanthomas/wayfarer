import express from 'express';
import Trip from '../controllers/trips';
import User from '../controllers/users';
import Booking from '../controllers/bookings';

const router = express.Router();

// User routes
router.get('/users', User.getAllUsers);
router.get('/users/:userId', User.getOneUser);

// Trips routes
router.post('/trips', Trip.createTrip);
router.get('/trips', Trip.getAllTrips);
router.get('/trips/:tripId', Trip.getOneTrip);
router.patch('/trips/:tripId', Trip.updateTrip);
router.patch('/trips/:tripId/cancel', Trip.cancelTrip);
router.delete('/trips/:tripId', Trip.deleteTrip);

// Bookings routes
router.post('/bookings', Booking.createBooking);
router.get('/bookings', Booking.getAllBookings);
router.get('/bookings/:bookingId', Booking.getOneBooking);
router.patch('/bookings/:bookingId', Booking.updateBooking);
router.delete('/bookings/:bookingId', Booking.deleteBooking);


export default router;
