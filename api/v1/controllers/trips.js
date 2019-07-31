import TripModel from '../models/tripModel';

const Trip = {

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trips array
  */
  getAllTrips(req, res) {
    try {
      const trips = TripModel.getAllTrips();
      if (!trips.length) {
        return res.status(200).json({ status: 'No bookings yet!', data: [] });
      }
      return res.status(200).json({ status: 'success', data: trips });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Oops! Cannot retrieve trips. :(' });
    }
  },

  getOneTrip(req, res) {
    // const tripId = parseInt(req.params.tripId, 10); // Because of uuid.v4 that returns alpha-numeric I can't parseInt yet!
    const { tripId } = req.params;
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      return res.status(200).json({ status: 'success', data: oneTrip });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${tripId}` });
  },
};
export default Trip;
