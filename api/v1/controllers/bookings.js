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

  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} booking object
  */
  getOneBooking(req, res) {
    const bookingId = parseInt(req.params.bookingId, 10);
    const oneBooking = BookingModel.getOneBooking(bookingId);
    if (oneBooking) {
      return res.status(200).json({ status: 'success', data: oneBooking });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${bookingId}` });
  },

};
export default Booking;
