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
};
export default Trip;
