import moment from 'moment';

class Booking {
  /**
  * class constructor
  * @param data
  */
  constructor() {
    this.bookings = [
      {
        id: 1,
        trip_id: 2,
        user_id: 1,
        create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      },
      {
        id: 2,
        trip_id: 1,
        user_id: 2,
        create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      },
    ];
  }

  /**
  *
  * @param {object} data
  */
  book(data) {
    const newBooking = {
      id: this.bookings.length + 1,
      trip_id: data.trip_id,
      user_id: data.user_id,
      create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  /**
  * @param {uuid} id
  * @returns {object} data
  */
  getOneBooking(id) {
    return this.bookings.find(booking => booking.id === id);
  }

  /**
  *
  * @returns {object} return all bookings
  */
  getAllBookings() {
    return this.bookings;
  }

  /**
  * @param {uuid} id
  * @param {object} data
  */
  updateBooking(id, data) {
    const booking = this.getOneBooking(id);
    const index = this.bookings.indexOf(booking);
    this.bookings[index] = {
      id: booking.id,
      trip_id: data.trip_id || booking.trip_id,
      user_id: data.user_id || booking.user_id,
      create_on: data.create_on || booking.create_on,
    };
    return this.bookings[index];
  }

  /**
  *
  * @param {uuid} id
  */
  deleteBooking(id) {
    const booking = this.getOneBooking(id);
    const index = this.bookings.indexOf(booking);
    this.bookings.splice(index, 1);
    return {};
  }
}
export default new Booking();
