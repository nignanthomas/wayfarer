import moment from 'moment';
import bookings from '../data/bookings.json';
import { query } from './dbQuery';

const book = async (data) => {
  const createQuery = `INSERT INTO
      bookings(trip_id, user_id, seat_number, created_on)
      VALUES($1, $2, $3, $4)
      returning *`;
  const values = [
    data.trip_id,
    data.user_id,
    data.seat_number,
    moment().format('DD-MM-YYYY'),
  ];
  try {
    const { rows } = await query(createQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getOneBooking = id => bookings.find(booking => booking.id === id);

const getOneBookingDB = async (id) =>{
  const oneQuery = 'SELECT * FROM trips WHERE id = $1';
  const ids = [id];
  try {
    const { rows } = await query(oneQuery, ids);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const getAllBookings = () => bookings;

const getAllBookingsDB = async () => {
  const findAllQuery = 'SELECT * FROM bookings';
  try {
    const { rows } = await query(findAllQuery);
    return rows;
  } catch (error) {
    return error;
  }
}

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
  getOneBookingDB,
  getAllBookings,
  getAllBookingsDB,
  updateBooking,
  deleteBooking,
};
