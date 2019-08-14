import bookingModel from '../models/bookingModel';
import userModel from '../models/userModel';
import tripModel from '../models/tripModel';
import { idValidator } from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';

const formatBooking = async (data) => {
  const trip = await tripModel.getOneTripDB(data.trip_id);
  const user = await userModel.getOneUserDB(data.user_id);
  const formatted = {
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
  const foundTrip = await tripModel.getOneTripDB(body.trip_id);
  if (!foundTrip || foundTrip.status === 9) {
    return responseError(res, 404, 'Trip Not Found or Cancelled! ');
  }
  const allBookings = await bookingModel.getAllBookingsDB();
  console.log('allBookings', allBookings);
  if (allBookings && allBookings.find(booking => booking.trip_id === body.trip_id && booking.seat_number === body.seat_number)) {
    console.log('booking', booking);
    return responseError(res, 404, 'This seat number is already booked for this trip!');
  }
  const booking = await bookingModel.book(body);
  const formattedBooking = await formatBooking(booking);
  return responseSuccess(res, 201, 'Booking Created Successfully', formattedBooking);
};


const getAllBookings = (req, res) => {
  let bookings = bookingModel.getAllBookings();
  if (!req.user.is_admin) {
    bookings = bookings.filter(booking => booking.user_id === req.user.id);
  }
  if (!bookings.length) {
    return responseError(res, 404, 'Oops! No bookings found!');
  }
  const formattedBookings = [];
  bookings.forEach((booking) => {
    const formattedBooking = formatBooking(booking);
    formattedBookings.push(formattedBooking);
  });
  return responseSuccess(res, 200, 'Bookings Successfully Fetched', formattedBookings);
};


const getOneBooking = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The booking ID should be a number');
  }
  const bookingId = parseInt(req.params.id, 10);
  const oneBooking = bookingModel.getOneBooking(bookingId);
  if (oneBooking) {
    if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
      return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
    }
    const formattedBooking = formatBooking(oneBooking);
    return responseSuccess(res, 200, 'Booking Fetched Successfully', formattedBooking);
  }
  return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
};

const updateBooking = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The booking ID should be a number');
  }
  const bookingId = parseInt(req.params.id, 10);
  const oneBooking = bookingModel.getOneBooking(bookingId);
  if (oneBooking) {
    if (req.user.id !== oneBooking.user_id) {
      return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
    }
    const { body } = req;
    const updatedBooking = bookingModel.updateBooking(bookingId, body);
    const formattedBooking = formatBooking(updatedBooking);
    return responseSuccess(res, 200, 'Booking updated Successfully', formattedBooking);
  }
  return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
};

const deleteBooking = (req, res) => {
  const { error } = idValidator(req.params);
  if (error) {
    return responseError(res, 400, 'The booking ID should be a number');
  }
  const bookingId = parseInt(req.params.id, 10);
  const oneBooking = bookingModel.getOneBooking(bookingId);
  if (oneBooking) {
    if (req.user.id !== oneBooking.user_id) {
      return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
    }
    bookingModel.deleteBooking(bookingId);
    return responseSuccess(res, 204, `Booking of id ${bookingId} Successfully Deleted`, {});
  }
  return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
};

module.exports = {
  createBooking,
  getAllBookings,
  getOneBooking,
  updateBooking,
  deleteBooking,
};
