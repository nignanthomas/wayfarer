import { query } from './dbQuery';
import { getAllQuery, getOneQuery } from '../helpers/dbQueriesHelper';

const createTrip = async (data) => {
  const createQuery = `INSERT INTO
      trips(seating_capacity, bus_license_number, origin, destination, trip_date, fare)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
  const values = [
    data.seating_capacity,
    data.bus_license_number,
    data.origin,
    data.destination,
    data.trip_date,
    parseInt(data.fare, 10),
  ];
  try {
    const { rows } = await query(createQuery, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getOneTripDB = async id => getOneQuery('trips', id);

const getAllTripsDB = async () => getAllQuery('trips');

const getRepeatTrip = async (bus_license_number, trip_date) => {
  const repeatQuery = 'SELECT * FROM trips WHERE bus_license_number = $1 AND trip_date = $2 ';
  const options = [bus_license_number, trip_date];
  try {
    const { rows } = await query(repeatQuery, options);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const updateTrip = async (id, data) => {
  const updateQuery = 'UPDATE trips SET fare = $1  WHERE id = $2 returning *;';
  const values = [data.fare, id];
  try {
    const { rows } = await query(updateQuery, values);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const cancelTrip = async (id) => {
  const cancelQuery = `UPDATE trips SET status = 'cancelled'  WHERE id = $1 returning *;`;
  const ids = [id];
  try {
    const { rows } = await query(cancelQuery, ids);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const deleteTripDB = async (id) => {
  const deleteQuery = 'DELETE FROM trips WHERE id = $1;';
  const ids = [id];
  try {
    const { rows } = await query(deleteQuery, ids);
    return {};
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTrip,
  getOneTripDB,
  updateTrip,
  getRepeatTrip,
  getAllTripsDB,
  cancelTrip,
  deleteTripDB,
};
