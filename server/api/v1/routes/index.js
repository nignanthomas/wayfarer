import express from 'express';
import passport from 'passport';
import Trip from '../controllers/trips';
import User from '../controllers/users';
import Booking from '../controllers/bookings';
import SignUp from '../controllers/auth/signup';
import SignIn from '../controllers/auth/signin';
import passportConf from '../passport';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', { session: false });


// SignUp route
router.post('/auth/signup', SignUp.signUp);
// SignIn route
router.post('/auth/signin', SignIn.signIn);

// User routes
router.get('/users', passportJWT, User.getAllUsers);
router.get('/users/:userId', passportJWT, User.getOneUser);

// Trips routes
router.post('/trips', passportJWT, Trip.createTrip);
router.get('/trips', passportJWT, Trip.getAllTrips);
router.get('/trips/:tripId', passportJWT, Trip.getOneTrip);
router.patch('/trips/:tripId', passportJWT, Trip.updateTrip);
router.patch('/trips/:tripId/cancel', passportJWT, Trip.cancelTrip);
router.delete('/trips/:tripId', passportJWT, Trip.deleteTrip);

// Bookings routes
router.post('/bookings', passportJWT, Booking.createBooking);
router.get('/bookings', passportJWT, Booking.getAllBookings);
router.get('/bookings/:bookingId', passportJWT, Booking.getOneBooking);
router.patch('/bookings/:bookingId', passportJWT, Booking.updateBooking);
router.delete('/bookings/:bookingId', passportJWT, Booking.deleteBooking);


export default router;
