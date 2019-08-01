import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import BookingModel from '../api/v1/models/bookingModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Bookings Tests', () => {
  let token = '';
  before((done) => {
    chai
      .request(app)
      .get('/get-token')
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });
  describe('POST bookings tests', () => {
    it('POST /api/v1/bookings Should create a new booking object', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 2,
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
          res.body.status.should.match(/success/);
          res.body.data.seat_number.should.equal(12);
          done();
        });
    });

    it('POST /api/v1/bookings Should not create a new booking object (No trip_id)', (done) => {
      const booking = {
        user_id: 2,
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
          res.body.status.should.match(/error/);
          done();
        });
    });

    it('POST /api/v1/bookings Should not create a new booking object (No user_id)', (done) => {
      const booking = {
        trip_id: 2,
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
          res.body.status.should.match(/error/);
          done();
        });
    });

    it('POST /api/v1/bookings Should not create a new booking object (No seat_number)', (done) => {
      const booking = {
        trip_id: 2,
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
          res.body.status.should.match(/error/);
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
          res.body.status.should.match(/success/);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  describe('GET a booking tests', () => {
    it('GET /api/v1/bookings/:id Should return a specific booking', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 2,
        seat_number: '4A',
      };
      const bookingId = BookingModel.book(booking).id;
      chai
        .request(app)
        .get(`/api/v1/bookings/${bookingId}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.match(/success/);
          res.body.data.seat_number.should.match(/4A/);
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
          res.body.status.should.match(/error/);
          done();
        });
    });

    it('GET /api/v1/bookings/:id Should not get a specific booking (Booking \'a\' is not a valid user id)', (done) => {
      chai
        .request(app)
        .get('/api/v1/bookings/a')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.match(/error/);
          done();
        });
    });
  });

  describe('PATCH a booking tests', () => {
    it('PATCH /api/v1/bookings/:id Should update a given booking', (done) => {
      const booking = {
        trip_id: 1,
        user_id: 2,
        seat_number: 12,
      };
      const bookingId = BookingModel.book(booking).id;
      chai
        .request(app)
        .patch(`/api/v1/bookings/${bookingId}`)
        .set('Authorization', token)
        .send({
          trip_id: 2,
          user_id: 2,
          seat_number: 12,
        })
        .end((err, res) => {
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
        user_id: 2,
        seat_number: 12,
      };
      const bookingId = BookingModel.book(booking).id;
      chai
        .request(app)
        .delete(`/api/v1/bookings/${bookingId}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
