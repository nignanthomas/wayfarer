import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import userModel from '../v2/models/userModel';
import data from './mockData';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);


describe('Users Tests', () => {
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
  it('GET /api/v2/users should get all users', (done) => {
    chai
      .request(app)
      .get('/api/v2/users')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('GET /api/v2/users/:id Should get a specific user (User just created)', (done) => {
    chai
      .request(app)
      .get('/api/v2/users/2')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('GET /api/v2/users/:id Should not get a specific user (User 11 that does not exist)', (done) => {
    chai
      .request(app)
      .get('/api/v2/users/11')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.equal(404);
        done();
      });
  });

  it('GET /api/v2/users/:id Should not get a specific user (User \'a\' that does not exist)', (done) => {
    chai
      .request(app)
      .get('/api/v2/users/a')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });
});
