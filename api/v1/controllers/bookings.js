import BookingModel from '../models/bookingModel';

const Booking = {
  /**
  * @param {object} req
  * @param {object} res
  * @returns {object} booking object
  */
  createBooking(req, res) {
    const { body } = req;
    if (!body.user_id || !body.trip_id) {
      return res.status(400).json({ status: 'error', data: 'Bad Request! All booking fields are required!' });
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
      return res.status(200).json({ status: 'success', data: { message: 'Booking Updated Successfully!', data: updatedBooking } });
    }
    return res.status(404).json({ status: 'error', error: `Cannot find booking of id: ${bookingId}` });
  },

};
export default Booking;
