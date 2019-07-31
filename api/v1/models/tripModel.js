// import uuid from 'uuid';
import moment from 'moment';

class Trip {
  /**
  * class constructor
  * @param {object} data
  */
  constructor() {
    this.trips = [
      {
        id: 1,
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        fare: 5000,
        status: 1,
      },
      {
        id: 2,
        seating_capacity: 45,
        bus_license_number: 'NTM 896',
        origin: 'Kampala',
        destination: 'Arusha',
        trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        fare: 8000,
        status: 1,
      },
    ];
  }

  /**
  *
  * @param {object} trip object
  */
  createTrip(data) {
    const newTrip = {
      id: data.id || this.trips.length + 1,
      seating_capacity: data.seating_capacity,
      bus_license_number: data.bus_license_number,
      origin: data.origin,
      destination: data.destination,
      trip_date: data.trip_date,
      fare: data.fare,
      status: data.status || 1,
    };
    this.trips.push(newTrip);
    return newTrip;
  }

  /**
  * @param {uuid} id
  * @returns {object} trip object
  */
  getOneTrip(id) {
    return this.trips.find(trip => trip.id === id);
  }

  /**
  * @returns {object} return all trips
  */
  getAllTrips() {
    return this.trips;
  }

  /**
  *
  * @param {uuid} id
  * @param {object} data
  */
  updateTrip(id, data) {
    const trip = this.getOneTrip(id);
    const index = this.trips.indexOf(trip);
    this.trips[index] = {
      id: trip.id,
      seating_capacity: data.seating_capacity || trip.seating_capacity,
      bus_license_number: data.bus_license_number || trip.bus_license_number,
      origin: data.origin || trip.origin,
      destination: data.destination || trip.destination,
      trip_date: data.trip_date || trip.trip_date,
      fare: data.fare || trip.fare,
      status: data.status || trip.status,
    };
    return trip;
  }

  /**
  *
  * @param {uuid} id
  */
  deleteTrip(id) {
    const trip = this.getOneTrip(id);
    // [trip, ...otherTrips] = this.trips;
    // this.trips = otherTrips;
    const index = this.trips.indexOf(trip);
    this.trips.splice(index, 1);
    return {};
  }
}
export default new Trip();
