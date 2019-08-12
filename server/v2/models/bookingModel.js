import moment from 'moment';
import bookings from '../data/bookings.json';
import { nextId } from '../helpers/nextId';

class Booking {
  constructor({
    id, trip_id, user_id, seat_number, created_on
  }) {
    this.id = id;
    this.trip_id = trip_id;
    this.user_id = user_id;
    this.seat_number = seat_number;
    this.created_on = created_on;
  }
}

const book = (data) => {
  const newBooking = new Booking({
    id: nextId(bookings),
    trip_id: data.trip_id,
    user_id: data.user_id,
    seat_number: data.seat_number,
    created_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  });
  bookings.push(newBooking);
  return newBooking;
};

const getOneBooking = id => bookings.find(booking => booking.id === id);

const getAllBookings = () => bookings;

const updateBooking = (id, data) => {
  const booking = getOneBooking(id);
  const index = bookings.indexOf(booking);
  bookings[index].seat_number = data.seat_number || booking.seat_number;
  return bookings[index];
};

const deleteBooking = (id) => {
  const booking = getOneBooking(id);
  const index = bookings.indexOf(booking);
  bookings.splice(index, 1);
  return {};
};

module.exports = {
  book,
  getOneBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
