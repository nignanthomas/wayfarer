import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import BookingModel from '../v1/models/bookingModel';
import TripModel from '../v1/models/tripModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Bookings Tests', () => {
  let token = '';
  before((done) => {
    const trip = {
      seating_capacity: 45,
      bus_license_number: 'KCK 469',
      origin: 'Kigali',
      destination: 'Nairobi',
      trip_date: '10-12-2019',
      fare: 5000,
    }
    TripModel.createTrip(trip);
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'nignanthomas@gmail.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.data.token;
        done();
      });
  });
  describe('POST bookings tests', () => {
    it('POST /api/v1/bookings Should create a new booking object', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 1,
        seat_number: 12,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', token)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.status.should.equal(201);
          res.body.data.seat_number.should.equal(12);
          done();
        });
    });

    it('POST /api/v1/bookings Should not create a new booking object (No trip_id)', (done) => {
      const booking = {
        user_id: 1,
        seat_number: 12,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', token)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v1/bookings Should not create a new booking object (No user_id)', (done) => {
      const booking = {
        trip_id: 1,
        seat_number: 12,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', token)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v1/bookings Should not create a new booking object (No seat_number)', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 1,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', token)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('GET all bookings tests', () => {
    it('GET /api/v1/bookings Should return all bookings', (done) => {
      chai
        .request(app)
        .get('/api/v1/bookings')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  describe('GET a booking tests', () => {
    it('GET /api/v1/bookings/:id Should return a specific booking', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 1,
        seat_number: 12,
      };
      const bookingId = BookingModel.book(booking).id;
      chai
        .request(app)
        .get(`/api/v1/bookings/${bookingId}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.seat_number.should.equal(12);
          done();
        });
    });

    it('GET /api/v1/bookings/:id Should not get a specific booking (Booking 11 that does not exist)', (done) => {
      chai
        .request(app)
        .get('/api/v1/bookings/11')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });

    it('GET /api/v1/bookings/:id Should not get a specific booking (Booking \'a\' is not a valid user id)', (done) => {
      chai
        .request(app)
        .get('/api/v1/bookings/a')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('PATCH a booking tests', () => {
    it('PATCH /api/v1/bookings/:id Should update a given booking', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 1,
        seat_number: 12,
        fare: 3000,
      };
      const bookingId = BookingModel.book(booking).id;
      chai
        .request(app)
        .patch(`/api/v1/bookings/${bookingId}`)
        .set('Authorization', token)
        .send({
          seat_number: 21,
        })
        .end((err, res) => {
          console.log(res.status);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE bookings tests', () => {
    it('DELETE /api/v1/bookings/:id Should delete a given booking', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 1,
        seat_number: 12,
      };
      const bookingId = BookingModel.book(booking).id;
      chai
        .request(app)
        .delete(`/api/v1/bookings/${bookingId}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
