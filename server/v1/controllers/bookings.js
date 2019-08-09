import BookingModel from '../models/bookingModel';
import UserModel from '../models/userModel';
import TripModel from '../models/tripModel';
import idValidator from '../helpers/idValidator';
import { responseSuccess, responseError } from '../helpers/responseHelpers';

/**
*
* @param {object} data
* @returns {object} formatted booking object
*/
const formatBooking = (data) => {
  const formatted = {
    id: data.id,
    bus_license_number: TripModel.getOneTrip(data.trip_id).bus_license_number,
    trip_date: TripModel.getOneTrip(data.user_id).trip_date,
    first_name: UserModel.getOneUser(data.user_id).first_name,
    last_name: UserModel.getOneUser(data.user_id).last_name,
    user_email: UserModel.getOneUser(data.user_id).email,
    seat_number: data.seat_number,
  };
  return formatted;
};

const Booking = {
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} booking object
  */
  createBooking(req, res) {
    const { body } = req;
    body.user_id = req.user.id;
    const foundTrip = TripModel.getOneTrip(body.trip_id);
    if (!foundTrip || foundTrip.status === 9) {
      return responseError(res, 404, 'Trip Not Found or Cancelled! ');
    }
    if (TripModel.getAllTrips().find(trip => trip.seat_number === body.seat_number)) {
      return responseError(res, 404, 'This seat number is already booked for this trip!');
    }
    const booking = BookingModel.book(body);
    return responseSuccess(res, 201, 'Booking Created Successfully', booking);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} bookings array
  */
  getAllBookings(req, res) {
    let bookings = BookingModel.getAllBookings();
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
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} booking object
  */
  getOneBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return responseError(res, 400, 'The booking ID should be a number');
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      const formattedBooking = formatBooking(oneBooking);
      return responseSuccess(res, 200, 'Booking Fetched Successfully', formattedBooking);
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} updated booking object
  */
  updateBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return responseError(res, 400, 'The booking ID should be a number');
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      const { body } = req;
      const updatedBooking = BookingModel.updateBooking(bookingId, body);
      const formattedBooking = formatBooking(updatedBooking);
      return responseSuccess(res, 200, 'Booking updated Successfully', formattedBooking);
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {messgae} message Booking deleted
  */
  deleteBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return responseError(res, 400, 'The booking ID should be a number');
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      BookingModel.deleteBooking(bookingId);
      return responseSuccess(res, 204, `Booking of id ${bookingId} Successfully Deleted`, {});
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  },

};
export default Booking;
