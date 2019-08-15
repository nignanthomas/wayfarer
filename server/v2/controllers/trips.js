import tripModel from '../models/tripModel';
import { idValidator } from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';

const createTrip = async (req, res) => {
  const { body } = req;
  if (body.origin.toLowerCase() === body.destination.toLowerCase()) {
    return responseError(res, 400, 'The origin and the destination cannot be the same!');
  }
  try {
    const foundTrip = await tripModel.getRepeatTrip(body.bus_license_number, body.trip_date);
    if (foundTrip) {
      return responseError(res, 409, 'This trip already exists');
    }
    const trip = await tripModel.createTrip(body);
    return responseSuccess(res, 201, 'Trip Successfully Created', trip);
  } catch (err) {
    return responseError(res, 400, err);
  }
};

const getAllTrips = async (req, res) => {
  try {
    let trips = await tripModel.getAllTripsDB();
    const { origin } = req.query;
    const { destination } = req.query;
    if (trips && origin) {
      trips = trips.filter(trip => trip.origin.toLowerCase() === origin.toLowerCase());
    }
    if (trips && destination) {
      trips = trips.filter(trip => trip.destination.toLowerCase() === destination.toLowerCase());
    }
    if (!trips.length) {
      return responseError(res, 404, 'There are no Trips yet!');
    }
    if (req.user && req.user.is_admin) {
      return responseSuccess(res, 200, 'Trips Successfully Fetched', trips);
    }
    trips = trips.filter(trip => trip.status === 'active');
    return responseSuccess(res, 200, 'Trips Successfully Fetched', trips);
  } catch (error) {
    return responseError(res, 500, 'Oops! Cannot retrieve trips. :(');
  }
};

const getOneTrip = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  try {
    const oneTrip = await tripModel.getOneTripDB(tripId);
    if (oneTrip && req.user && req.user.is_admin) {
      return responseSuccess(res, 200, 'Trip Successfully Fetched', oneTrip);
    }
    if (!oneTrip || oneTrip.status === 'cancelled') {
      return responseError(res, 404, 'No Trip Found!');
    }
    return responseSuccess(res, 200, 'Trip Successfully Fetched', oneTrip);
  } catch (err) {
    return responseError(res, 400, err);
  }
};

const updateTrip = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  try {
    const oneTrip = await tripModel.getOneTripDB(tripId);
    const { body } = req;
    if (oneTrip) {
      if (Object.keys(body).length === 0) {
        return responseError(res, 400, 'Nothing has been updated!');
      }
      const cancelledTrip = await tripModel.updateTrip(tripId, body);
      return responseSuccess(res, 200, 'Trip Successfully Cancelled', cancelledTrip);
    }
    return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  } catch (err) {
    return responseError(res, 400, err);
  }
};

const cancelTrip = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  try {
    const oneTrip = await tripModel.getOneTripDB(tripId);
    if (oneTrip) {
      if (oneTrip.status === 'cancelled') {
        responseError(res, 400, 'This trip is already cancelled');
      }
      const cancelledTrip = await tripModel.cancelTrip(tripId);
      return responseSuccess(res, 200, 'Trip Successfully Cancelled', cancelledTrip);
    }
    return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  } catch (err) {
    return responseError(res, 400, err);
  }
};

const deleteTrip = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  try {
    const oneTrip = await tripModel.getOneTripDB(tripId);
    if (oneTrip) {
      const deleted = await tripModel.deleteTripDB(tripId);
      return responseSuccess(res, 204, `Trip of id: ${tripId} Successfully Deleted`, deleted);
    }
    return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
  } catch (err) {
    return responseError(res, 400, err);
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getOneTrip,
  updateTrip,
  cancelTrip,
  deleteTrip,
};
