import express from 'express';
import trips from '../controllers/trips';
import User from '../controllers/users';
import Booking from '../controllers/bookings';
import { signUp } from '../controllers/auth/signup';
import { signIn } from '../controllers/auth/signin';
import { passportJWT } from '../middlewares/passportJWT';
import isValid from '../middlewares/validationMiddleware';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();


// SignUp route
router.post('/auth/signup', isValid, signUp);
// SignIn route
router.post('/auth/signin', isValid, signIn);

// User routes
router.get('/users', passportJWT, isAdmin, User.getAllUsers);
router.get('/users/:userId', passportJWT, isAdmin, User.getOneUser);

// Trips routes
router.post('/trips', passportJWT, isAdmin, isValid, trips.createTrip);
router.get('/trips', passportJWT, trips.getAllTrips);
router.get('/trips/:tripId', passportJWT, trips.getOneTrip);
router.patch('/trips/:tripId', passportJWT, isAdmin, isValid, trips.updateTrip);
router.patch('/trips/:tripId/cancel', passportJWT, isAdmin, trips.cancelTrip);
router.delete('/trips/:tripId', passportJWT, isAdmin, trips.deleteTrip);

// Bookings routes
router.post('/bookings', passportJWT, isValid, Booking.createBooking);
router.get('/bookings', passportJWT, Booking.getAllBookings);
router.get('/bookings/:bookingId', passportJWT, Booking.getOneBooking);
router.patch('/bookings/:bookingId', passportJWT, isValid, Booking.updateBooking);
router.delete('/bookings/:bookingId', passportJWT, Booking.deleteBooking);


export default router;
