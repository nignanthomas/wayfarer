import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

dotenv.config();


// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign In', () => {
  it('POST /api/v1/auth/signin Should log in a user', (done) => {
    const user = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        done();
      });
  });

  it('POST /api/v1/auth/signin Should not log in a user: Bad Credentials! (User does not exist)', (done) => {
    const user = {
      email: 'starlord@gmail.com',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });

  it('POST /api/v1/auth/signin Should not log in a user: Bad Credentials! (Wrong password)', (done) => {
    const user = {
      email: process.env.ADMIN_EMAIL,
      password: 'badpassword',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        // res.body.should.be.a('object');
        // res.body.status.should.equal(401);
        done();
      });
  });

  it('POST /api/v1/auth/signin Should not log in a user: All Fields are required! (No email)', (done) => {
    const user = {
      email: '',
      password: 'password',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        // res.body.should.be.a('object');
        // res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v1/auth/signin Should not log in a user: All Fields are required! (No password)', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      password: '',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        // res.body.should.be.a('object');
        // res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v1/auth/signin Should not log in a user: All Fields are required! (No email - Nopassword)', (done) => {
    const user = {
      email: '',
      password: '',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        // res.body.should.be.a('object');
        // res.body.status.should.equal(400);
        done();
      });
  });
});
