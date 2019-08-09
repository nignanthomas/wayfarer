import express from 'express';
import trips from '../controllers/trips';
import users from '../controllers/users';
import bookings from '../controllers/bookings';
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
router.get('/users', passportJWT, isAdmin, users.getAllUsers);
router.get('/users/:id', passportJWT, isAdmin, users.getOneUser);

// Trips routes
router.post('/trips', passportJWT, isAdmin, isValid, trips.createTrip);
router.get('/trips', passportJWT, trips.getAllTrips);
router.get('/trips/:id', passportJWT, trips.getOneTrip);
router.patch('/trips/:id', passportJWT, isAdmin, isValid, trips.updateTrip);
router.patch('/trips/:id/cancel', passportJWT, isAdmin, trips.cancelTrip);
router.delete('/trips/:id', passportJWT, isAdmin, trips.deleteTrip);

// Bookings routes
router.post('/bookings', passportJWT, isValid, bookings.createBooking);
router.get('/bookings', passportJWT, bookings.getAllBookings);
router.get('/bookings/:id', passportJWT, bookings.getOneBooking);
router.patch('/bookings/:id', passportJWT, isValid, bookings.updateBooking);
router.delete('/bookings/:id', passportJWT, bookings.deleteBooking);


export default router;
