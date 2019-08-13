import moment from 'moment';
import trips from '../data/trips.json';
import { query } from './dbQuery';

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

const getOneTrip = (id) => {
  return trips.find(trip => trip.id === id);
};

const getOneTripDB = async (id) => {
  const oneQuery = 'SELECT * FROM trips WHERE id = $1';
  const ids = [id];
  try {
    const { rows } = await query(oneQuery, ids);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const getAllTrips = () => {
  return trips;
};

const getAllTripsDB = async () => {
  const findAllQuery = 'SELECT * FROM trips';
  try {
    const { rows } = await query(findAllQuery);
    return rows;
  } catch (error) {
    return error;
  }
};

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
  const cancelQuery = 'UPDATE trips SET fare = $1  WHERE id = $2 returning *;';
  const values = [data.fare, id];
  try {
    const { rows } = await query(cancelQuery, values);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const cancelTrip = async (id, data) => {
  const cancelQuery = 'UPDATE trips SET status = 9  WHERE id = $1 returning *;';
  const ids = [id];
  try {
    const { rows } = await query(cancelQuery, ids);
    return rows[0];
  } catch (error) {
    return error;
  }
};

const deleteTrip = (id) => {
  const trip = getOneTrip(id);
  const index = trips.indexOf(trip);
  trips.splice(index, 1);
  return {};
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
  getOneTrip,
  getOneTripDB,
  getAllTrips,
  updateTrip,
  deleteTrip,
  getRepeatTrip,
  getAllTripsDB,
  cancelTrip,
  deleteTripDB,
};
