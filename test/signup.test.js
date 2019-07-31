import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../api/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign Up', () => {
  it('POST /api/v1/auth/signup Should create a new user account', (done) => {
    const user = {
      id: uuid.v4(),
      email: 'nignanthomas@gmail.com',
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
        done();
      });
  });
});
