import BookingModel from '../models/bookingModel';

const Booking = {
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
    return res.status(200).json({ status: 'success', data: bookings });
  },

};
export default Booking;
