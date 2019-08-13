import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import tripModel from '../v2/models/tripModel';
import data from './mockData';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);


describe('Trips Tests', () => {
  let token = '';
  before((done) => {
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

  describe('Trips Tests - Empty Trips', () => {
    it('GET /api/v2/trips Should get all trips', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.error.should.match(/There are no Trips yet!/);
          done();
        });
    });
  });

  describe('POST trips tests', () => {
    let regToken = '';
    before((done) => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(data.userLog)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          regToken = result.data.token;
          done();
        });
    });
    it('POST /api/v2/trips Should create a new trip', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', token)
        .send(data.trip)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.status.should.equal(201);
          res.body.data.should.a('object');
          res.body.data.fare.should.equal(5000);
          done();
        });
    });

    it('POST /api/v2/trips Should not create a new trip (admin only route)', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', regToken)
        .send(data.trip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.status.should.equal(401);
          done();
        });
    });

    it('POST /api/v2/trips Should not create a new trip (No seating_capacity)', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', token)
        .send(data.tripNoSeatCapacity)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v2/trips Should not create a new trip (No bus_license_number)', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', token)
        .send(data.tripNoLicense)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v2/trips Should not create a new trip (No origin)', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', token)
        .send(data.tripNoOrigin)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v2/trips Should not create a new trip (No destination)', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', token)
        .send(data.tripNoDestination)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v2/trips Should not create a new trip (No fare)', (done) => {
      chai
        .request(app)
        .post('/api/v2/trips')
        .set('token', token)
        .send(data.tripNoFare)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('GET all trips test', () => {
    it('GET /api/v2/trips Should get all trips', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.should.be.a('array');
          done();
        });
    });

    it('GET /api/v2/trips Should get all trips filtered', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips/?origin=Kigali&destination=Nairobi')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.should.be.a('array');
          res.body.data[0].origin.should.match(/Kigali/);
          res.body.data[0].destination.should.match(/Nairobi/);
          done();
        });
    });
  });

  describe('GET one trip tests', () => {
    it('GET /api/v2/trips/:id Should return a specific trip (Trip just created)', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('GET /api/v2/trips/:id Should not get a specific trip (Trip 11 that does not exist)', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips/11')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });

    it('GET /api/v2/trips/:id Should not get a specific trip (Trip \'a\' that does not exist)', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips/a')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('PATCH a trip tests', () => {
    it('PATCH /api/v2/trips/:id Should update a given a trip (Trip just created)', (done) => {
      chai
        .request(app)
        .patch('/api/v2/trips/1')
        .set('token', token)
        .send(data.tripUpdate)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.fare.should.equal(7500);
          res.body.data.status.should.equal(1);
          done();
        });
    });

    it('PATCH /api/v2/trips/:id/cancel Should cancel a given a trip (Trip just created)', (done) => {
      chai
        .request(app)
        .patch('/api/v2/trips/1/cancel')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.bus_license_number.should.match(/KCK 469/);
          res.body.data.origin.should.match(/Kigali/);
          res.body.data.destination.should.match(/Nairobi/);
          res.body.data.fare.should.equal(7500);
          res.body.data.status.should.equal(9);
          done();
        });
    });

    // try to retrieve a cancelled trip
    it('GET /api/v2/trips/:id Should return No trip found (The trip has now been cancelled)', (done) => {
      chai
        .request(app)
        .get('/api/v2/trips/1')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    it('PATCH /api/v2/trips/:id/cancel Should not cancel a given a trip (Trip id = a , character)', (done) => {
      chai
        .request(app)
        .patch('/api/v2/trips/a/cancel')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          res.body.error.match(/The trip ID should be a number/);
          done();
        });
    });

    it('PATCH /api/v2/trips/:id/cancel Should not cancel a given a trip (Trip id 11 not found not exist)', (done) => {
      chai
        .request(app)
        .patch('/api/v2/trips/11/cancel')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          res.body.error.match(/Cannot find trip of id: 11/);
          done();
        });
    });

    it('PATCH /api/v2/trips/:id Should return 404 (Trip id 11 that does not exist )', (done) => {
      chai
        .request(app)
        .patch('/api/v2/trips/11')
        .set('token', token)
        .send(data.tripUpdate)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });

    it('PATCH /api/v2/trips/:id Should return 400 (Trip id should be a number)', (done) => {
      chai
        .request(app)
        .patch('/api/v2/trips/a')
        .set('token', token)
        .send(data.tripUpdate)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          res.body.error.match(/The trip ID should be a number/);
          done();
        });
    });
  });

  describe('DELETE a trip test', () => {
    it('DELETE /api/v2/trips Should delete a given trip', (done) => {
      chai
        .request(app)
        .delete('/api/v2/trips/1')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it('DELETE /api/v2/trips Should not delete a trip (Trip id 9 does not exist)', (done) => {
      chai
        .request(app)
        .delete('/api/v2/trips/9')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          res.body.error.match(/Cannot find trip of id: 11/);
          done();
        });
    });

    it('DELETE /api/v2/trips Should not delete a trip (Trip id a, not a number)', (done) => {
      chai
        .request(app)
        .delete('/api/v2/trips/a')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          res.body.error.should.match(/The trip ID should be a number/)
          done();
        });
    });
  });
});
