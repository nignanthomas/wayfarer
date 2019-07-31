import chai from 'chai';
import chaiHttp from 'chai-http';
// import uuid from 'uuid';
import moment from 'moment';
import app from '../api/server';
import Trip from '../api/v1/models/tripModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Trips Tests', () => {
  it('POST /api/v1/trips Should create a new trip', (done) => {
    const trip = {
      id: Trip.getAllTrips().length + 1,
      seating_capacity: 45,
      bus_license_number: 'KCK 469',
      origin: 'Kigali',
      destination: 'Nairobi',
      trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      fare: 5000,
      status: 1,
    };
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/trips Should get all trips', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/trips/:id Should return a specific trip', (done) => {
    const trip = {
      id: Trip.getAllTrips().length + 1,
      seating_capacity: 45,
      bus_license_number: 'KCK 469',
      origin: 'Kigali',
      destination: 'Nairobi',
      trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      fare: 5000,
      status: 1,
    };
    const tripId = Trip.createTrip(trip).id;
    chai
      .request(app)
      .get(`/api/v1/trips/${tripId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /api/v1/trips/:id Should update a given a trip', (done) => {
    const trip = {
      id: Trip.getAllTrips().length + 1,
      seating_capacity: 45,
      bus_license_number: 'KCK 469',
      origin: 'Kigali',
      destination: 'Nairobi',
      trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      fare: 5000,
      status: 1,
    };
    const tripId = Trip.createTrip(trip).id;
    chai
      .request(app)
      .patch(`/api/v1/trips/${tripId}`)
      .send({
        // id: uuid.v4(),
        seating_capacity: 45,
        bus_license_number: 'KC8 219',
        origin: 'Ouagadougou',
        destination: 'Kigali',
        trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        fare: 7500,
        status: 0,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /api/v1/trips Should delete a given trip', (done) => {
    const trip = {
      id: Trip.getAllTrips().length + 1,
      seating_capacity: 45,
      bus_license_number: 'KCK 469',
      origin: 'Kigali',
      destination: 'Nairobi',
      trip_date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      fare: 5000,
      status: 1,
    };
    const tripId = Trip.createTrip(trip).id;
    chai
      .request(app)
      .delete(`/api/v1/trips/${tripId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
