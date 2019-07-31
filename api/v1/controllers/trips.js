import TripModel from '../models/tripModel';

const Trip = {
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trip object
  */
  createTrip(req, res) {
    const { body } = req;
    // eslint-disable-next-line max-len
    if (!body.seating_capacity || !body.bus_license_number || !body.origin || !body.destination || !body.trip_date || !body.fare) {
      return res.status(400).json({ status: 'error', error: 'Bad Request! All trip fields are required!' });
    }
    const trip = TripModel.createTrip(body);
    return res.status(201).json({ status: 'success', data: trip });
  },
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trips array
  */
  getAllTrips(req, res) {
    try {
      const trips = TripModel.getAllTrips();
      if (!trips.length) {
        return res.status(200).json({ status: 'No Trips yet!', data: [] });
      }
      return res.status(200).json({ status: 'success', data: trips });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Oops! Cannot retrieve trips. :(' });
    }
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trip object
  */
  getOneTrip(req, res) {
    // eslint-disable-next-line max-len
    const tripId = parseInt(req.params.tripId, 10); // Because of uuid.v4 that returns alpha-numeric I can't parseInt yet!
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      return res.status(200).json({ status: 'success', data: oneTrip });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find trip of id: ${tripId}` });
  },
};
export default Trip;
