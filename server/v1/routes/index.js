import express from 'express';
import Trip from '../controllers/trips';
import User from '../controllers/users';
import Booking from '../controllers/bookings';
import SignUp from '../controllers/auth/signup';
import SignIn from '../controllers/auth/signin';
import { passportJWT } from '../middlewares/passportJWT';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();


// SignUp route
router.post('/auth/signup', SignUp.signUp);
// SignIn route
router.post('/auth/signin', SignIn.signIn);

// User routes
router.get('/users', passportJWT, isAdmin, User.getAllUsers);
router.get('/users/:userId', passportJWT, isAdmin, User.getOneUser);

// Trips routes
router.post('/trips', passportJWT, isAdmin, Trip.createTrip);
router.get('/trips', passportJWT, Trip.getAllTrips);
router.get('/trips/:tripId', passportJWT, Trip.getOneTrip);
router.patch('/trips/:tripId', passportJWT, isAdmin, Trip.updateTrip);
router.patch('/trips/:tripId/cancel', passportJWT, isAdmin, Trip.cancelTrip);
router.delete('/trips/:tripId', passportJWT, isAdmin, Trip.deleteTrip);

// Bookings routes
router.post('/bookings', passportJWT, Booking.createBooking);
router.get('/bookings', passportJWT, Booking.getAllBookings);
router.get('/bookings/:bookingId', passportJWT, Booking.getOneBooking);
router.patch('/bookings/:bookingId', passportJWT, Booking.updateBooking);
router.delete('/bookings/:bookingId', passportJWT, Booking.deleteBooking);


export default router;
