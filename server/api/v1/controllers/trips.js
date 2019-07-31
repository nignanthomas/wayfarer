import TripModel from '../models/tripModel';
import tripValidation from '../helpers/tripValidators';

const Trip = {
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trip object
  */
  createTrip(req, res) {
    const { body } = req;
    // eslint-disable-next-line max-len
    // if (!body.seating_capacity || !body.bus_license_number || !body.origin || !body.destination || !body.fare) {
    //   return res.status(400).json({ status: 'error', error: 'Bad Request! All trip fields are required!' });
    // }
    const { error } = tripValidation.validateNewTrip(body);
    if (error) {
      return res.status(400).json({ status: 'error', error: error.details[0].message });
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
        return res.status(404).json({ status: 'No Trips yet!', data: [] });
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
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      return res.status(200).json({ status: 'success', data: oneTrip });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find trip of id: ${tripId}` });
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} updated trip object
  */
  updateTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      const updatedTrip = TripModel.updateTrip(tripId, req.body);
      return res.status(200).json({ status: 'success', data: { message: 'Trip Updated Successfully!', data: updatedTrip } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find trip of id: ${tripId}` });
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} cancelled trip object
  */
  cancelTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    const cancelStatus = { status: 9 }; // cancelled trip are assigned the status 9
    if (oneTrip) {
      const cancelledTrip = TripModel.updateTrip(tripId, cancelStatus);
      return res.status(200).json({ status: 'success', data: { message: 'Trip Cancelled Successfully!', data: cancelledTrip } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find trip of id: ${tripId}` });
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {messgae} message Trip deleted
  */
  deleteTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      TripModel.deleteTrip(tripId);
      return res.send({ status: 'success', data: { message: 'Trip Deleted Successfully!' } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find trip of id: ${tripId}` });
  },
};
export default Trip;
