import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import TripModel from '../v1/models/tripModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Trips Tests', () => {
  let token = '';
  before((done) => {
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
  describe('POST trips tests', () => {
    it('POST /api/v1/trips Should create a new trip', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', token)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.status.should.equal(201);
          res.body.data.should.a('object');
          res.body.data.fare.should.equal(5000);
          done();
        });
    });

    it('POST /api/v1/trips Should not create a new trip (No seating_capacity)', (done) => {
      const trip = {
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', token)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v1/trips Should not create a new trip (No bus_license_number)', (done) => {
      const trip = {
        seating_capacity: 45,
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', token)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v1/trips Should not create a new trip (No origin)', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', token)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v1/trips Should not create a new trip (No destination)', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        fare: 5000,
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', token)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('POST /api/v1/trips Should not create a new trip (No fare)', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', token)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('GET all trips test', () => {
    it('GET /api/v1/trips Should get all trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips')
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

  describe('GET one trip tests', () => {
    it('GET /api/v1/trips/:id Should return a specific trip (Trip just created)', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      const tripId = TripModel.createTrip(trip).id;
      chai
        .request(app)
        .get(`/api/v1/trips/${tripId}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('GET /api/v1/trips/:id Should not get a specific trip (Trip 11 that does not exist)', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/11')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });

    it('GET /api/v1/trips/:id Should not get a specific trip (Trip \'a\' that does not exist)', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/a')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
  });

  describe('PATCH a trip tests', () => {
    it('PATCH /api/v1/trips/:id Should update a given a trip (Trip just created)', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      const tripId = TripModel.createTrip(trip).id;
      chai
        .request(app)
        .patch(`/api/v1/trips/${tripId}`)
        .set('Authorization', token)
        .send({
          seating_capacity: 45,
          bus_license_number: 'KC8 219',
          trip_date: new Date().setDate(new Date().getDate() + 1),
          fare: 7500,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.status.should.equal(200);
          res.body.data.bus_license_number.should.match(/KC8 219/);
          res.body.data.fare.should.equal(7500);
          res.body.data.status.should.equal(1);
          done();
        });
    });

    it('PATCH /api/v1/trips/:id Should return 404 (Trip id 11 that does not exist )', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/11')
        .set('Authorization', token)
        .send({
          seating_capacity: 21,
          bus_license_number: 'KC8 219',
          trip_date: '12-12-2020',
          fare: 7500,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });
  });

  describe('DELETE a trip test', () => {
    it('DELETE /api/v1/trips Should delete a given trip', (done) => {
      const trip = {
        seating_capacity: 45,
        bus_license_number: 'KCK 469',
        origin: 'Kigali',
        destination: 'Nairobi',
        trip_date: new Date().setDate(new Date().getDate() + 1),
        fare: 5000,
      };
      const tripId = TripModel.createTrip(trip).id;
      chai
        .request(app)
        .delete(`/api/v1/trips/${tripId}`)
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a('object');
          done();
        });
    });

    it('DELETE /api/v1/trips Should not delete a trip (Trip id 9 does not exist)', (done) => {
      chai
        .request(app)
        .delete('/api/v1/trips/9')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.status.should.equal(404);
          done();
        });
    });
  });
});
