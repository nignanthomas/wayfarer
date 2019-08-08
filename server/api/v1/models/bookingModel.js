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
        seat_number: 12,
        created_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      },
      {
        id: 2,
        trip_id: 1,
        user_id: 2,
        seat_number: 32,
        created_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
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
      seat_number: data.seat_number,
      created_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
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
    this.bookings[index].seat_number = data.seat_number || booking.seat_number;
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
