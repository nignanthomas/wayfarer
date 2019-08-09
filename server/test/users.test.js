import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import userModel from '../v1/models/userModel';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);


describe('Users Tests', () => {
  let token = '';
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.data.token;
        done();
      });
  });
  it('GET /api/v1/users should get all users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('GET /api/v1/users/:id Should get a specific user (User just created)', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
      is_admin: true,
    };
    const userId = userModel.createUser(user).id;
    chai
      .request(app)
      .get(`/api/v1/users/${userId}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/users/:id Should not get a specific user (User 11 that does not exist)', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/11')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.equal(404);
        done();
      });
  });

  it('GET /api/v1/users/:id Should not get a specific user (User \'a\' that does not exist)', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/a')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });
});
