import bookingModel from '../models/bookingModel';
import userModel from '../models/userModel';
import tripModel from '../models/tripModel';
import { idValidator } from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';
import { response400Error } from '../helpers/response400err';

const formatBooking = async (data) => {
  const trip = await tripModel.getOneTripDB(data.trip_id);
  const user = await userModel.getOneUserDB(data.user_id);
  const formatted = await {
    id: data.id,
    bus_license_number: trip.bus_license_number,
    trip_date: trip.trip_date,
    first_name: user.first_name,
    last_name: user.last_name,
    user_email: user.email,
    seat_number: data.seat_number,
  };
  return formatted;
};

const createBooking = async (req, res) => {
  const { body } = req;
  body.user_id = req.user.id;
  try {
    const foundTrip = await tripModel.getOneTripDB(body.trip_id);
    if (!foundTrip || foundTrip.status === 'cancelled') {
      return responseError(res, 404, 'Trip Not Found or Cancelled! ');
    }
    const allBookings = await bookingModel.getAllBookingsDB();
    if (allBookings && allBookings.find(booking => booking.trip_id === body.trip_id && booking.seat_number === body.seat_number)) {
      return responseError(res, 409, 'This seat number is already booked for this trip!');
    }
    const booking = await bookingModel.book(body);
    const formattedBooking = await formatBooking(booking);
    return responseSuccess(res, 201, 'Booking Created Successfully', formattedBooking);
  } catch (err) {
    return response400Error(res, err);
  }
};


const getAllBookings = async (req, res) => {
  try {
    let bookings = await bookingModel.getAllBookingsDB();
    if (!bookings.length) {
      return responseError(res, 404, 'Oops! No bookings found!');
    }
    if (!req.user.is_admin) {
      bookings = bookings.filter(booking => booking.user_id === req.user.id);
    }
    const formattedBookings = [];
    let booking = '';
    // eslint-disable-next-line no-restricted-syntax
    for (booking of bookings) {
      formattedBookings.push(await formatBooking(booking));
    }
    return responseSuccess(res, 200, 'Bookings Successfully Fetched', formattedBookings);
  } catch (err) {
    return response400Error(res, err);
  }
};


const getOneBooking = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The booking ID should be a number');
  }
  try {
    const bookingId = parseInt(req.params.id, 10);
    const oneBooking = await bookingModel.getOneBookingDB(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      const formattedBooking = await formatBooking(oneBooking);
      return responseSuccess(res, 200, 'Booking Fetched Successfully', formattedBooking);
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  } catch (err) {
    return response400Error(res, err);
  }
};

const updateBooking = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The booking ID should be a number');
  }
  try {
    const bookingId = parseInt(req.params.id, 10);
    const oneBooking = await bookingModel.getOneBookingDB(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      const { body } = req;
      const updatedBooking = await bookingModel.updateBookingDB(bookingId, body);
      const formattedBooking = await formatBooking(updatedBooking);
      return responseSuccess(res, 200, 'Booking updated Successfully', formattedBooking);
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  } catch (err) {
    return response400Error(res, err);
  }
};

const deleteBooking = async (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The booking ID should be a number');
  }
  try {
    const bookingId = parseInt(req.params.id, 10);
    const oneBooking = await bookingModel.getOneBookingDB(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      bookingModel.deleteBookingDB(bookingId);
      return responseSuccess(res, 204, `Booking of id ${bookingId} Successfully Deleted`, {});
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  } catch (err) {
    return response400Error(res, err);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getOneBooking,
  updateBooking,
  deleteBooking,
};
