import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import bookingModel from '../v2/models/bookingModel';
import tripModel from '../v2/models/tripModel';
import data from './mockData';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Bookings Tests', () => {
  let token = '';
  before((done) => {
    tripModel.createTrip(data.trip);
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.adminUser)
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.data.token;
        done();
      });
  });
  describe('POST bookings tests', () => {
    it('POST /api/v2/bookings Should not create a new booking object (No token)', (done) => {
      chai
        .request(app)
        .post('/api/v2/bookings')
        .send(data.bookingForPost)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.status.should.equal(401);
          res.body.error.match(/Missing or Invalid Token!/);
          done();
        });
    });

    it('POST /api/v2/bookings Should create a new booking object', (done) => {
      chai
        .request(app)
        .post('/api/v2/bookings')
        .set('token', token)
        .send(data.bookingForPost)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.status.should.equal(201);
          res.body.data.seat_number.should.equal(12);
          res.body.data.first_name.should.match(/Thanos/);
          res.body.data.bus_license_number.should.match(/KCK 469/);
          done();
        });
    });

    it('POST /api/v2/bookings Should not create a new booking object (No trip_id)', (done) => {
      chai
        .request(app)
        .post('/api/v2/bookings')
        .set('token', token)
        .send(data.bookingNoTripId)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v2/bookings Should not create a new booking object (No seat_number)', (done) => {
      chai
        .request(app)
        .post('/api/v2/bookings')
        .set('token', token)
        .send(data.bookingNoSeatNumber)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('GET all bookings tests', () => {
    it('GET /api/v2/bookings Should return all bookings', (done) => {
      chai
        .request(app)
        .get('/api/v2/bookings')
        .set('token', token)
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
    // it('GET /api/v2/bookings/:id Should return a specific booking', (done) => {
    //   chai
    //     .request(app)
    //     .get('/api/v2/bookings/1')
    //     .set('token', token)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.status.should.equal(200);
    //       res.body.data.seat_number.should.equal(12);
    //       done();
    //     });
    // });

    it('GET /api/v2/bookings/:id Should not get a specific booking (Booking 11 that does not exist)', (done) => {
      chai
        .request(app)
        .get('/api/v2/bookings/11')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });

    it('GET /api/v2/bookings/:id Should not get a specific booking (Booking \'a\' is not a valid user id)', (done) => {
      chai
        .request(app)
        .get('/api/v2/bookings/a')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          res.body.error.should.match(/The booking ID should be a number/);
          done();
        });
    });
  });

  describe('PATCH a booking tests', () => {
    // it('PATCH /api/v2/bookings/:id Should update a given booking', (done) => {
    //   chai
    //     .request(app)
    //     .patch('/api/v2/bookings/1')
    //     .set('token', token)
    //     .send(data.seatNumberUpdate)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       done();
    //     });
    // });

    it('PATCH /api/v2/bookings/:id Should not update a given booking (id = 41, not exist)', (done) => {
      chai
        .request(app)
        .patch('/api/v2/bookings/41')
        .set('token', token)
        .send(data.seatNumberUpdate)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.error.should.match(/Cannot find booking of id: 41/)
          done();
        });
    });
  });

  describe('DELETE bookings tests', () => {
    // it('DELETE /api/v2/bookings/:id Should delete a given booking', (done) => {
    //   const bookingId = bookingModel.book(data.bookingForModel).id;
    //   chai
    //     .request(app)
    //     .delete(`/api/v2/bookings/${bookingId}`)
    //     .set('token', token)
    //     .end((err, res) => {
    //       res.should.have.status(204);
    //       res.body.should.be.a('object');
    //       done();
    //     });
    // });

    it('DELETE /api/v2/bookings/:id Should not delete a given booking (id = a, not a number )', (done) => {
      chai
        .request(app)
        .delete('/api/v2/bookings/a')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.match(/The booking ID should be a number/)
          done();
        });
    });
  });
  after((done) => {
    tripModel.deleteTrip(1);
    done();
  });
});
