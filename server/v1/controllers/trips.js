import TripModel from '../models/tripModel';
import tripValidators from '../helpers/tripValidators';
import idValidator from '../helpers/idValidator';
import responseHelpers from '../helpers/responseHelpers';

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
      return responseHelpers.responseError(res, 400, error.details[0].message);
    }
    if (!req.user.is_admin) {
      return responseHelpers.responseError(res, 400, 'Unauthorized! Only admin can create a trip!');
    }
    const trip = TripModel.createTrip(body);
    return responseHelpers.responseSuccess(res, 201, trip);
  },
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trips array
  */
  getAllTrips(req, res) {
    try {
      let trips = TripModel.getAllTrips();
      const { origin } = req.query;
      const { destination } = req.query;
      if (origin) {
        trips = trips.filter(trip => trip.origin.toLowerCase() === origin.toLowerCase());
      }
      if (destination) {
        trips = trips.filter(trip => trip.destination.toLowerCase() === destination.toLowerCase());
      }
      if (!trips.length) {
        return responseHelpers.responseError(res, 404, 'There are no Trips yet!');
      }
      return responseHelpers.responseSuccess(res, 200, trips);
    } catch (error) {
      return responseHelpers.responseError(res, 500, 'Oops! Cannot retrieve trips. :(');
    }
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} trip object
  */
  getOneTrip(req, res) {
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return responseHelpers.responseError(res, 400, 'The trip ID should be a number');
    }
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      return responseHelpers.responseSuccess(res, 200, oneTrip);
    }
    return responseHelpers.responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} updated trip object
  */
  updateTrip(req, res) {
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return responseHelpers.responseError(res, 400, 'The trip ID should be a number');
    }
    if (!req.user.is_admin) {
      return responseHelpers.responseError(res, 401, 'Unauthorized! Only admin can update a trip!');
    }
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      const { body } = req;
      const errorUpdate = tripValidators.validateUpdateTrip(body).error;
      if (errorUpdate) {
        return responseHelpers.responseError(res, 400, errorUpdate.details[0].message);
      }
      const updatedTrip = TripModel.updateTrip(tripId, body);
      // return res.status(200).json({ status: 'success', data: { message: 'Trip Updated Successfully!', data: updatedTrip } });
      return responseHelpers.responseSuccess(res, 200, updatedTrip);
    }
    return responseHelpers.responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} cancelled trip object
  */
  cancelTrip(req, res) {
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return responseHelpers.responseError(res, 400, 'The trip ID should be a number');
    }
    if (!req.user.is_admin) {
      return responseHelpers.responseError(res, 401, 'Unauthorized! Only admin can cancel a trip!');
    }
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    const cancelStatus = { status: 9 }; // cancelled trip are assigned the status 9
    if (oneTrip) {
      const cancelledTrip = TripModel.updateTrip(tripId, cancelStatus);
      // return res.status(200).json({ status: 'success', data: { message: 'Trip Cancelled Successfully!', data: cancelledTrip } });
      return responseHelpers.responseSuccess(res, 200, cancelledTrip);
    }
    return responseHelpers.responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {messgae} message Trip deleted
  */
  deleteTrip(req, res) {
    const { error } = idValidator.tripIdValidator(req.params);
    if (error) {
      return responseHelpers.responseError(res, 400, 'The trip ID should be a number');
    }
    if (!req.user.is_admin) {
      return responseHelpers.responseError(res, 401, 'Unauthorized! Only admin can cancel a trip!');
    }
    const tripId = parseInt(req.params.tripId, 10);
    const oneTrip = TripModel.getOneTrip(tripId);
    if (oneTrip) {
      TripModel.deleteTrip(tripId);
      // return res.send({ status: 'success', data: { message: 'Trip Deleted Successfully!' } });
      return responseHelpers.responseSuccess(res, 204, {});
    }
    return responseHelpers.responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  },
};
export default Trip;
