import BookingModel from '../models/bookingModel';
import UserModel from '../models/userModel';
import TripModel from '../models/tripModel';
import idValidator from '../helpers/idValidator';
import bookingValidators from '../helpers/bookingValidators';

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
      return res.status(400).json({ status: 'error', error: error.details[0].message });
    }
    const booking = BookingModel.book(body);
    return res.status(201).json({ status: 'success', data: booking });
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
      return res.status(404).json({ status: 'Oops! No bookings found!', data: [] });
    }
    const formattedBookings = [];
    bookings.forEach((booking) => {
      const formattedBooking = formatBooking(booking);
      formattedBookings.push(formattedBooking);
    });
    return res.status(200).json({ status: 'success', data: formattedBookings });
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} booking object
  */
  getOneBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return res.status(400).json({ status: 'error', error: 'This booking is not yours! You cannot access it!' });
      }
      const formattedBooking = formatBooking(oneBooking);
      return res.status(200).json({ status: 'success', data: formattedBooking });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${bookingId}` });
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} updated booking object
  */
  updateBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return res.status(400).json({ status: 'error', error: 'This booking is not yours! You cannot update it!' });
      }
      const { body } = req;
      const errorUpdate = bookingValidators.validateUpdateBooking(body).error;
      if (errorUpdate) {
        return res.status(400).json({ status: 'error', error: errorUpdate.details[0].message });
      }
      const updatedBooking = BookingModel.updateBooking(bookingId, body);
      const formattedBooking = formatBooking(updatedBooking);
      return res.status(200).json({ status: 'success', data: { message: 'Booking Updated Successfully!', data: formattedBooking } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${bookingId}` });
  },

  /**
  * @param {object} req
  * @param {object} res
  * @returns {messgae} message Booking deleted
  */
  deleteBooking(req, res) {
    const { error } = idValidator.bookingIdValidator(req.params);
    if (error) {
      return res.status(400).json({ status: 'error', error: 'The trip ID should be a number' });
    }
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      if (req.user.id !== oneBooking.user_id && !req.user.is_admin) {
        return res.status(400).json({ status: 'error', error: 'This booking is not yours! You cannot delete it!' });
      }
      BookingModel.deleteBooking(bookingId);
      return res.send({ status: 'success', data: { message: 'Booking Deleted Successfully!' } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${bookingId}` });
  },

};
export default Booking;
