import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import app from '../api/server';
import BookingModel from '../api/v1/models/bookingModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Bookings Tests', () => {
  it('POST /api/v1/bookings Should create a new booking object', (done) => {
    const booking = {
      id: BookingModel.getAllBookings().length + 1,
      trip_id: 1,
      user_id: 2,
      create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    chai
      .request(app)
      .post('/api/v1/bookings')
      .send(booking)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/bookings Should return all bookings', (done) => {
    chai
      .request(app)
      .get('/api/v1/bookings')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/bookings/:id Should return a specific booking', (done) => {
    const booking = {
      id: BookingModel.getAllBookings().length + 1,
      trip_id: 1,
      user_id: 2,
      create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    const bookingId = BookingModel.book(booking).id;
    chai
      .request(app)
      .get(`/api/v1/bookings/${bookingId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /api/v1/bookings/:id Should update a given booking', (done) => {
    const booking = {
      id: BookingModel.getAllBookings().length + 1,
      trip_id: 1,
      user_id: 2,
      create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    const bookingId = BookingModel.book(booking).id;
    chai
      .request(app)
      .patch(`/api/v1/bookings/${bookingId}`)
      .send({
        id: BookingModel.getAllBookings().length + 1,
        trip_id: 2,
        user_id: 2,
        create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /api/v1/bookings/:id Should delete a given booking', (done) => {
    const booking = {
      id: BookingModel.getAllBookings().length + 1,
      trip_id: 1,
      user_id: 2,
      create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    const bookingId = BookingModel.book(booking).id;
    chai
      .request(app)
      .delete(`/api/v1/bookings/${bookingId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.shoud.be.a('object');
        done();
      });
  });
});
