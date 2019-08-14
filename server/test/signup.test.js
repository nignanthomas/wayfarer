import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { query } from '../v2/models/dbQuery';
import data from './mockData';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign Up', () => {
  it('POST /api/v2/auth/signup Should create a new superuser account', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data.adminSignUp)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.equal(201);
        done();
      });
  });

  it('POST /api/v2/auth/signup Should create a new regular user account', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data.user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.equal(201);
        done();
      });
  });

  it('POST /api/v2/auth/signup Should not create a new user account (email not provided)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data.userNoEmail)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v2/auth/signup Should not create a new user account (first_name not provided)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data.userNoFirstName)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v2/auth/signup Should not create a new user account (last_name not provided)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data.userNoLastName)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v2/auth/signup Should not create a new user account (password not provided)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send(data.userNoPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });
});
