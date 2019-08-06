import BookingModel from '../models/bookingModel';
import UserModel from '../models/userModel';
import TripModel from '../models/tripModel';
import idValidator from '../helpers/idValidator';
import bookingValidators from '../helpers/bookingValidators';
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
    const { error } = bookingValidators.validateNewBooking(body);
    if (error) {
      return responseError(res, 400, error.details[0].message);
    }
    const booking = BookingModel.book(body);
    return responseSuccess(res, 201, booking);
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
    return responseSuccess(res, 200, formattedBookings);
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} booking object
  */
  getOneBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return responseError(res, 400, 'The trip ID should be a number');
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      const formattedBooking = formatBooking(oneBooking);
      return responseSuccess(res, 200, formattedBooking);
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
      return responseError(res, 400, 'The trip ID should be a number');
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      const { body } = req;
      const errorUpdate = bookingValidators.validateUpdateBooking(body).error;
      if (errorUpdate) {
        return responseError(res, 400, errorUpdate.details[0].message);
      }
      const updatedBooking = BookingModel.updateBooking(bookingId, body);
      const formattedBooking = formatBooking(updatedBooking);
      // return res.status(200).json({ status: 'success', data: { message: 'Booking Updated Successfully!', data: formattedBooking } });
      return responseSuccess(res, 200, formattedBooking);
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
      return responseError(res, 400, 'The trip ID should be a number');
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return responseError(res, 401, 'Unauthorized! You cannot access this booking!');
      }
      BookingModel.deleteBooking(bookingId);
      // return res.send({ status: 'success', data: { message: 'Booking Deleted Successfully!' } });
      return responseSuccess(res, 204, {});
    }
    return responseError(res, 404, `Cannot find booking of id: ${bookingId}`);
  },

};
export default Booking;
