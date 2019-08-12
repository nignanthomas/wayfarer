import tripModel from '../models/tripModel';
import { idValidator } from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';

const createTrip = (req, res) => {
  const { body } = req;
  if (body.origin.toLowerCase() === body.destination.toLowerCase()) {
    return responseError(res, 400, 'The origin and the destination cannot be the same!');
  }
  const foundTrip = tripModel.getAllTrips().find(trip => trip.bus_license_number === body.bus_license_number && trip.trip_date === body.trip_date);
  if (foundTrip) {
    return responseError(res, 403, 'This trip already exists');
  }
  const trip = tripModel.createTrip(body);
  return responseSuccess(res, 201, 'Trip Successfully Created', trip);
};

const getAllTrips = (req, res) => {
  try {
    let trips = tripModel.getAllTrips();
    const { origin } = req.query;
    const { destination } = req.query;
    if (origin) {
      trips = trips.filter(trip => trip.origin.toLowerCase() === origin.toLowerCase());
    }
    if (destination) {
      trips = trips.filter(trip => trip.destination.toLowerCase() === destination.toLowerCase());
    }
    if (!req.user.is_admin) {
      trips = trips.filter(trip => trip.status === 1);
    }
    if (!trips.length) {
      return responseError(res, 404, 'There are no Trips yet!');
    }
    return responseSuccess(res, 200, 'Trips Successfully Fetched', trips);
  } catch (error) {
    return responseError(res, 500, 'Oops! Cannot retrieve trips. :(');
  }
};

const getOneTrip = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  let oneTrip = tripModel.getOneTrip(tripId);
  if (!req.user.is_admin && oneTrip.status === 9) {
    oneTrip = '';
  }
  if (oneTrip) {
    return responseSuccess(res, 200, 'Trip Successfully Fetched', oneTrip);
  }
  return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
};

const updateTrip = (req, res) => {
  const { error } = idValidator(req.params);
  const tripId = parseInt(req.params.id, 10);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const oneTrip = tripModel.getOneTrip(tripId);
  if (oneTrip) {
    const { body } = req;
    const updatedTrip = tripModel.updateTrip(tripId, body);
    return responseSuccess(res, 200, 'Trip Successfully Updated', updatedTrip);
  }
  return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
};

const cancelTrip = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  const oneTrip = tripModel.getOneTrip(tripId);
  const cancelStatus = { status: 9 }; // cancelled trip are assigned the status 9
  if (oneTrip) {
    const cancelledTrip = tripModel.updateTrip(tripId, cancelStatus);
    return responseSuccess(res, 200, 'Trip Successfully Cancelled', cancelledTrip);
  }
  return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
};

const deleteTrip = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The trip ID should be a number');
  }
  const tripId = parseInt(req.params.id, 10);
  const oneTrip = tripModel.getOneTrip(tripId);
  if (oneTrip) {
    tripModel.deleteTrip(tripId);
    return responseSuccess(res, 204, `Trip of id: ${tripId} Successfully Deleted`, {});
  }
  return responseError(res, 404, `Cannot find trip of id: ${tripId}`);
};

module.exports = {
  createTrip,
  getAllTrips,
  getOneTrip,
  updateTrip,
  cancelTrip,
  deleteTrip,
};
