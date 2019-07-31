import express from 'express';
import Trip from '../controllers/trips';

const router = express.Router();

// Trips routes
router.post('/trips', Trip.createTrip);
router.get('/trips', Trip.getAllTrips);
router.get('/trips/:tripId', Trip.getOneTrip);
router.patch('/trips/:tripId', Trip.updateTrip);
router.patch('/trips/:tripId/cancel', Trip.cancelTrip);
router.delete('/trips/:tripId', Trip.deleteTrip);


export default router;
