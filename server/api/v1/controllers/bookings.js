import BookingModel from '../models/bookingModel';
import UserModel from '../models/userModel';
import TripModel from '../models/tripModel';

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
    if (!body.user_id || !body.trip_id || !body.seat_number) {
      return res.status(400).json({ status: 'error', error: 'Bad Request! All booking fields are required!' });
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
    const bookings = BookingModel.getAllBookings();
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
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
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
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      const updatedBooking = BookingModel.updateBooking(bookingId, req.body);
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
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      BookingModel.deleteBooking(bookingId);
      return res.send({ status: 'success', data: { message: 'Booking Deleted Successfully!' } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${bookingId}` });
  },

};
export default Booking;
