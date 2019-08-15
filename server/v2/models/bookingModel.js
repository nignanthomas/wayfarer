import moment from 'moment';
import { query } from './dbQuery';
import { getAllQuery, getOneQuery } from '../helpers/dbQueriesHelper';

const book = async (data) => {
  const createQuery = `INSERT INTO
      bookings(trip_id, user_id, seat_number, created_on)
      VALUES($1, $2, $3, $4)
      returning *`;
  const values = [
    data.trip_id,
    data.user_id,
    data.seat_number,
    moment().format('MM-DD-YYYY'),
  ];
  try {
    const { rows } = await query(createQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getOneBookingDB = async id => getOneQuery('bookings', id);

const getAllBookingsDB = async () => getAllQuery('bookings');

const updateBookingDB = async (id, data) => {
  const updateQuery = 'UPDATE bookings SET seat_number = $1  WHERE id = $2 returning *;';
  const values = [data.seat_number, id];
  try {
    const { rows } = await query(updateQuery, values);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const deleteBookingDB = async (id) => {
  const deleteQuery = 'DELETE FROM bookings WHERE id = $1;';
  const ids = [id];
  try {
    const { rows } = await query(deleteQuery, ids);
    return {};
  } catch (error) {
    return error;
  }
};

module.exports = {
  book,
  getOneBookingDB,
  getAllBookingsDB,
  updateBookingDB,
  deleteBookingDB,
};
