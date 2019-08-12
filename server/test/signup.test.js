import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { query } from '../v1/models/dbQuery';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign Up', () => {
  it('POST /api/v1/auth/signup Should create a new user account', (done) => {
    const user = {
      email: 'thomasnignan@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.equal(201);
        done();
      });
  });

  it('POST /api/v1/auth/signup Should not create a new user account (email not provided)', (done) => {
    const user = {
      email: '',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v1/auth/signup Should not create a new user account (first_name not provided)', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      first_name: '',
      last_name: 'Nignan',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v1/auth/signup Should not create a new user account (last_name not provided)', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: '',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  it('POST /api/v1/auth/signup Should not create a new user account (password not provided)', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: '',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });
  after((done) => {
    query('DELETE FROM users');
    done();
  })
});
