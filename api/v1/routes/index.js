import express from 'express';
import Trip from '../controllers/trips';
import User from '../controllers/users';

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


export default router;
