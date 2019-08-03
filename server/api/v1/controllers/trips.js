import TripModel from '../models/tripModel';
import tripValidators from '../helpers/tripValidators';
import idValidator from '../helpers/idValidator';

const Trip = {
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trip object
  */
  createTrip(req, res) {
    const { body } = req;
    const { error } = tripValidators.validateNewTrip(body);
    if (error) {
      return res.status(400).json({ status: 'error', error: error.details[0].message });
    }
    if (!req.user.is_admin) {
      return res.status(400).json({ status: 'error', error: 'Unauthorized! Only admin can create a trip!' });
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
    // const { tripId } = req.params;
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
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
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
    if (!req.user.is_admin) {
      return res.status(400).json({ status: 'error', error: 'Unauthorized! Only admin can cancel a trip!' });
    }
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      const { body } = req;
      const errorUpdate = tripValidators.validateUpdateTrip(body).error;
      if (errorUpdate) {
        return res.status(400).json({ status: 'error', error: errorUpdate.details[0].message });
      }
      const updatedTrip = TripModel.updateTrip(tripId, body);
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
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
    if (!req.user.is_admin) {
      return res.status(400).json({ status: 'error', error: 'Unauthorized! Only admin can cancel a trip!' });
    }
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
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
    if (!req.user.is_admin) {
      return res.status(400).json({ status: 'error', error: 'Unauthorized! Only admin can cancel a trip!' });
    }
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
