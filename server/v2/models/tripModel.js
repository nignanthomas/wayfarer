import moment from 'moment';
import trips from '../data/trips.json';
import { query } from './dbQuery';
import { nextId } from '../helpers/nextId';

class Trip {
  constructor({
    id, seating_capacity, bus_license_number, origin, destination, trip_date, fare, status
  }) {
    this.id = id;
    this.seating_capacity = seating_capacity;
    this.bus_license_number = bus_license_number;
    this.origin = origin;
    this.destination = destination;
    this.trip_date = trip_date;
    this.fare = fare;
    this.status = status;
  }
}

const createTripDS = (data) => {
  const newTrip = new Trip({
    id: data.id || nextId(trips),
    seating_capacity: data.seating_capacity,
    bus_license_number: data.bus_license_number,
    origin: data.origin,
    destination: data.destination,
    trip_date: data.trip_date,
    fare: data.fare,
    status: 1,
  });
  trips.push(newTrip);
  return newTrip;
};


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

const getAllTrips = () => {
  return trips;
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
}

const updateTrip = (id, data) => {
  const trip = getOneTrip(id);
  const index = trips.indexOf(trip);
  trips[index] = {
    id: trips[index].id,
    seating_capacity: data.seating_capacity || trip.seating_capacity,
    bus_license_number: data.bus_license_number || trip.bus_license_number,
    origin: data.origin || trip.origin,
    destination: data.destination || trip.destination,
    trip_date: data.trip_date || trip.trip_date,
    fare: data.fare || trip.fare,
    status: data.status || trip.status,
  };
  return trips[index];
};

const deleteTrip = (id) => {
  const trip = getOneTrip(id);
  const index = trips.indexOf(trip);
  trips.splice(index, 1);
  return {};
};

module.exports = {
  createTrip,
  getOneTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
  getRepeatTrip,
  createTripDS,
};
