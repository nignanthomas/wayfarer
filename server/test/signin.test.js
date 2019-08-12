import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import data from './mockData';

dotenv.config();


// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign In', () => {
  it('POST /api/v2/auth/signin Should log in a user', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.adminUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        done();
      });
  });

  it('POST /api/v2/auth/signin Should not log in a user: Bad Credentials! (User does not exist)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.wrongUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });

  it('POST /api/v2/auth/signin Should not log in a user: Bad Credentials! (Wrong password)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.adminWrongPass)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('POST /api/v2/auth/signin Should not log in a user: All Fields are required! (No email)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.loginNoEmail)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('POST /api/v2/auth/signin Should not log in a user: All Fields are required! (No password)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.loginNoPass)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('POST /api/v2/auth/signin Should not log in a user: All Fields are required! (No email - Nopassword)', (done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .send(data.loginEmpty)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
