import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/api/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign In', () => {
  it('POST /api/v1/auth/signin Should log in a user', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.match(/success/);
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
      email: 'nignanthomas@gmail.com',
      password: 'badpassword',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        // res.body.should.be.a('object');
        // res.body.status.should.match(/error/);
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
        // res.body.status.should.match(/error/);
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
        // res.body.status.should.match(/error/);
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
        // res.body.status.should.match(/error/);
        done();
      });
  });
});
