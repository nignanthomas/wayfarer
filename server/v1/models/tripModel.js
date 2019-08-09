import moment from 'moment';
import trips from '../data/trips.json';

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

const createTrip = (data) => {
  const newTrip = new Trip({
    id: data.id || trips.length + 1,
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


const getOneTrip = (id) => {
  return trips.find(trip => trip.id === id);
};

const getAllTrips = () => {
  return trips;
};

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
};
